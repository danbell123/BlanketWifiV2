import '../globals.css';  
import { columns } from './columns';  
import { DataTable } from './data-table';  
import { Customer } from '@/types/index';  
import { createClient } from '../../utils/supabase/server';

export default async function Index() {
    // Initialize Supabase client
    const supabase = createClient();

    let data: Customer[];
    try {
        console.log('Fetching customers from wifiUsers table...');
        const { data: customers, error, count } = await supabase
            .from('wifiUsers')
            .select('*', { count: 'exact' });

        if (error) {
            console.error('Error during fetch:', error);
            throw error;
        }

        console.log(`Received ${count} customers.`);
        data = customers;
        console.log('Customers data:', data);
    } catch (error) {
        console.error('Error fetching customers:', error);
        return <div>Error loading customer data!</div>;
    }

    return (
        <>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

        <div className="flex-1 w-full flex flex-col gap-20 items-center">
            Customers
            <DataTable columns={columns} data={data} />
        </div>
        </>
    );
}
