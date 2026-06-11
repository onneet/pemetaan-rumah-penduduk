// app/api/admin/dashboard/route.ts
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    // Run all queries in parallel for efficiency
    const [summary, lastLogins, activities] = await Promise.all([
      getSummaryData(),
      getLastLogins(),
      getRecentActivities()
    ]);

    return NextResponse.json({
      summary,
      lastLogins,
      activities
    });

  } catch (error) {
    console.error('Admin Dashboard API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}

async function getSummaryData() {
  const [totalWargaResult] = await pool.query("SELECT COUNT(*) as totalWarga FROM warga");
  const [totalPenggunaResult] = await pool.query("SELECT COUNT(*) as totalPengguna FROM users");
  const [aktivitasHariIniResult] = await pool.query("SELECT COUNT(*) as aktivitasHariIni FROM user_activities WHERE DATE(created_at) = CURDATE()");

  const totalWarga = (totalWargaResult as any)[0].totalWarga;
  const totalPengguna = (totalPenggunaResult as any)[0].totalPengguna;
  const aktivitasHariIni = (aktivitasHariIniResult as any)[0].aktivitasHariIni;

  return { totalWarga, totalPengguna, aktivitasHariIni };
}

async function getLastLogins() {
  const [rows] = await pool.query(`
    SELECT email, last_login 
    FROM users 
    WHERE last_login IS NOT NULL
    ORDER BY last_login DESC 
    LIMIT 5
  `);
  return rows;
}

async function getRecentActivities() {
  const [rows] = await pool.query(`
    SELECT u.email, ua.action, ua.description, ua.created_at
    FROM user_activities ua
    JOIN users u ON ua.user_id = u.id
    ORDER BY ua.created_at DESC
    LIMIT 10
  `);
  return rows;
}
