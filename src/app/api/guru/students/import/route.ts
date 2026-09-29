import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import { query } from '@/lib/db';
import { generateStudentPassword, generateStudentUsername } from '../route';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'Tidak ada file yang diunggah' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Read workbook
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    if (!worksheet) {
      return NextResponse.json(
        { success: false, message: 'Format file tidak memiliki sheet yang valid' },
        { status: 400 }
      );
    }

    const rows: any[] = XLSX.utils.sheet_to_json(worksheet);

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'File kosong atau tidak memiliki baris data' },
        { status: 400 }
      );
    }

    let insertedCount = 0;
    const insertedStudents: any[] = [];

    for (const row of rows) {
      // Extract values with flexible key naming
      const rawName = row['Nama Lengkap'] || row['Nama'] || row['nama'] || row['Name'] || '';
      if (!rawName || typeof rawName !== 'string' || !rawName.trim()) {
        continue; // skip empty or guidance row
      }

      const name = rawName.trim();
      const nis = String(row['NIS'] || row['nis'] || '').trim();
      const className = String(row['Kelas'] || row['kelas'] || 'XI TKJ 1').trim();
      
      let rawUsername = String(row['Username'] || row['username'] || '').trim();
      if (!rawUsername) {
        rawUsername = generateStudentUsername(name, nis);
      }

      let rawPassword = String(row['Password'] || row['password'] || '').trim();
      if (!rawPassword) {
        rawPassword = generateStudentPassword();
      }

      const rawCourse = String(row['Enroll Kelas'] || row['Kelas Enrolled'] || 'cloud-computing').trim().toLowerCase();
      const courseSlug = rawCourse === 'semua' ? 'cloud-computing' : (rawCourse || 'cloud-computing');

      try {
        // Insert into users
        const insertRes: any = await query(
          `INSERT INTO users (username, password, name, role, nis, class_name)
           VALUES (?, ?, ?, 'siswa', ?, ?)
           ON DUPLICATE KEY UPDATE 
             name = VALUES(name),
             password = VALUES(password),
             nis = VALUES(nis),
             class_name = VALUES(class_name)`,
          [rawUsername, rawPassword, name, nis || null, className]
        );

        let userId = insertRes.insertId;
        if (!userId) {
          // If updated, fetch existing id
          const existing: any[] = await query(
            `SELECT id FROM users WHERE username = ? LIMIT 1`,
            [rawUsername]
          );
          if (existing && existing.length > 0) {
            userId = existing[0].id;
          }
        }

        if (userId) {
          // Enroll into course
          await query(
            `INSERT INTO enrollments (user_id, course_slug, status)
             VALUES (?, ?, 'active')
             ON DUPLICATE KEY UPDATE status = 'active'`,
            [userId, courseSlug]
          );

          insertedCount++;
          insertedStudents.push({
            id: userId,
            name,
            nis,
            class_name: className,
            username: rawUsername,
            password: rawPassword,
            course: courseSlug,
          });
        }
      } catch (err) {
        console.error(`Error importing row for ${name}:`, err);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Berhasil mengimpor ${insertedCount} data siswa!`,
      count: insertedCount,
      students: insertedStudents,
    });
  } catch (err: any) {
    console.error('Import error:', err);
    return NextResponse.json(
      { success: false, message: 'Gagal mengimpor file: ' + err.message },
      { status: 500 }
    );
  }
}
