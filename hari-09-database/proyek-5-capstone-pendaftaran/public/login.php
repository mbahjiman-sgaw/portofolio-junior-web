<?php

declare(strict_types=1);

require_once __DIR__ . '/../src/bootstrap.php';

if (isLoggedIn()) {
  redirect('index.php');
}

$username = '';
$galat = '';
$mode = (string) ($_POST['mode'] ?? 'login');
$berhasil = '';

/*
 * Implementasi lama dipertahankan sebagai komentar agar mudah dikembalikan:
 *
 * $adminUser = 'admin';
 * $adminPassHash = password_hash('password123', PASSWORD_DEFAULT);
 * if ($username === $adminUser && password_verify($password, $adminPassHash)) {
 *   session_regenerate_id(true);
 *   $_SESSION['admin_logged_in'] = true;
 *   $_SESSION['admin_user'] = $username;
 *   setFlash('Berhasil login sebagai admin.');
 *   redirect('index.php');
 * }
 */

// Koneksi khusus untuk database admin. Konfigurasikan melalui environment
// ADMIN_DB_HOST, ADMIN_DB_NAME, ADMIN_DB_USER, dan ADMIN_DB_PASS bila perlu.
try {
  $adminDbHost = getenv('ADMIN_DB_HOST') ?: '127.0.0.1';
  $adminDbName = getenv('ADMIN_DB_NAME') ?: 'db_pelatihan';
  $adminDbUser = getenv('ADMIN_DB_USER') ?: 'root';
  $adminDbPass = getenv('ADMIN_DB_PASS') ?: '';
  $adminPdo = new PDO(
    "mysql:host={$adminDbHost};dbname={$adminDbName};charset=utf8mb4",
    $adminDbUser,
    $adminDbPass,
    [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
      PDO::ATTR_EMULATE_PREPARES => false,
    ]
  );

  // Tabel akun admin dibuat pada database admin jika belum tersedia.
  $adminPdo->exec(
    'CREATE TABLE IF NOT EXISTS admin_users (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(100) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4'
  );
} catch (PDOException $exception) {
  error_log('Admin database connection failed: ' . $exception->getMessage());
  $adminPdo = null;
  $galat = 'Database admin tidak dapat diakses. Periksa konfigurasi database.';
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $adminPdo instanceof PDO) {
  cekCsrf();
  $username = trim((string) ($_POST['username'] ?? ''));
  $password = (string) ($_POST['password'] ?? '');

  if (!in_array($mode, ['login', 'signup'], true)) {
    $mode = 'login';
  }

  if ($username === '' || strlen($username) > 100 || strlen($password) < 8) {
    $galat = 'Masukkan username (maksimal 100 karakter) dan password minimal 8 karakter.';
  } elseif ($mode === 'signup') {
    try {
      $statement = $adminPdo->prepare(
        'INSERT INTO admin_users (username, password_hash) VALUES (:username, :password_hash)'
      );
      $statement->execute([
        ':username' => $username,
        ':password_hash' => password_hash($password, PASSWORD_DEFAULT),
      ]);
      $berhasil = 'Akun admin berhasil dibuat. Silakan login.';
      $mode = 'login';
    } catch (PDOException $exception) {
      if ($exception->getCode() === '23000') {
        $galat = 'Username tersebut sudah digunakan.';
      } else {
        error_log('Admin signup failed: ' . $exception->getMessage());
        $galat = 'Pendaftaran admin gagal. Silakan coba lagi.';
      }
    }
  } else {
    $statement = $adminPdo->prepare(
      'SELECT id, username, password_hash FROM admin_users WHERE username = :username LIMIT 1'
    );
    $statement->execute([':username' => $username]);
    $admin = $statement->fetch();

    if ($admin && password_verify($password, $admin['password_hash'])) {
      session_regenerate_id(true);
      $_SESSION['admin_logged_in'] = true;
      $_SESSION['admin_user'] = $admin['username'];
      setFlash('Berhasil login sebagai admin.');
      redirect('index.php');
    }

    $galat = 'Username atau password salah.';
  }
}

$judul = 'Login Admin';
require __DIR__ . '/../templates/header.php';
?>

<h2>Login Admin</h2>

<?php if ($galat !== ''): ?>
  <p style="color: red; font-weight: bold;"><?= e($galat) ?></p>
<?php endif; ?>
<?php if ($berhasil !== ''): ?>
  <p style="color: green; font-weight: bold;"><?= e($berhasil) ?></p>
<?php endif; ?>

<form method="post">
  <input type="hidden" name="csrf" value="<?= e(tokenCsrf()) ?>">
  <p>
    <label for="mode">Aksi</label><br>
    <select id="mode" name="mode">
      <option value="login" <?= $mode === 'login' ? 'selected' : '' ?>>Login</option>
      <option value="signup" <?= $mode === 'signup' ? 'selected' : '' ?>>Daftar sebagai admin</option>
    </select>
  </p>
  <p>
    <label for="username">Username</label><br>
    <input id="username" name="username" value="<?= e($username) ?>" required autofocus>
  </p>
  <p>
    <label for="password">Password</label><br>
    <input id="password" name="password" type="password" required>
  </p>
  <button type="submit">Login</button>
  <a href="index.php">Batal</a>
</form>

<!-- Kredensial default admin lama (admin/password123) telah dinonaktifkan. -->

<?php require __DIR__ . '/../templates/footer.php'; ?>

