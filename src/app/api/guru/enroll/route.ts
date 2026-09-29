import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user_id, course_slug, action } = body; // action: 'enroll' | 'unenroll'

    if (!user_id || !course_slug) {
      return NextResponse.json(
        { success: false, message: 'User ID dan course slug wajib diisi' },
        { status: 400 }
      );
    }

    if (action === 'unenroll') {
      await query(
        `DELETE FROM enrollments WHERE user_id = ? AND course_slug = ?`,
        [user_id, course_slug]
      );
      return NextResponse.json({
        success: true,
        message: 'Siswa berhasil di-unenroll dari kelas',
      });
    } else {
      await query(
        `INSERT INTO enrollments (user_id, course_slug, status) 
         VALUES (?, ?, 'active') 
         ON DUPLICATE KEY UPDATE status = 'active'`,
        [user_id, course_slug]
      );
      return NextResponse.json({
        success: true,
        message: 'Siswa berhasil di-enroll ke kelas',
      });
    }
  } catch (err: any) {
    console.error('Enrollment error:', err);
    return NextResponse.json(
      { success: false, message: 'Gagal mengubah enrollment: ' + err.message },
      { status: 500 }
    );
  }
}
