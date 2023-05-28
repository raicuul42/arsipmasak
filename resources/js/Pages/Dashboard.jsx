import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout.jsx';
import Container from '@/Components/Container.jsx';

export default function Dashboard() {
    return (
        <div>
            <Head title="Dashboard" />

            <div className="bg-gray-950 px-6 py-24 sm:py-32 lg:px-8">
                <Container>
                    <div className="max-w-2xl">
                        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Dashboard</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            Here you can find all the information about your application.
                        </p>
                    </div>
                </Container>
            </div>
        </div>
    );
}

Dashboard.layout = (page) => <AppLayout children={page} />;
