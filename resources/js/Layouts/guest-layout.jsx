import { ApplicationLogo } from '@/components/application-logo';
import { Link } from '@inertiajs/react';
import { Card } from '@/components/ui/card';

export function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link href="/">
                    <ApplicationLogo className="h-10 w-10" />
                </Link>
            </div>

            <Card className="mt-6 w-full max-w-md p-6">{children}</Card>
        </div>
    );
}
