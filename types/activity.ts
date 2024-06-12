export type Activity = {
  id: string;
  type: "visit" | "firstVisit" | "interaction" | "pulseSent";
  timestamp: string;
  description: string;
};
