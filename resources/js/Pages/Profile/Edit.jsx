import { AppLayout } from '@/layouts/app-layout';
import { DeleteUserForm } from '@/pages/profile/partials/delete-user-form';
import { UpdatePasswordForm } from '@/pages/profile/partials/update-password-form';
import { UpdateProfileInformationForm } from '@/pages/profile/partials/update-profile-information-form';
import { Head } from '@inertiajs/react';
import { Header } from '@/components/header';
import { Container } from '@/components/container';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <>
            <Head title="Profile" />
            <Header title="Profile" subtitle="Update your account's profile information and email address." />
            <div className="py-12">
                <Container>
                    <div className="space-y-6">
                        <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} className="max-w-xl" />
                        <UpdatePasswordForm className="max-w-xl" />
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </Container>
            </div>
        </>
    );
}

Edit.layout = (page) => <AppLayout children={page} />;
