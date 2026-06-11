"use client"; // This must be a client component to fetch data

import React, { useState, useEffect } from 'react';

// A simple utility to format dates
const formatDateTime = (isoString: string) => {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  return date.toLocaleString('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};

// A simple utility to format time ago
const timeAgo = (isoString: string) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
}

// --- Reusable Components ---

const StatCard = ({ title, value }: { title: string, value: string | number }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const ShortcutButton = ({ children }: { children: React.ReactNode }) => (
  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">
    {children}
  </button>
);

const UserLoginRow = ({ email, lastLogin }: { email: string, lastLogin: string }) => (
    <tr className="border-b">
        <td className="py-2 px-4">{email}</td>
        <td className="py-2 px-4 text-right">{formatDateTime(lastLogin)}</td>
    </tr>
);

const ActivityItem = ({ user, action, description, time }: { user: string, action: string, description: string, time: string }) => (
    <div className="border-l-2 border-blue-500 pl-4 py-2">
        <p className="font-bold">{user} - {action}</p>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-xs text-gray-400">{timeAgo(time)}</p>
    </div>
);

const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
);


// --- Main Page Component ---

const AdminDashboardPage = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/admin/dashboard');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
        <div className="p-8 bg-gray-50 min-h-screen">
             <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
             <LoadingSpinner />
        </div>
    )
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Summary Data */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Warga Terdata" value={data?.summary?.totalWarga ?? '...'} />
        <StatCard title="Total Pengguna" value={data?.summary?.totalPengguna ?? '...'} />
        <StatCard title="Aktivitas Hari Ini" value={data?.summary?.aktivitasHariIni ?? '...'} />
      </div>

      {/* Shortcut Menu */}
      <div className="flex space-x-4 mb-8">
        <ShortcutButton>Tambah Data Warga</ShortcutButton>
        <ShortcutButton>Kelola Pengguna</ShortcutButton>
        <ShortcutButton>Peta Dashboard</ShortcutButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 5 User Terakhir Login */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">5 User Terakhir Login</h2>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4">Email</th>
                <th className="text-right py-2 px-4">Waktu Login</th>
              </tr>
            </thead>
            <tbody>
              {data?.lastLogins?.map((user: any, index: number) => (
                <UserLoginRow key={index} email={user.email} lastLogin={user.last_login} />
              )) || <tr><td colSpan={2}>No data</td></tr>}
            </tbody>
          </table>
        </div>

        {/* Aktivitas User */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Aktivitas Terbaru</h2>
          <div className="space-y-4">
            {data?.activities?.map((activity: any, index: number) => (
                <ActivityItem key={index} user={activity.email} action={activity.action} description={activity.description} time={activity.created_at} />
            )) || <p>No recent activity</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;

