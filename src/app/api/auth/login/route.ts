import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Username dan password wajib diisi' },
        { status: 400 }
      );
    }

    // Query user
    const users = await query<any[]>(
      'SELECT id, username, password, name, role, nis, class_name FROM users WHERE username = ? LIMIT 1',
      [username.trim()]
    );

    if (!users || users.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Akun tidak ditemukan. Periksa kembali username Anda.' },
        { status: 401 }
      );
    }

    const user = users[0];

    // Check password
    if (user.password !== password.trim()) {
      return NextResponse.json(
        { success: false, message: 'Password salah. Silakan tanyakan ke Pak Wahyu jika lupa password.' },
        { status: 401 }
      );
    }

    // Get enrollments
    const enrollments = await query<any[]>(
      'SELECT course_slug, status FROM enrollments WHERE user_id = ? AND status = "active"',
      [user.id]
    );

    // Get progress if any
    const progressList = await query<any[]>(
      'SELECT meeting_id, current_step, max_step, is_completed, pretest_score, posttest_score, lab_score, final_score, certificate_id FROM student_progress WHERE user_id = ?',
      [user.id]
    );

    const safeUser = {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
      nis: user.nis || '',
      class_name: user.class_name || 'XI TKJ 1',
      enrollments: enrollments.map((e) => e.course_slug),
      progress: progressList || [],
    };

    return NextResponse.json({
      success: true,
      message: 'Login berhasil',
      user: safeUser,
    });
  } catch (err: any) {
    console.error('Login error:', err);
    return NextResponse.json(
      {
        success: false,
        message: 'Gagal terhubung ke database server: ' + (err.message || 'Unknown error'),
      },
      { status: 500 }
    );
  }
}
