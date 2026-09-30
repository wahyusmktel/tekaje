/**
 * Database Seeder for TEKAJE SMK Telkom Lampung
 * Menambahkan data guru: Hermawan Rijal Arasy, S.Kom. (password: smktelkom)
 * Menambahkan kelas: Administrasi Sistem Jaringan (ASJ)
 * Meng-enroll siswa ke kelas baru.
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

  // 2. Seed Teachers
  console.log('--- Seeding Teachers ---');
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
  console.log('--- Seeding Courses ---');
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
      title: 'Administrasi Server Jaringan (ASJ)',
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

  // 4. Enroll all existing students into 'administrasi-sistem-jaringan'
  console.log('--- Enrolling Students into Administrasi Sistem Jaringan ---');
  const [students] = await conn.query("SELECT id, name, username FROM users WHERE role = 'siswa'");
  for (const s of students) {
    await conn.query(
      `INSERT INTO enrollments (user_id, course_slug, status) 
       VALUES (?, 'administrasi-sistem-jaringan', 'active') 
       ON DUPLICATE KEY UPDATE status = 'active'`,
      [s.id]
    );
    console.log(`[+] Enrolled student: ${s.name} (${s.username})`);
  }

  console.log('\n--- Seeder Complete Successfully! ---');
  await conn.end();
}

seed().catch((err) => {
  console.error('Seeding error:', err);
  process.exit(1);
});
