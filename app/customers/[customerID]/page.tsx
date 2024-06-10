"use client";
import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation'; // New hooks for Next.js 14
import { fetchCustomerById } from '@/services/userService'; // Ensure path is correct
import { Customer } from '@/types/index'; // Ensure path and types are correct
import CustomerTimeline from '@/components/CustomerTimeline';
import { PageHeader } from '@/components/PageHeader'; 

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
        <div className='flex flex-col gap-8'>
            <PageHeader
                title={customer?.firstname + ' ' + customer?.lastname}
                description="This page shows detailed information about the customer."
                image={customer?.profilePictureURL} // Pass the image URL here
                backLink={{ url: '/customers', label: 'All Customers' }} // Custom label for the back link
                primaryButton={{ label: "Edit Customer", onClick: () => console.log("Clicked!") }}
                secondaryButton={{ label: "Add To Segment", onClick: () => console.log("Export Clicked!"), variant: 'secondary' }}
            />
            <p><strong>ID:</strong> {customer?.wifi_user_id}</p>
            <p><strong>First Name:</strong> {customer?.firstname}</p>
            <p><strong>Last Name:</strong> {customer?.lastname}</p>
            <p><strong>Email:</strong> {customer?.email}</p>
            <p><strong>Telephone:</strong> {customer?.tel}</p>
            <p><strong>Date of Birth:</strong> {customer?.dob instanceof Date ? customer.dob.toDateString() : customer.dob}</p>
            <p><strong>Gender:</strong> {customer?.gender}</p>
            <p><strong>Profile Picture URL:</strong> {customer?.profilePictureURL && <a href={customer.profilePictureURL} target="_blank" rel="noopener noreferrer">View Profile Picture</a>}</p>
            <div>
                {customerID && <CustomerTimeline customerId={customerID} />}
            </div>
        </div>
    );
}

export default CustomerProfile;
