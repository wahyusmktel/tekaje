/**
 * Database Seeder for TEKAJE SMK Telkom Lampung
 * Menambahkan data guru: Hermawan Rijal Arasy, S.Kom. & Wahyu Hidayat, S.Kom.
 * Menambahkan kelas: Administrasi Sistem Jaringan (ASJ)
 * Menambahkan 36 Siswa Kelas XI TKJ 2 (Guru Hermawan)
 * Username: NIS masing-masing siswa
 * Password: smktelkom
 * Meng-enroll seluruh siswa ke kelas 'administrasi-sistem-jaringan'
 */

const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Read .env.local if present
function loadEnv() {
  const envPath = path.resolve(__dirname, '../.env.local');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    lines.forEach((line) => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [key, ...vals] = trimmed.split('=');
        process.env[key.trim()] = vals.join('=').trim();
      }
    });
  }
}

async function seed() {
  loadEnv();

  const host = process.env.DB_HOST || 'localhost';
  const port = Number(process.env.DB_PORT) || 3306;
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '0899';
  const database = process.env.DB_NAME || 'tekaje';

  console.log(`Connecting to MySQL ${host}:${port}/${database}...`);

  const conn = await mysql.createConnection({
    host,
    port,
    user,
    password,
    database,
  });

  console.log('Connected successfully!');

  // 1. Ensure table schema exists
  await conn.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      role ENUM('guru', 'siswa') NOT NULL DEFAULT 'siswa',
      nis VARCHAR(50) DEFAULT NULL,
      class_name VARCHAR(100) DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS courses (
      id INT AUTO_INCREMENT PRIMARY KEY,
      slug VARCHAR(100) UNIQUE NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      category VARCHAR(50) DEFAULT 'TKJ',
      is_active TINYINT(1) DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS enrollments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      course_slug VARCHAR(100) NOT NULL,
      enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      status VARCHAR(50) DEFAULT 'active',
      UNIQUE KEY unique_user_course (user_id, course_slug)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS student_progress (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      meeting_id VARCHAR(50) NOT NULL,
      current_step INT DEFAULT 1,
      max_step INT DEFAULT 1,
      is_completed TINYINT(1) DEFAULT 0,
      pretest_score INT DEFAULT 0,
      posttest_score INT DEFAULT 0,
      lab_score INT DEFAULT 0,
      final_score INT DEFAULT 0,
      certificate_id VARCHAR(100) DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY unique_user_meeting (user_id, meeting_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  // 2. Seed Teachers
  console.log('\n--- Seeding Teachers ---');
  const teachers = [
    {
      username: 'hermawan',
      password: 'smktelkom',
      name: 'Hermawan Rijal Arasy, S.Kom.',
      role: 'guru',
      nis: '199208172022011003',
      class_name: 'Pengampu ASJ',
    },
    {
      username: 'wahyu',
      password: 'smktelkom',
      name: 'Wahyu Hidayat, S.Kom.',
      role: 'guru',
      nis: '198905202022011001',
      class_name: 'Pengampu TKJ',
    },
  ];

  for (const t of teachers) {
    const [existing] = await conn.query('SELECT id FROM users WHERE username = ?', [t.username]);
    if (existing.length === 0) {
      await conn.query(
        'INSERT INTO users (username, password, name, role, nis, class_name) VALUES (?, ?, ?, ?, ?, ?)',
        [t.username, t.password, t.name, t.role, t.nis, t.class_name]
      );
      console.log(`[+] Added Teacher: ${t.name} (${t.username})`);
    } else {
      await conn.query(
        'UPDATE users SET password = ?, name = ?, role = ?, nis = ?, class_name = ? WHERE username = ?',
        [t.password, t.name, t.role, t.nis, t.class_name, t.username]
      );
      console.log(`[*] Updated Teacher: ${t.name} (${t.username})`);
    }
  }

  // 3. Seed Courses
  console.log('\n--- Seeding Courses ---');
  const courses = [
    {
      slug: 'administrasi-sistem-jaringan',
      title: 'Administrasi Sistem Jaringan (ASJ)',
      description: 'Materi & Praktikum Instalasi Web Server Apache2, Manajemen Linux Server, DNS BIND9, dan VirtualHost',
      category: 'TKJ',
      is_active: 1,
    },
    {
      slug: 'cloud-computing',
      title: 'Cloud Computing (Komputasi Awan)',
      description: 'Materi & Praktikum Virtualisasi KVM, Proxmox VE, dan IaaS Cloud di SMK Telkom Lampung',
      category: 'TKJ',
      is_active: 1,
    },
    {
      slug: 'administrasi-server',
      title: 'Administrasi Server Jaringan (Legacy)',
      description: 'Konfigurasi Linux Server, DNS, DHCP, Web Server Nginx & Apache',
      category: 'TKJ',
      is_active: 1,
    },
    {
      slug: 'administrasi-infrastruktur',
      title: 'Administrasi Infrastruktur Jaringan (AIJ)',
      description: 'Routing Dinamis OSPF, BGP, VLAN Trunking & Firewall Mikrotik/Cisco',
      category: 'TKJ',
      is_active: 1,
    },
    {
      slug: 'cyber-security',
      title: 'Keamanan Jaringan & Cyber Security',
      description: 'Analisis Keamanan Jaringan, Penetration Testing dasar, Hardening Server Linux',
      category: 'TKJ',
      is_active: 1,
    },
  ];

  for (const c of courses) {
    const [existing] = await conn.query('SELECT id FROM courses WHERE slug = ?', [c.slug]);
    if (existing.length === 0) {
      await conn.query(
        'INSERT INTO courses (slug, title, description, category, is_active) VALUES (?, ?, ?, ?, ?)',
        [c.slug, c.title, c.description, c.category, c.is_active]
      );
      console.log(`[+] Added Course: ${c.title} (${c.slug})`);
    } else {
      await conn.query(
        'UPDATE courses SET title = ?, description = ?, category = ?, is_active = ? WHERE slug = ?',
        [c.title, c.description, c.category, c.is_active, c.slug]
      );
      console.log(`[*] Updated Course: ${c.title} (${c.slug})`);
    }
  }

  // 4. Seed Siswa Kelas XI TKJ 2 (Siswa Guru Hermawan Rijal Arasy, S.Kom.)
  console.log('\n--- Seeding Siswa XI TKJ 2 (Siswa Guru Hermawan) ---');
  const studentsXITKJ2 = [
    { no: 1, name: "AMANDA NAJWA SALSA BELA", nis: "553251012", class_name: "XI TKJ 2" },
    { no: 2, name: "ANDHARA CHINTYA CHAYA", nis: "553251014", class_name: "XI TKJ 2" },
    { no: 3, name: "ARBIAN UTINA INDI", nis: "553251022", class_name: "XI TKJ 2" },
    { no: 4, name: "CHERA OKTAVIA AULIA", nis: "553251033", class_name: "XI TKJ 2" },
    { no: 5, name: "DIAZ PILANDRIKA SETIAWAN", nis: "553251034", class_name: "XI TKJ 2" },
    { no: 6, name: "DWI ANDI OKTOBARA", nis: "553251039", class_name: "XI TKJ 2" },
    { no: 7, name: "DWI EGI NUR ALAMSYAH", nis: "553251040", class_name: "XI TKJ 2" },
    { no: 8, name: "FARREL TAHTA PRAYOGA", nis: "553251050", class_name: "XI TKJ 2" },
    { no: 9, name: "GILANG PRATAMA", nis: "553251058", class_name: "XI TKJ 2" },
    { no: 10, name: "HASTA HADI NUGRAHA", nis: "553251061", class_name: "XI TKJ 2" },
    { no: 11, name: "INDRI FATMAWATI", nis: "553251066", class_name: "XI TKJ 2" },
    { no: 12, name: "JENNY OLIVIANA", nis: "553251069", class_name: "XI TKJ 2" },
    { no: 13, name: "JERINO WIRAGUNA", nis: "553251070", class_name: "XI TKJ 2" },
    { no: 14, name: "KEYSAR AURI PRATAMA", nis: "553251075", class_name: "XI TKJ 2" },
    { no: 15, name: "M. DIKA NUR APRIJAL", nis: "553251106", class_name: "XI TKJ 2" },
    { no: 16, name: "M. RASYID HABIBI", nis: "553251093", class_name: "XI TKJ 2" },
    { no: 17, name: "MUHAMAD HANIF NUR ROHMAN", nis: "553251107", class_name: "XI TKJ 2" },
    { no: 18, name: "MUHAMAD ILHAM", nis: "553251100", class_name: "XI TKJ 2" },
    { no: 19, name: "MUHAMMAD ADHITYA FAUZAN", nis: "553251102", class_name: "XI TKJ 2" },
    { no: 20, name: "MUHAMMAD FAHRI", nis: "553251099", class_name: "XI TKJ 2" },
    { no: 21, name: "MUHAMMAD RIDHO", nis: "553251114", class_name: "XI TKJ 2" },
    { no: 22, name: "MUHAMMAD SURYA ANDILA", nis: "553251116", class_name: "XI TKJ 2" },
    { no: 23, name: "MUHAMMAD YUSUF", nis: "553251117", class_name: "XI TKJ 2" },
    { no: 24, name: "NIZAR IBNU NARAIYA PUTRA", nis: "553251131", class_name: "XI TKJ 2" },
    { no: 25, name: "NOPI FRIDA RIYANTI", nis: "553251132", class_name: "XI TKJ 2" },
    { no: 26, name: "REFY FAUZI", nis: "553251145", class_name: "XI TKJ 2" },
    { no: 27, name: "RESQI SATRIA AGUNG", nis: "553251148", class_name: "XI TKJ 2" },
    { no: 28, name: "RICI ALFAN AL FAQIH", nis: "553251153", class_name: "XI TKJ 2" },
    { no: 29, name: "RIO RIZKI RAMADAN", nis: "553251155", class_name: "XI TKJ 2" },
    { no: 30, name: "RIRIN FEBRIANI", nis: "553251156", class_name: "XI TKJ 2" },
    { no: 31, name: "SAHWA CHARUSSIFA", nis: "553251164", class_name: "XI TKJ 2" },
    { no: 32, name: "SALMA SIERA ELIKA", nis: "553251165", class_name: "XI TKJ 2" },
    { no: 33, name: "SALSA NADIA RHAMADANI", nis: "553251166", class_name: "XI TKJ 2" },
    { no: 34, name: "TITANIA OCSYLA ATANSYAH", nis: "553251176", class_name: "XI TKJ 2" },
    { no: 35, name: "WAHYUDI", nis: "553251182", class_name: "XI TKJ 2" },
    { no: 36, name: "YENI GUSNILA", nis: "553251184", class_name: "XI TKJ 2" },
  ];

  let addedCount = 0;
  let updatedCount = 0;

  for (const s of studentsXITKJ2) {
    const defaultPassword = 'smktelkom';
    const username = s.nis; // Username = NIS

    const [existing] = await conn.query('SELECT id FROM users WHERE username = ?', [username]);
    let userId;

    if (existing.length === 0) {
      const [insertRes] = await conn.query(
        'INSERT INTO users (username, password, name, role, nis, class_name) VALUES (?, ?, ?, ?, ?, ?)',
        [username, defaultPassword, s.name, 'siswa', s.nis, s.class_name]
      );
      userId = insertRes.insertId;
      addedCount++;
      console.log(`[+] Added Siswa #${s.no}: ${s.name} (NIS/User: ${username})`);
    } else {
      userId = existing[0].id;
      await conn.query(
        'UPDATE users SET password = ?, name = ?, role = ?, nis = ?, class_name = ? WHERE id = ?',
        [defaultPassword, s.name, 'siswa', s.nis, s.class_name, userId]
      );
      updatedCount++;
      console.log(`[*] Updated Siswa #${s.no}: ${s.name} (NIS/User: ${username})`);
    }

    // Enroll into 'administrasi-sistem-jaringan'
    await conn.query(
      `INSERT INTO enrollments (user_id, course_slug, status) 
       VALUES (?, 'administrasi-sistem-jaringan', 'active') 
       ON DUPLICATE KEY UPDATE status = 'active'`,
      [userId]
    );
  }

  console.log(`\nSelesai memproses ${studentsXITKJ2.length} siswa XI TKJ 2:`);
  console.log(`- ${addedCount} siswa baru ditambahkan`);
  console.log(`- ${updatedCount} siswa diperbarui`);
  console.log(`- Seluruh 36 siswa berhasil di-enroll ke kelas 'administrasi-sistem-jaringan'!`);

  // 5. Pastikan semua siswa di database ter-enroll ke 'administrasi-sistem-jaringan'
  console.log('\n--- Final Enrollment Check for all students ---');
  const [allStudents] = await conn.query("SELECT id, name, username FROM users WHERE role = 'siswa'");
  for (const s of allStudents) {
    await conn.query(
      `INSERT INTO enrollments (user_id, course_slug, status) 
       VALUES (?, 'administrasi-sistem-jaringan', 'active') 
       ON DUPLICATE KEY UPDATE status = 'active'`,
      [s.id]
    );
  }
  console.log(`Total ${allStudents.length} siswa sekarang terdaftar di kelas 'administrasi-sistem-jaringan'.`);

  console.log('\n=========================================');
  console.log('✅ SEEDER DATABASE SELESAI DENGAN SUKSES!');
  console.log('=========================================');
  await conn.end();
}

seed().catch((err) => {
  console.error('Seeding error:', err);
  process.exit(1);
});
