"use client";
import React, { useState, useEffect } from 'react';
import { fetchInteractions, fetchPulses } from '@/services/interactionsService';
import { fetchVisits } from '@/services/connectionsService';
import TimelineItem from './TimelineItem';
import { Activity } from '@/types/index';

interface CustomerTimelineProps {
  customerId: string;  // Define the type for customerId prop
}

const CustomerTimeline: React.FC<CustomerTimelineProps> = ({ customerId }) => {  // Accept customerId as a prop
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadedAll, setLoadedAll] = useState(false);
  const loadLimit = 12;

  console.log('Step 1: User ID:', customerId);  // Use the passed customerId

  const loadMoreActivities = async () => {
    console.log('Loading more activities...');
    setLoading(true);

    try {
      const [visitsResult, interactionsResult, pulsesResult] = await Promise.all([
        fetchVisits(customerId, activities.length, loadLimit),
        fetchInteractions(customerId, activities.length, ),
        fetchPulses(customerId, activities.length, ),
      ]);

      // Similar logic as before
      const newActivities = [
        ...(visitsResult.data || []),
        ...(interactionsResult || []),
        ...(pulsesResult || []),
      ];

      console.log('New activities:', newActivities);
      if (newActivities.length === 0) {
        console.log('No more activities to load.');
        setLoadedAll(true);
      } else {
        newActivities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        setActivities((prev) => [...prev, ...newActivities]);
      }
    } catch (error) {
      console.error('Error loading more activities:', error);
    }

    setLoading(false);
    console.log('Loading state set to false.');
  };

  useEffect(() => {
    loadMoreActivities();  // Load activities when component mounts
  }, []);  // Dependency on customerId is not added here to prevent re-running when customerId changes

  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute left-4 top-16 bottom-0 w-0.5 bg-primary z-0"></div>
        {activities.map((activity, index) => (
          <TimelineItem key={activity.id} activity={activity} />
        ))}
        {loading && <div>Loading...</div>}
        {!loading && !loadedAll && (
          <button onClick={loadMoreActivities} className="mt-4 p-2 bg-blue-500 text-white rounded">
            Load More
          </button>
        )}
        {loadedAll && <div>No more activities to load.</div>}
      </div>
    </div>
  );
};

export default CustomerTimeline;
