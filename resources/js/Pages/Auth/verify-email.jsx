import { GuestLayout } from '@/layouts/guest-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <div className="mb-4 text-sm text-muted-foreground">
                Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't
                receive the email, we will gladly send you another.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    A new verification link has been sent to the email address you provided during registration.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 gap-x-1 flex items-center justify-between">
                    <Button disabled={processing}>Resend Verification Email</Button>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className={cn(
                            buttonVariants({
                                variant: 'ghost',
                            }),
                        )}
                    >
                        Log Out
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
