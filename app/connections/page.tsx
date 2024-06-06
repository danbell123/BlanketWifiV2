import '../globals.css';  
import { createClient } from '../../utils/supabase/server';

export default async function Index() {
    const supabase = createClient();

    type Connections = {
        timestamp: string;
        wifiUserID: string;
    };

    let data: Connections[];
    try {
        const { data: connections, error } = await supabase
            .from('connections')
            .select('*')

        if (error) throw error;
        data = connections;
        console.log('connections:', data);
    } catch (error) {
        console.error('Error fetching connections:', error);
        return <div>Error loading connections data!</div>;
    }

    return (
        <>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

        <div className="flex-1 w-full flex flex-col gap-20 items-center">
            connections
            <div>
                {data.map((connection) => (
                    <div key={connection.timestamp} className='p-4'>
                        <p>{connection.timestamp}</p>
                        <p>{connection.wifiUserID}</p>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
}