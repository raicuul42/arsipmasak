import { Disclosure } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { BellIcon } from '@heroicons/react/24/outline';
import { Dropdown, DropdownLink } from '@/Components/Dropdown.jsx';
import NavLink from '@/Components/NavLink.jsx';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo.jsx';

export default function Navbar() {
    const { auth } = usePage().props;
    return (
        <Disclosure as="nav" className="bg-gray-950">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-screen-2xl px-2 sm:px-4 lg:px-8">
                        <div className="flex h-16 justify-between">
                            <div className="flex px-2 lg:px-0">
                                <div className="flex flex-shrink-0 items-center">
                                    <Link href="/">
                                        <ApplicationLogo className="h-8 w-8 fill-red-500" />
                                    </Link>
                                </div>
                                <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                                    {/*<NavLink href="/" children="Home" />*/}
                                    {/*<NavLink href="/articles" children="Blog" />*/}
                                </div>
                            </div>
                            <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
                                <div className="w-full max-w-lg lg:max-w-xs">
                                    <label htmlFor="search" className="sr-only">
                                        Search
                                    </label>
                                    <div className="relative">
                                        <div className="group pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input
                                            id="search"
                                            name="search"
                                            className="block w-full rounded-md border-0 bg-gray-800 py-1.5 pl-10 pr-3 text-sm leading-6 text-gray-900 text-white placeholder:text-gray-500 focus:bg-gray-700 focus:ring-gray-700"
                                            placeholder="Search"
                                            type="search"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="hidden lg:ml-4 lg:flex lg:items-center">
                                {auth.user ? (
                                    <Dropdown
                                        trigger={
                                            <>
                                                <img
                                                    className="h-10 w-10 rounded-full"
                                                    src={auth.user.gravatar}
                                                    alt={auth.user.name}
                                                />
                                            </>
                                        }
                                    >
                                        <div className="bg-gray-50 p-4 text-gray-950">
                                            <div className="flex">
                                                <div className="mr-2 shrink-0">
                                                    <img
                                                        className="h-8 w-8 rounded-full"
                                                        src={auth.user.gravatar}
                                                        alt={auth.user.name}
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold">{auth.user.name}</h4>
                                                    <p className="text-sm text-gray-500">{auth.user.email}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="py-1">
                                            <DropdownLink href={route('dashboard')}>Dashboard</DropdownLink>
                                            <DropdownLink href={route('profile.edit')}>Profile</DropdownLink>
                                        </div>
                                        <div className="py-1">
                                            <DropdownLink as="button" method="post" href={route('logout')}>
                                                Log out
                                            </DropdownLink>
                                        </div>
                                    </Dropdown>
                                ) : (
                                    <div className="ml-4 flex gap-x-8">
                                        <NavLink href="/register" children="Register" />
                                        <NavLink href="/login" children="Login" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="lg:hidden">
                        <div className="space-y-1 pb-3 pt-2">
                            {/* Current: "bg-cyan-50 border-cyan-500 text-cyan-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" */}
                            <Disclosure.Button
                                as="a"
                                href="#"
                                className="block border-l-4 border-cyan-500 bg-cyan-50 py-2 pl-3 pr-4 text-base font-medium text-cyan-700"
                            >
                                Dashboard
                            </Disclosure.Button>
                            <Disclosure.Button
                                as="a"
                                href="#"
                                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
                            >
                                Team
                            </Disclosure.Button>
                            <Disclosure.Button
                                as="a"
                                href="#"
                                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
                            >
                                Projects
                            </Disclosure.Button>
                            <Disclosure.Button
                                as="a"
                                href="#"
                                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
                            >
                                Calendar
                            </Disclosure.Button>
                        </div>
                        <div className="border-t border-gray-200 pb-3 pt-4">
                            <div className="flex items-center px-4">
                                <div className="flex-shrink-0">
                                    <img
                                        className="h-10 w-10 rounded-full"
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt=""
                                    />
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium text-gray-800">Tom Cook</div>
                                    <div className="text-sm font-medium text-gray-500">tom@example.com</div>
                                </div>
                                <button
                                    type="button"
                                    className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                                >
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                            <div className="mt-3 space-y-1">
                                <Disclosure.Button
                                    as="a"
                                    href="#"
                                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                                >
                                    Your Profile
                                </Disclosure.Button>
                                <Disclosure.Button
                                    as="a"
                                    href="#"
                                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                                >
                                    Settings
                                </Disclosure.Button>
                                <Disclosure.Button
                                    as="a"
                                    href="#"
                                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                                >
                                    Sign out
                                </Disclosure.Button>
                            </div>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}
