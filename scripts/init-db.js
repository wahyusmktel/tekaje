const mysql = require('mysql2/promise');

async function initDB() {
  console.log('Connecting to MariaDB tekaje...');
  const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '0899',
    database: 'tekaje'
  });

  console.log('Connected! Creating tables...');

  // 1. Users table
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(60) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      name VARCHAR(120) NOT NULL,
      role ENUM('guru', 'siswa') NOT NULL DEFAULT 'siswa',
      nis VARCHAR(30) NULL,
      class_name VARCHAR(50) NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  // 2. Courses table
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS courses (
      id INT AUTO_INCREMENT PRIMARY KEY,
      slug VARCHAR(60) NOT NULL UNIQUE,
      title VARCHAR(120) NOT NULL,
      description TEXT,
      category VARCHAR(50) DEFAULT 'TKJ',
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  // 3. Enrollments table
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS enrollments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      course_slug VARCHAR(60) NOT NULL,
      enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      status ENUM('active', 'completed', 'inactive') DEFAULT 'active',
      UNIQUE KEY user_course_unique (user_id, course_slug),
      CONSTRAINT fk_enrollments_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  // 4. Student progress table
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS student_progress (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      meeting_id VARCHAR(50) NOT NULL,
      current_step INT DEFAULT 1,
      max_step INT DEFAULT 1,
      is_completed BOOLEAN DEFAULT FALSE,
      pretest_score INT DEFAULT 0,
      posttest_score INT DEFAULT 0,
      lab_score INT DEFAULT 0,
      final_score INT DEFAULT 0,
      certificate_id VARCHAR(100) NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY user_meeting_unique (user_id, meeting_id),
      CONSTRAINT fk_progress_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  console.log('Tables created or already exist.');

  // Seed default teacher
  await connection.execute(`
    INSERT INTO users (username, password, name, role, nis, class_name)
    VALUES ('wahyu', 'smktelkom', 'Wahyu Hidayat, S.Kom.', 'guru', '198905202022011001', 'Pengampu TKJ')
    ON DUPLICATE KEY UPDATE name=VALUES(name), password=VALUES(password);
  `);

  // Seed standard courses
  const initialCourses = [
    { slug: 'cloud-computing', title: 'Cloud Computing (Komputasi Awan)', desc: 'Materi & Praktikum Virtualisasi KVM, Proxmox VE, dan IaaS Cloud di SMK Telkom Lampung' },
    { slug: 'administrasi-server', title: 'Administrasi Server Jaringan (ASJ)', desc: 'Konfigurasi Linux Server, DNS, DHCP, Web Server Nginx & Apache' },
    { slug: 'administrasi-infrastruktur', title: 'Administrasi Infrastruktur Jaringan (AIJ)', desc: 'Routing Dinamis OSPF, BGP, VLAN Trunking & Firewall Mikrotik/Cisco' },
    { slug: 'cyber-security', title: 'Keamanan Jaringan & Cyber Security', desc: 'Analisis Keamanan Jaringan, Penetration Testing dasar, Hardening Server Linux' },
  ];

  for (const c of initialCourses) {
    await connection.execute(`
      INSERT INTO courses (slug, title, description)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE title=VALUES(title), description=VALUES(description);
    `, [c.slug, c.title, c.desc]);
  }

  // Seed sample students if none exist
  const [existingStudents] = await connection.execute('SELECT COUNT(*) as count FROM users WHERE role="siswa"');
  if (existingStudents[0].count === 0) {
    console.log('Seeding initial sample students...');
    const sampleStudents = [
      { username: 'ahmad.fauzi', pass: 'TKJ#901', name: 'Ahmad Fauzi', nis: '20241001', class_name: 'XII TKJ 1' },
      { username: 'siti.nurhaliza', pass: 'TKJ#902', name: 'Siti Nurhaliza', nis: '20241002', class_name: 'XII TKJ 1' },
      { username: 'budi.santoso', pass: 'TKJ#903', name: 'Budi Santoso', nis: '20241003', class_name: 'XII TKJ 2' },
      { username: 'dewi.lestari', pass: 'TKJ#904', name: 'Dewi Lestari', nis: '20241004', class_name: 'XII TKJ 2' },
      { username: 'rizky.ramadhan', pass: 'TKJ#905', name: 'Rizky Ramadhan', nis: '20241005', class_name: 'XII TKJ 1' },
    ];

    for (const s of sampleStudents) {
      const [res] = await connection.execute(`
        INSERT INTO users (username, password, name, role, nis, class_name)
        VALUES (?, ?, ?, 'siswa', ?, ?)
      `, [s.username, s.pass, s.name, s.nis, s.class_name]);

      const studentId = res.insertId;
      // Auto enroll in cloud-computing
      await connection.execute(`
        INSERT INTO enrollments (user_id, course_slug, status)
        VALUES (?, 'cloud-computing', 'active')
      `, [studentId]);

      // Seed progress for Ahmad Fauzi (completed ptm 1)
      if (s.username === 'ahmad.fauzi') {
        await connection.execute(`
          INSERT INTO student_progress (user_id, meeting_id, current_step, max_step, is_completed, pretest_score, posttest_score, lab_score, final_score, certificate_id)
          VALUES (?, 'pertemuan-1', 4, 4, TRUE, 100, 100, 100, 100, 'CERT-CC1-AF01')
        `, [studentId]);
      }
    }
  }

  console.log('Database initialized successfully with default records!');
  await connection.end();
}

initDB().catch(err => {
  console.error('Database initialization failed:', err);
  process.exit(1);
});
