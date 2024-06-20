import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogClose } from "@/components/ui/dialog";
import YourDetailsForm from "./YourDetailsForm";
import BusinessDetailsForm from "./BusinessDetailsForm";
import PlansForm from "./PlansForm";
import yourDetailsSchema from "@/types/setupForms/yourDetailsSchema";
import businessDetailsSchema from "@/types/setupForms/businessDetailsSchema";
import plansSchema from "@/types/setupForms/plansSchema";
import { z } from "zod";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import NetworkForm from "./NetworkForm";
import networkSchema from "@/types/setupForms/networkSchema";
import { addTenantProfile } from "@/services/tenantsService";
import SetupFormData from "@/types/setupForms/setupFormData";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

interface SetupIconsProps {
  currentStage: number;
}

function SetupIcons({ currentStage }: SetupIconsProps) {
  const icons = ["person", "business", "assignment", "wifi"];
  const stageNames = [
    "Your Details",
    "Business Details",
    "Plans & Pricing",
    "Network",
  ];

  const bgExpandAnimation = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex justify-between">
      {icons.map((icon, index) => {
        const stageIndex = index + 1;
        const isPast = currentStage > stageIndex;
        const isActive = currentStage === stageIndex;

        return (
          <div key={icon} className="w-1/4 flex flex-col items-center gap-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={isPast ? "check" : icon}
                className={`rounded-full p-3 flex items-center justify-center ${
                  isPast ? "bg-green-500" : isActive ? "bg-primary" : "bg-background"
                }`}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={bgExpandAnimation}
              >
                <motion.span
                  className="material-icons"
                  style={{ color: isPast || isActive ? "white" : "" }}
                  initial={{ rotate: 0 }}
                  animate={{ rotate: isPast ? 360 : 0 }}
                  exit={{ rotate: isPast || isActive ? -360 : 0 }}
                  transition={bgExpandAnimation}
                >
                  {isPast ? "check" : icon}
                </motion.span>
              </motion.div>
            </AnimatePresence>
            <p className="text-sm text-center">{stageNames[index]}</p>
          </div>
        );
      })}
    </div>
  );
}

interface SetupPopupProps {
  isActive: boolean;
  isSetup: boolean;
}

export default function SetupPopup({ isActive, isSetup }: SetupPopupProps): JSX.Element {
  const initialStage = isSetup ? 5 : 1;
  console.log("Initial Stage: ", initialStage);
  const [stage, setStage] = useState(initialStage);
  const [formData, setFormData] = useState<SetupFormData>({
    details: null,
    businessDetails: null,
    planDetails: null,
    networkDetails: null,
  });

  const handleYourDetailsSubmit = (data: z.infer<typeof yourDetailsSchema>) => {
    setFormData((prev) => ({ ...prev, details: data }));
    setStage(2); // Move to the business details form
  };

  const handleBusinessDetailsSubmit = (data: z.infer<typeof businessDetailsSchema>) => {
    setFormData((prev) => ({ ...prev, businessDetails: data }));
    setStage(3); // Move to the plans form
  };

  const handlePlansDetailsSubmit = (data: z.infer<typeof plansSchema>) => {
    setFormData((prev) => ({ ...prev, planDetails: data }));
    setStage(4);
  };

  const handleNetworkDetailsSubmit = (data: z.infer<typeof networkSchema>) => {
    console.log("Network Form Data: ", data);
    setFormData((prev) => {
      const updatedData = { ...prev, networkDetails: data };

      console.log("Full Form Data after update: ", updatedData);
      addTenantProfile(updatedData);
      return updatedData;
    });
    setStage(5); // Move to the completion stage
    handleConfetti();
  };

  const goBack = () => {
    setStage((prev) => Math.max(1, prev - 1)); // Go back to the previous form
  };

  const progress = 12.5 + (stage - 1) * 25; // Assuming 4 stages for full process

  const handleConfetti = () => {
    const end = Date.now() + 0.5 * 1000; // 3 seconds
    const colors = ["#2b85ca", "#0d283d", "#95c2e5", "#d2db88"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  useEffect(() => {
    console.log("isSetup:::::", isSetup);
    if (isSetup) {
      console.log("Setup is already complete. Moving to stage 5");
      setStage(5);
      handleConfetti();
    }

    console.log("POPUP CONFIG: isActive: ", isActive, "Stage: ", stage, "isSetup:", isSetup);
  }, [isActive]);

  return (
    <Dialog defaultOpen={true} modal={true} open={true}>
      <DialogContent className="max-w-screen-md">
        <DialogHeader>
          <div className="flex flex-col gap-8">
            {stage !== 5 && (
              <div className="flex flex-col gap-4">
                <p className="text-sm text-card-foreground">Email confirmed</p>
                <h2 className="text-xl font-semibold">Let's get you setup!</h2>
                <div className="flex flex-col gap-4">
                  <Progress value={progress} />
                  <SetupIcons currentStage={stage} />
                </div>
              </div>
            )}
            {stage === 1 && (
              <YourDetailsForm onSubmit={handleYourDetailsSubmit} initialData={formData.details} />
            )}
            {stage === 2 && (
              <BusinessDetailsForm onSubmit={handleBusinessDetailsSubmit} onBack={goBack} initialData={formData.businessDetails} />
            )}
            {stage === 3 && (
              <PlansForm onSubmit={handlePlansDetailsSubmit} onBack={goBack} initialData={formData.planDetails} />
            )}
            {stage === 4 && (
              <NetworkForm onSubmit={handleNetworkDetailsSubmit} onBack={goBack} initialData={formData.networkDetails} />
            )}
            {stage === 5 && (
              <div className="flex flex-col gap-8 relative">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row gap-1 items-center">
                    <span className="material-icons text-primary">check_circle</span>
                    <p className="text-2xl text-foreground font-semibold">Setup Complete!</p>
                  </div>
                  <p className="text-sm pr-24 text-card-foreground font-semibold underline">Thank you for submitting your setup details.</p>
                  <p className="text-sm pr-24 text-popup-foreground">Everything is now done on your end. One of our team members will be in touch with you shortly to finalise the process. We appreciate your patience and are excited to get you started!</p>
                </div>
                <div className="flex flex-row gap-4">
                  <Button variant="default" className="w-min">FAQ's</Button>
                  <Button variant="secondary" className="w-min">Contact Support</Button>
                </div>
              </div>
            )}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
