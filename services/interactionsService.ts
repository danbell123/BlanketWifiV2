// services/interactionsService.ts
import { Activity } from "@/types/index";

// Mock service functions for fetching interactions and pulses
export const fetchInteractions = async (
  userId: string,
  offset: number,
): Promise<Activity[]> => {
  // Replace with actual service call
  return [
    {
      id: "6",
      type: "interaction",
      timestamp: "2023-06-16T12:00:00Z",
      description: "Opened a pulse message",
    },
  ];
};

export const fetchPulses = async (
  userId: string,
  offset: number,
): Promise<Activity[]> => {
  // Replace with actual service call
  return [
    {
      id: "7",
      type: "pulseSent",
      timestamp: "2023-06-17T14:00:00Z",
      description: "Sent a pulse",
    },
    // ...more mock activities
  ];
};
