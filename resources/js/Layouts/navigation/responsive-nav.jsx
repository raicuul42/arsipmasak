import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Link, router, usePage } from '@inertiajs/react';
import { ApplicationLogo } from '@/components/application-logo';
import { BoxIcon, CoffeeIcon, FlameIcon, HomeIcon, LayoutGridIcon, MenuIcon, PowerIcon, Settings2Icon, UserPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ThemeSwitcher } from '@/components/theme-switcher';

export function ResponsiveNav() {
    const { auth } = usePage().props;
    const [open, setOpen] = useState(false);
    useEffect(() => {
        return router.on('finish', () => {
            setOpen(false);
        });
    }, []);
    return (
        <nav className="sm:hidden">
            <div className="fixed z-20 flex w-full items-center justify-between border-b px-4 py-3 shadow-sm backdrop-blur-lg">
                <Link href={route('home')}>
                    <ApplicationLogo className="h-6 w-6" />
                    <span className="sr-only">Go to home page</span>
                </Link>
                <div>
                    <ThemeSwitcher />
                    <Button className="ml-2 h-8" size="icon" variant="secondary" onClick={() => setOpen(true)}>
                        <MenuIcon className="h-5 w-5" />
                    </Button>
                </div>
            </div>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="right">
                    <Link href="/" className="mr-4">
                        <ApplicationLogo className="h-8 w-8" />
                    </Link>
                    <div className="-mx-2">
                        <NavLink active={route().current('home')} icon={HomeIcon} href={route('home')}>
                            Home
                        </NavLink>
                        <NavLink active={route().current('articles.index')} icon={CoffeeIcon} href={route('articles.index')}>
                            Articles
                        </NavLink>
                        {auth.user ? (
                            <>
                                <NavLink active={route().current('profile.edit')} icon={Settings2Icon} href={route('profile.edit')}>
                                    Settings
                                </NavLink>
                                <NavLink icon={LayoutGridIcon} active={route().current('articles.list')} href={route('articles.list')}>
                                    List of Articles
                                </NavLink>
                                <NavLink icon={PowerIcon} href={route('logout')} method="post" as="button">
                                    Logout
                                </NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink icon={BoxIcon} href={route('login')}>
                                    Login
                                </NavLink>

                                <NavLink icon={UserPlus} href={route('register')}>
                                    Register
                                </NavLink>
                            </>
                        )}
                    </div>
                </SheetContent>
            </Sheet>
        </nav>
    );
}

export function NavLink({ active, icon: Icon, ...props }) {
    return (
        <Link
            className={cn(
                'flex items-center rounded px-2 py-2 text-sm hover:bg-accent',
                active ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground',
            )}
            {...props}
        >
            <Icon className="mr-2 h-4 w-4" />
            {props.children}
        </Link>
    );
}
