import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import pool from '@/lib/db';
import { signToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const users = rows as any[];

    if (users.length === 0) {
      return NextResponse.json({ error: 'Kredensial tidak valid' }, { status: 401 });
    }

    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ error: 'Kredensial tidak valid' }, { status: 401 });
    }

    // Update last_login and create user activity log
    await Promise.all([
      pool.query('UPDATE users SET last_login = NOW() WHERE id = ?', [user.id]),
      pool.query('INSERT INTO user_activities (user_id, action, description) VALUES (?, ?, ?)', [user.id, 'Login', 'Melakukan Login'])
    ]);

    // Role 1 is Admin, everything else is visitor
    const role = user.role === 1 ? 'admin' : 'visitor';
    const token = await signToken({ id: user.id, email: user.email, role });

    const response = NextResponse.json({ success: true, role });
    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 1 day
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan pada server' }, { status: 500 });
  }
}
