import { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { InputError } from '@/components/input-error';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <>
            <Card className={className}>
                <CardHeader>
                    <CardTitle>Delete Account</CardTitle>

                    <CardDescription>
                        Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download
                        any data or information that you wish to retain.
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button variant="destructive" onClick={confirmUserDeletion}>
                        Delete Account
                    </Button>
                    <Dialog open={confirmingUserDeletion} onOpenChange={setConfirmingUserDeletion}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                                </DialogDescription>
                            </DialogHeader>

                            <form onSubmit={deleteUser}>
                                <div className="mt-6">
                                    <Label htmlFor="password" className="sr-only">
                                        Password
                                    </Label>

                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        ref={passwordInput}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="mt-1 block w-3/4"
                                        isFocused
                                        placeholder="Password"
                                    />

                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <Button variant="outline" onClick={closeModal}>
                                        Cancel
                                    </Button>

                                    <Button variant="destructive" className="ml-3" disabled={processing}>
                                        Delete Account
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </CardFooter>
            </Card>
        </>
    );
}
