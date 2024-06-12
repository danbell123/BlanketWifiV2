import React from "react";
import { Activity } from "@/types/index";
import { Button } from "@/components/ui/button";

const TimelineItem = React.forwardRef<HTMLDivElement, { activity: Activity }>(
  ({ activity }, ref) => {
    // Helper function to determine the icon based on activity type
    const getIcon = (type: string) => {
      switch (type) {
        case "firstVisit":
          return <span className="material-icons">star</span>; // Icon for the first visit
        case "visit":
          return <span className="material-icons">place</span>; // Icon for visits
        case "interaction":
          return <span className="material-icons">people</span>; // Icon for interactions
        case "pulseSent":
          return <span className="material-icons">send</span>; // Icon for pulses sent
        default:
          return <span className="material-icons">help_outline</span>; // Fallback icon
      }
    };

    // Function to format activity type into a more readable format
    const formatActivityType = (type: string) => {
      switch (type) {
        case "firstVisit":
          return "First Visit";
        case "visit":
          return "Visit";
        case "interaction":
          return "Interaction";
        case "pulseSent":
          return "Pulse Sent";
        default:
          return "Unknown Activity";
      }
    };

    const getBackgroundColor = (type: string) => {
      switch (type) {
        case "firstVisit":
          return "#FFD700";
        case "visit":
          return "#6abccc";
        case "interaction":
          return "#5abf7d";
        case "pulseSent":
          return "#cc6a8e";
        default:
          return "#1f1f1f";
      }
    };

    return (
      <div className="flex items-center mb-6" ref={ref}>
        <div
          className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full mr-4 z-10"
          style={{ backgroundColor: getBackgroundColor(activity.type) }}
        >
          {getIcon(activity.type)}
        </div>
        <div className="flex flex-row bg-card p-4 rounded-lg shadow w-full">
          <div className="w-full flex flex-col gap-2 justify-end">
            <p className="text-lg font-semibold">
              {formatActivityType(activity.type)}
            </p>
            <time className="block text-sm text-popover-foreground">
              {new Date(activity.timestamp).toLocaleString()}
            </time>
            <p>{activity.description}</p>
          </div>
          <div className="flex flex-col justify-end">
            {activity.type === "pulseSent" && (
              <Button variant={"outline"} size={"sm"}>
                View Pulse
              </Button>
            )}
            {activity.type === "interaction" && (
              <Button variant={"outline"} size={"sm"}>
                View Pulse
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  },
);

export default TimelineItem;
