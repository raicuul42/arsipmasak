import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Header from '@/Components/Header';

export default function Dashboard() {
    return (
        <div>
            <Head title="Dashboard" />
            <Header title="Dashboard" subtitle="Here you can find all the information about your application." />
        </div>
    );
}

Dashboard.layout = (page) => <AppLayout children={page} />;
