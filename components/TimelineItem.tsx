// components/TimelineItem.tsx
import React from 'react';
import { Activity } from '@/types/index';

const TimelineItem = React.forwardRef(({ activity }: { activity: Activity }, ref) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'firstVisit':
        return '🟢';
      case 'visit':
        return '🔵';
      case 'interaction':
        return '🟡';
      case 'pulseSent':
        return '🔴';
      default:
        return '⚪';
    }
  };

  return (
    <div className="flex items-start mb-6">
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-card rounded-full mr-4 z-10">
        <span>{getIcon(activity.type)}</span>
      </div>
      <div className="bg-card p-4 rounded-lg shadow w-full">
        <p className="text-base">
          {activity.type}
        </p>
        <time className="block text-sm text-gray-500 mb-2">{new Date(activity.timestamp).toLocaleString()}</time>
        <p className="mb-2">{activity.description}</p>
        {activity.type === 'pulseSent' && <button className="text-blue-500 hover:underline">View Pulse</button>}
      </div>
    </div>
  );
});

export default TimelineItem;
