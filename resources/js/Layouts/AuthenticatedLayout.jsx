import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const role = auth.user.role;

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white flex-shrink-0">
                <div className="p-4 text-2xl font-bold border-b border-gray-700">
                    EM SYSTEM
                </div>
                <nav className="mt-4 flex flex-col">
                    <Link href={route('dashboard')} className="px-4 py-2 hover:bg-gray-700">
                        Dashboard
                    </Link>
                    {/* Role-based links */}
                    {role === 1 && (
                        <Link href={route('events.index')} className="px-4 py-2 hover:bg-gray-700">
                            Events Management
                        </Link>
                    )}

                    {role === 2 && (
                        <Link href={route('events.frontend')} className="px-4 py-2 hover:bg-gray-700">
                            Events
                        </Link>
                    )}
                    {/* Add more links here */}
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex flex-col flex-1">
                {/* Navbar */}
                <header className="bg-white shadow px-4 py-4 flex justify-between items-center">
                    <div>{header}</div>
                    <div className="flex items-center gap-4">
                        <span>{auth.user.name}</span>
                        <Link href={route('logout')} method="post" as="button" className="text-sm bg-red-500 text-white px-3 py-1 rounded">
                            Logout
                        </Link>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6 bg-gray-100 flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}
