'use client';

import React, { useEffect, useState } from 'react';
import '../globals.css';  
import { Segment } from '@/types/index';  
import { fetchSegments } from '@/services/segmentsService';
import { PageHeader } from '@/components/PageHeader';
import { DataTable } from '@/components/DataTable';
import { columns } from './segment-columns';

function Index() {
    const [segments, setsegments] = useState<Segment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadsegments() {
            setIsLoading(true);
            console.log('Fetching segments...');
            const result = await fetchSegments();
            if (result.error) {
                console.error('Failed to fetch segments:', result.error);
                setError('Failed to load segments');
            } else {
                setsegments(result.data || []); 
            }
            setIsLoading(false);
        }

        loadsegments();
    }, []); 

    if (isLoading) {
        return <div>Loading...</div>;  // Loading indicator
    }

    if (error) {
        return <div>Error: {error}</div>;  // Display error message if there is an error
    }

    return (
        <div className='flex flex-col gap-8'>
            <PageHeader
                title="Segments"
                description="Overview of your segments"
                primaryButton={{ label: "New Segment", onClick: () => console.log("Clicked!") }}
            />
            <DataTable columns={columns} data={segments} />
        </div>
    );
}

export default Index;
