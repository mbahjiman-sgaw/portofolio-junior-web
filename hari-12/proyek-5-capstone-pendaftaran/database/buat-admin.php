<?php

declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
  exit('Hanya dapat dijalankan dari terminal.' . PHP_EOL);
}

$username = $argv[1] ?? '';
$sandi = $argv[2] ?? '';

if (strlen($username) < 3 || strlen($username) > 100 || strlen($sandi) < 8) {
  exit('Gunakan: php buat-admin.php <username 3-100 karakter> <sandi minimal 8 karakter>' . PHP_EOL);
}

// Validasi tambahan: pastikan username hanya berisi huruf, angka, underscore, atau tanda hubung
if (!preg_match('/^[a-zA-Z0-9_.-]+$/', $username)) {
  exit('Error: Username hanya boleh berisi huruf, angka, underscore (_), titik (.), dan tanda hubung (-).' . PHP_EOL);
}

try {
  $host = getenv('ADMIN_DB_HOST') ?: '127.0.0.1';
  $database = getenv('ADMIN_DB_NAME') ?: 'db_pelatihan';
  $user = getenv('ADMIN_DB_USER') ?: 'root';
  $password = getenv('ADMIN_DB_PASS') ?: '';
  $pdo = new PDO(
    "mysql:host={$host};dbname={$database};charset=utf8mb4",
    $user,
    $password,
    [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
      PDO::ATTR_EMULATE_PREPARES => false,
    ]
  );
  $pdo->exec(
    'CREATE TABLE IF NOT EXISTS admin (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(100) NOT NULL UNIQUE,
      `password` VARCHAR(255) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4'
  );

  $stmt = $pdo->prepare('INSERT INTO admin (username, `password`) VALUES (:u, :p)');
  $stmt->execute([
    'u' => $username, 
    'p' => password_hash($sandi, PASSWORD_DEFAULT)
  ]);
  
  echo 'Admin berhasil dibuat.' . PHP_EOL;
} catch (PDOException $e) {
  // Menangani error database (misalnya username sudah terdaftar/duplicate entry)
  if ($e->getCode() === '23000') {
    exit('Error: Username "' . $username . '" sudah terdaftar.' . PHP_EOL);
  }
  
  exit('Terjadi kesalahan database: ' . $e->getMessage() . PHP_EOL);
}