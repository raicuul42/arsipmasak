import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-950 pt-6 text-white sm:justify-center sm:pt-0">
            <div>
                <Link href="/">
                    <ApplicationLogo className="h-10 w-10" />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-gray-900 px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
