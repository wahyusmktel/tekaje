import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const meetingId = searchParams.get('meeting_id');
    const className = searchParams.get('class_name');

    let sql = `
      SELECT 
        u.id AS user_id,
        u.name AS student_name,
        u.nis,
        u.class_name,
        sp.id AS progress_id,
        sp.meeting_id,
        sp.current_step,
        sp.max_step,
        sp.pretest_score,
        sp.posttest_score,
        sp.lab_score,
        sp.final_score,
        sp.is_completed,
        sp.certificate_id,
        sp.updated_at
      FROM users u
      LEFT JOIN student_progress sp ON u.id = sp.user_id
      WHERE u.role = 'siswa'
    `;

    const params: any[] = [];
    if (meetingId && meetingId !== 'all') {
      sql += ` AND sp.meeting_id = ?`;
      params.push(meetingId);
    }
    if (className && className !== 'all') {
      sql += ` AND u.class_name = ?`;
      params.push(className);
    }

    sql += ` ORDER BY u.class_name ASC, u.name ASC`;

    const rows = await query<any[]>(sql, params);

    return NextResponse.json({
      success: true,
      grades: rows,
    });
  } catch (err: any) {
    console.error('Error fetching grades:', err);
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil data nilai: ' + err.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      user_id,
      meeting_id = 'pertemuan-1',
      pretest_score = 0,
      posttest_score = 0,
      lab_score = 0,
      final_score = 0,
      is_completed = 0,
    } = body;

    if (!user_id) {
      return NextResponse.json(
        { success: false, message: 'User ID wajib diisi' },
        { status: 400 }
      );
    }

    // Auto compute final score if 0
    const computedFinal =
      final_score > 0
        ? final_score
        : Math.round(Number(pretest_score) * 0.3 + Number(posttest_score) * 0.7);

    const completed = is_completed || (computedFinal >= 75 ? 1 : 0);

    await query(
      `INSERT INTO student_progress 
        (user_id, meeting_id, pretest_score, posttest_score, lab_score, final_score, is_completed)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
        pretest_score = VALUES(pretest_score),
        posttest_score = VALUES(posttest_score),
        lab_score = VALUES(lab_score),
        final_score = VALUES(final_score),
        is_completed = VALUES(is_completed)`,
      [
        user_id,
        meeting_id,
        pretest_score,
        posttest_score,
        lab_score,
        computedFinal,
        completed,
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Nilai siswa berhasil disimpan',
      data: {
        user_id,
        meeting_id,
        pretest_score,
        posttest_score,
        lab_score,
        final_score: computedFinal,
        is_completed: completed,
      },
    });
  } catch (err: any) {
    console.error('Error updating grades:', err);
    return NextResponse.json(
      { success: false, message: 'Gagal menyimpan nilai siswa: ' + err.message },
      { status: 500 }
    );
  }
}
