import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';

export async function GET() {
  try {
    // Sample rows showing proper format
    const templateData = [
      {
        NIS: '20241001',
        'Nama Lengkap': 'Ahmad Fauzi Pratama',
        Kelas: 'XII TKJ 1',
        Username: 'ahmad.fauzi',
        Password: 'TKJ#821',
        'Enroll Kelas': 'cloud-computing',
      },
      {
        NIS: '20241002',
        'Nama Lengkap': 'Siti Nurhaliza',
        Kelas: 'XII TKJ 1',
        Username: 'siti.nurhaliza',
        Password: 'TKJ#822',
        'Enroll Kelas': 'cloud-computing',
      },
      {
        NIS: '20241003',
        'Nama Lengkap': 'Budi Santoso',
        Kelas: 'XII TKJ 2',
        Username: 'budi.santoso',
        Password: '',
        'Enroll Kelas': 'cloud-computing',
      },
      {
        NIS: '20241004',
        'Nama Lengkap': 'Dewi Lestari Putri',
        Kelas: 'XII TKJ 2',
        Username: '',
        Password: '',
        'Enroll Kelas': 'cloud-computing',
      },
    ];

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(templateData);

    // Set column widths
    ws['!cols'] = [
      { wch: 15 }, // NIS
      { wch: 28 }, // Nama Lengkap
      { wch: 16 }, // Kelas
      { wch: 20 }, // Username
      { wch: 18 }, // Password
      { wch: 22 }, // Enroll Kelas
    ];

    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data Siswa TKJ');

    // Instruction sheet
    const instructions = [
      { 'PANDUAN PENGISIAN TEMPLATE SISWA': '1. Kolom NIS, Nama Lengkap, dan Kelas wajib diisi.' },
      { 'PANDUAN PENGISIAN TEMPLATE SISWA': '2. Kolom Username bersifat opsional. Jika kosong, sistem otomatis membuat username dari nama siswa (contoh: ahmad.fauzi).' },
      { 'PANDUAN PENGISIAN TEMPLATE SISWA': '3. Kolom Password bersifat opsional. Jika kosong, sistem otomatis membuat password acak yang rapi (contoh: TKJ#738).' },
      { 'PANDUAN PENGISIAN TEMPLATE SISWA': '4. Kolom Enroll Kelas dapat diisi: cloud-computing, administrasi-server, administrasi-infrastruktur, cyber-security, atau dikosongkan (default: cloud-computing).' },
      { 'PANDUAN PENGISIAN TEMPLATE SISWA': '5. Simpan file ini dan upload melalui tombol "Import Data Siswa" di Portal Manajemen Guru.' },
    ];
    const wsHelp = XLSX.utils.json_to_sheet(instructions);
    wsHelp['!cols'] = [{ wch: 80 }];
    XLSX.utils.book_append_sheet(wb, wsHelp, 'Petunjuk');

    // Generate buffer
    const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    return new Response(buf, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="Template_Data_Siswa_TKJ.xlsx"',
      },
    });
  } catch (err: any) {
    console.error('Failed to generate template:', err);
    return NextResponse.json(
      { success: false, message: 'Gagal membuat template: ' + err.message },
      { status: 500 }
    );
  }
}
