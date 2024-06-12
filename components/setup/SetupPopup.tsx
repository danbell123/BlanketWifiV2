import React, { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import YourDetailsForm from "./YourDetailsForm";
import BusinessDetailsForm from "./BusinessDetailsForm";
import PlansForm from "./PlansForm";
import yourDetailsSchema from "@/types/setupForms/yourDetailsSchema";
import businessDetailsSchema from "@/types/setupForms/businessDetailsSchema";
import plansSchema from "@/types/setupForms/plansSchema";
import { z } from "zod";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";

interface FormData {
  details: z.infer<typeof yourDetailsSchema>;
  businessDetails: z.infer<typeof businessDetailsSchema>;
  planDetails: z.infer<typeof plansSchema>;
}

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
                className={`rounded-full p-3 flex items-center justify-center ${isPast ? "bg-green-500" : isActive ? "bg-primary" : "bg-background"}`}
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

export default function SetupPopup() {
  const [stage, setStage] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    details: null,
    businessDetails: null,
    planDetails: null,
  });

  const handleYourDetailsSubmit = (data: z.infer<typeof yourDetailsSchema>) => {
    setFormData((prev) => ({ ...prev, details: data }));
    setStage(2); // Move to the business details form
  };

  const handleBusinessDetailsSubmit = (
    data: z.infer<typeof businessDetailsSchema>,
  ) => {
    setFormData((prev) => ({ ...prev, businessDetails: data }));
    setStage(3); // Move to the plans form
  };

  const handlePlansDetailsSubmit = (data: z.infer<typeof plansSchema>) => {
    setFormData((prev) => ({ ...prev, planDetails: data }));
    setStage(4); // Completion stage
  };

  const goBack = () => {
    setStage((prev) => Math.max(1, prev - 1)); // Go back to the previous form
  };

  const progress = 12.5 + (stage - 1) * 25; // Assuming 4 stages for full process

  return (
    <Dialog defaultOpen={true}>
      <DialogContent className="max-w-screen-lg">
        <DialogHeader>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <p className="text-sm text-card-foreground">Email confirmed</p>
              <h2 className="text-xl font-semibold">Let's get you setup!</h2>
              <div className="flex flex-col gap-4">
                <Progress value={progress} />

                <SetupIcons currentStage={stage} />
              </div>
            </div>
            {stage === 1 && (
              <YourDetailsForm
                onSubmit={handleYourDetailsSubmit}
                initialData={formData.details}
              />
            )}
            {stage === 2 && (
              <BusinessDetailsForm
                onSubmit={handleBusinessDetailsSubmit}
                onBack={goBack}
                initialData={formData.businessDetails}
              />
            )}
            {stage === 3 && (
              <PlansForm
                onSubmit={handlePlansDetailsSubmit}
                onBack={goBack}
                initialData={formData.planDetails}
              />
            )}
            {stage === 4 && <div>Setup Complete!</div>}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
