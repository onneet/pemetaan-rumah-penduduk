"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

// An icon component for demonstration
const MenuItemIcon = () => (
    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
);

const menuItems = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Manajemen Data', href: '/admin/data' },
    { name: 'Log Aktivitas', href: '/admin/logs' },
    { name: 'User Area', href: '/admin/users' },
    { name: 'Landing Page Setup', href: '/admin/landing-setup' },
    { name: 'Admin Profile', href: '/admin/profile' },
];

const AdminSidebar = () => {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.push('/login');
        } catch (error) {
            console.error('Logout failed:', error);
            // Optionally show an error message to the user
        }
    };

    return (
        <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
            <div className="p-5 border-b border-gray-700">
                <h2 className="text-xl font-bold">Admin Panel</h2>
            </div>
            <nav className="flex-grow p-3">
                <ul>
                    {menuItems.map((item) => (
                        <li key={item.name} className="mb-2">
                            <Link href={item.href}>
                                <div className={`flex items-center p-3 rounded-lg hover:bg-gray-700 cursor-pointer ${pathname === item.href ? 'bg-blue-600' : ''}`}>
                                    <MenuItemIcon />
                                    <span>{item.name}</span>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="p-3 border-t border-gray-700">
                <button
                    onClick={handleLogout}
                    className="flex items-center w-full p-3 rounded-lg hover:bg-red-700 cursor-pointer"
                >
                    <MenuItemIcon />
                    <span>Keluar</span>
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;
