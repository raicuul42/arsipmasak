import { useEffect } from 'react';
import { GuestLayout } from '@/layouts/guest-layout';
import { InputError } from '@/components/input-error';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <div>
                    <Label htmlFor="email">Email</Label>

                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        autoFocus
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <Label htmlFor="password">Password</Label>

                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <label className="flex items-center">
                        <Checkbox defaultChecked={true} name="remember" onCheckedChange={(e) => setData('remember', e)} />

                        <span className="ml-2 select-none text-sm text-muted-foreground">Remember me</span>
                    </label>
                    {canResetPassword && (
                        <Link href="/forgot-password" className="text-sm font-medium text-foreground hover:underline">
                            Forgot password?
                        </Link>
                    )}
                </div>

                <div className="mt-4 flex items-center justify-end gap-x-2">
                    {canResetPassword && (
                        <Button variant="ghost" asChild>
                            <Link href="/Users/irsyadadl/sites/blog/resources/js/pages/auth/register">Register</Link>
                        </Button>
                    )}

                    <Button disabled={processing} type="submit">
                        Log in
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
