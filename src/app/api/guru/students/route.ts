import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// Helper to generate clean student password
export function generateStudentPassword(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let rand = '';
  for (let i = 0; i < 4; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `TKJ#${rand}`;
}

// Helper to generate clean student username from name
export function generateStudentUsername(name: string, nis?: string): string {
  if (nis && nis.trim()) {
    const cleanNis = nis.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    if (cleanNis) return `siswa.${cleanNis}`;
  }
  const cleanName = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .slice(0, 2)
    .join('.');
  const randNum = Math.floor(10 + Math.random() * 90);
  return `${cleanName || 'siswa'}.${randNum}`;
}

export async function GET() {
  try {
    const students = await query<any[]>(`
      SELECT 
        u.id, 
        u.username, 
        u.password, 
        u.name, 
        u.nis, 
        u.class_name, 
        u.created_at,
        GROUP_CONCAT(DISTINCT e.course_slug) AS enrolled_courses,
        COUNT(DISTINCT sp.id) AS completed_labs
      FROM users u
      LEFT JOIN enrollments e ON u.id = e.user_id AND e.status = 'active'
      LEFT JOIN student_progress sp ON u.id = sp.user_id AND sp.is_completed = 1
      WHERE u.role = 'siswa'
      GROUP BY u.id
      ORDER BY u.class_name ASC, u.name ASC
    `);

    const formatted = students.map((s) => ({
      id: s.id,
      username: s.username,
      password: s.password,
      name: s.name,
      nis: s.nis || '-',
      class_name: s.class_name || 'XI TKJ 1',
      created_at: s.created_at,
      courses: s.enrolled_courses ? s.enrolled_courses.split(',') : [],
      completed_labs: Number(s.completed_labs) || 0,
    }));

    return NextResponse.json({
      success: true,
      students: formatted,
    });
  } catch (err: any) {
    console.error('Error fetching students:', err);
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil data siswa: ' + err.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, nis, class_name, username, password, courses } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, message: 'Nama siswa wajib diisi' },
        { status: 400 }
      );
    }

    const finalUsername = (username && username.trim()) 
      ? username.trim().toLowerCase() 
      : generateStudentUsername(name, nis);

    const finalPassword = (password && password.trim()) 
      ? password.trim() 
      : generateStudentPassword();

    const finalNis = (nis && nis.trim()) ? nis.trim() : null;
    const finalClass = (class_name && class_name.trim()) ? class_name.trim() : 'XI TKJ 1';

    // Insert user
    const insertResult: any = await query(
      `INSERT INTO users (username, password, name, role, nis, class_name)
       VALUES (?, ?, ?, 'siswa', ?, ?)`,
      [finalUsername, finalPassword, name.trim(), finalNis, finalClass]
    );

    const newUserId = insertResult.insertId;

    // Enroll into courses (default to 'cloud-computing' if none provided)
    const coursesToEnroll = Array.isArray(courses) && courses.length > 0 
      ? courses 
      : ['cloud-computing'];

    for (const cSlug of coursesToEnroll) {
      await query(
        `INSERT INTO enrollments (user_id, course_slug, status) 
         VALUES (?, ?, 'active') 
         ON DUPLICATE KEY UPDATE status = 'active'`,
        [newUserId, cSlug]
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Siswa berhasil ditambahkan',
      student: {
        id: newUserId,
        username: finalUsername,
        password: finalPassword,
        name: name.trim(),
        nis: finalNis,
        class_name: finalClass,
        courses: coursesToEnroll,
      },
    });
  } catch (err: any) {
    console.error('Error creating student:', err);
    if (err.code === 'ER_DUP_ENTRY') {
      return NextResponse.json(
        { success: false, message: 'Username sudah digunakan oleh siswa lain. Silakan ubah username.' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Gagal menambahkan siswa: ' + err.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, nis, class_name, username, password, courses } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'ID siswa wajib disertakan' },
        { status: 400 }
      );
    }

    // Update basic info
    await query(
      `UPDATE users 
       SET name = ?, username = ?, password = ?, nis = ?, class_name = ?
       WHERE id = ? AND role = 'siswa'`,
      [name.trim(), username.trim(), password.trim(), nis || null, class_name || 'XI TKJ 1', id]
    );

    // Update courses if provided
    if (Array.isArray(courses)) {
      // Remove existing enrollments
      await query(`DELETE FROM enrollments WHERE user_id = ?`, [id]);
      // Insert new ones
      for (const cSlug of courses) {
        await query(
          `INSERT INTO enrollments (user_id, course_slug, status) VALUES (?, ?, 'active')`,
          [id, cSlug]
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Data siswa berhasil diperbarui',
    });
  } catch (err: any) {
    console.error('Error updating student:', err);
    return NextResponse.json(
      { success: false, message: 'Gagal memperbarui siswa: ' + err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'ID siswa tidak ditemukan' },
        { status: 400 }
      );
    }

    await query(`DELETE FROM users WHERE id = ? AND role = 'siswa'`, [id]);

    return NextResponse.json({
      success: true,
      message: 'Siswa berhasil dihapus',
    });
  } catch (err: any) {
    console.error('Error deleting student:', err);
    return NextResponse.json(
      { success: false, message: 'Gagal menghapus siswa: ' + err.message },
      { status: 500 }
    );
  }
}
