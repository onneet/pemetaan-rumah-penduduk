import pool from '@/lib/db';
import Dashboard from '@/components/Dashboard';
import { Warga } from '@/components/Sidebar';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

async function getWargaData(): Promise<Warga[]> {
  try {
    // Only fetch essential fields for map and sidebar
    const [rows] = await pool.query('SELECT id, nama, alamat, lokasi, foto FROM warga');
    const data = rows as any[];

    return data.map((row) => {
      let lat = 0;
      let lng = 0;

      // Extract coordinates from Google Maps embed URL
      // Latitude is usually after !3d and Longitude after !2d
      const latMatch = row.lokasi.match(/!3d(-?\d+\.\d+)/);
      const lngMatch = row.lokasi.match(/!2d(-?\d+\.\d+)/);

      if (latMatch && lngMatch) {
        lat = parseFloat(latMatch[1]);
        lng = parseFloat(lngMatch[1]);
      } else {
        // Fallback for some links that might use 2d/3d differently or other formats
        // This is a basic extraction, can be improved
      }

      return {
        id: row.id,
        nama: row.nama,
        alamat: row.alamat,
        lokasi: row.lokasi,
        deskripsi: row.deskripsi,
        foto: row.foto,
        lat,
        lng,
      };
    }).filter(w => w.lat !== 0); // Only return those with valid coordinates for the map
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}

export default async function Page() {
  const initialWarga = await getWargaData();

  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  let role: 'admin' | 'visitor' = 'visitor';

  if (token) {
    const payload = await verifyToken(token);
    if (payload && payload.role === 'admin') {
      role = 'admin';
    }
  }

  return <Dashboard initialWarga={initialWarga} role={role} />;
}
