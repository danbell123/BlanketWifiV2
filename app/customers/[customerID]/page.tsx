"use client";
import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation'; // New hooks for Next.js 14
import { fetchCustomerById } from '@/services/userService'; // Ensure path is correct
import { Customer } from '@/types/index'; // Ensure path and types are correct
import CustomerTimeline from '@/components/CustomerTimeline';
import { PageHeader } from '@/components/PageHeader'; 
import { Badge } from '@/components/ui/badge';

function CustomerProfile() {
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const pathname = usePathname();
    const customerID = pathname.split('/').pop(); // Gets the last segment of the path

    useEffect(() => {
        if (customerID) {
            console.log('Initiating fetch for customer ID:', customerID);
            const loadCustomer = async () => {
                setIsLoading(true);
                const result = await fetchCustomerById(customerID);
                if (result.error) {
                    console.error('Failed to fetch customer:', result.error);
                    setError('Failed to load customer data');
                } else if (!result.data) {
                    console.error('No data returned for customer:', customerID);
                    setError('No customer found with that ID');
                } else {
                    setCustomer(result.data);
                }
                setIsLoading(false);
            };

            loadCustomer();
        }
    }, [customerID]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!customer) {
        return <div>No customer data available.</div>;
    }

    return (
        <div className='flex flex-col gap-8 h-screen overflow-hidden'>
            <PageHeader
                title={customer?.firstname + ' ' + customer?.lastname}
                description={customer?.email}
                profilePictureURL={customer?.profilePictureURL} // Pass the image URL here
                backLink={{ url: '/customers', label: 'All Customers' }} // Custom label for the back link
                customerFirstName={customer?.firstname}
                customerLastName={customer?.lastname}
                primaryButton={{ label: "Send Pulse", onClick: () => console.log("Clicked!") }}
                secondaryButton={{ label: "Add To Segment", onClick: () => console.log("Export Clicked!"), variant: 'secondary' }}
            />

            <div className='flex flex-row flex-1 gap-12 overflow-hidden'>
                <div className='flex flex-col gap-4'>
                    <div className='flex w-full flex-col gap-4 bg-card p-4 rounded-lg text-base border'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-col gap-4'>
                                <div className="flex items-center">
                                    <span className="material-icons mr-2">email</span>
                                    <p>{customer?.email}</p>
                                </div>
                                <div className="flex items-center">
                                    <span className="material-icons mr-2">phone</span>
                                    <p>{customer?.tel}</p>
                                </div>
                                <div className="flex items-center">
                                    <span className="material-icons mr-2">cake</span>
                                    <p>{customer?.dob instanceof Date ? customer.dob.toDateString() : customer.dob}</p>
                                </div>
                                <div className="flex items-center">
                                    <span className="material-icons mr-2">wc</span>
                                    <p className='capitalize'>{customer?.gender}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex w-full flex-col gap-4 bg-card p-4 rounded-lg border'>
                        <div className='flex flex-col gap-4'>
                            <h2 className='text-base font-semibold'>Segments</h2>
                            <div className='flex flex-wrap gap-2'>
                                <Badge variant='outline'>Lost Customers</Badge>
                                <Badge variant='outline'>One time visits</Badge>
                                <Badge variant='outline'>No visits March</Badge>
                            </div>
                        </div>
                    </div>
                    <div className='flex w-full flex-col gap-4 bg-card p-4 rounded-lg border'>
                        <div className='flex flex-col gap-4'>
                            <h2 className='text-base font-semibold'>Visits</h2>
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-row gap-4'>
                                    <p className='text-base text-popover-foreground'>Last Visit:</p>
                                    <p className='text-base text-foreground'>2 days ago</p>
                                </div>
                                <div className='flex flex-row gap-4'>
                                    <p className='text-base text-popover-foreground'>Total Visits:</p>
                                    <p className='text-base text-foreground'>12</p>
                                </div>
                                <div className='flex flex-row gap-4'>
                                    <p className='text-base text-popover-foreground'>First Visit:</p>
                                    <p className='text-base text-foreground'>14 March 2023</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex w-full flex-col gap-4 overflow-auto mb-4'>
                    {customerID && <CustomerTimeline customerId={customerID} />}
                </div>
            </div>
        </div>
    );
}

export default CustomerProfile;
