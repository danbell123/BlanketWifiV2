"use client";
import React, { useState, useEffect } from 'react';
import { fetchVisits } from '@/services/connectionsService';
import { fetchInteractions, fetchPulses } from '@/services/interactionsService';
import TimelineItem from './TimelineItem';
import { Activity } from '@/types/index';

const CustomerTimeline = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadedAll, setLoadedAll] = useState(false);
  const loadLimit = 12;

  const userId = '31103493-5860-4782-b3cb-9d283f61bc40'; // Hardcoded user ID
  console.log('Step 1: User ID:', userId);

  const loadMoreActivities = async () => {
    console.log('Loading more activities...');
    setLoading(true);

    try {
      const [visitsResult, interactionsResult, pulsesResult] = await Promise.all([
        fetchVisits(userId, activities.length, loadLimit),
        fetchInteractions(userId, activities.length, loadLimit),
        fetchPulses(userId, activities.length, loadLimit),
      ]);

      console.log('Visits result:', visitsResult);
      console.log('Interactions result:', interactionsResult);
      console.log('Pulses result:', pulsesResult);

      const newActivities = [
        ...(visitsResult.data || []),
        ...(interactionsResult.data || []),
        ...(pulsesResult.data || []),
      ];

      console.log('New activities:', newActivities);

      if (newActivities.length === 0) {
        console.log('No more activities to load.');
        setLoadedAll(true); // No more data to load
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

  // Initial load of activities
  useEffect(() => {
    console.log('Initial load of activities...');
    loadMoreActivities(); // Load activities when component mounts
  }, []); // Empty dependency array ensures this runs only once

  useEffect(() => {
    console.log('Activities state updated:', activities);
  }, [activities]);

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold mb-6">Customer Timeline</h2>
      <div className="relative">
        <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-primary z-0"></div>
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
