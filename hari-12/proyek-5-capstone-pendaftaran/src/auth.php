<?php

declare(strict_types=1);

/**
 * Deskripsi: Mencari admin berdasarkan nama pengguna.
 * @param PDO $pdo Koneksi basis data.
 * @param string $username Nama pengguna.
 * @return ?array Data admin atau null jika tidak ditemukan.
 * @throws PDOException Jika kueri gagal.
 */
function cariAdmin(PDO $pdo, string $username): ?array
{
  $stmt = $pdo->prepare('SELECT id, username, `password` FROM admin WHERE
username = :u');
  $stmt->execute(['u' => $username]);
  $baris = $stmt->fetch();
  return $baris === false ? null : $baris;
}

/**
 * Deskripsi: Memeriksa sandi dan memulai sesi admin.
 * @param PDO $pdo Koneksi basis data.
 * @param string $username Nama pengguna.
 * @param string $sandi Sandi yang dimasukkan.
 * @return bool True jika login berhasil.
 * @throws PDOException Jika pencarian admin gagal.
 */
function prosesLogin(PDO $pdo, string $username, string $sandi): bool
{
  $admin = cariAdmin($pdo, $username);
  if ($admin === null || !password_verify($sandi, $admin['password'])) {
    return false;
  }
  session_regenerate_id(true);
  $_SESSION['admin_id'] = (int) $admin['id'];
  return true;
}

/**
 * Deskripsi: Mengarahkan pengguna yang belum login.
 * Parameter: Tidak ada.
 * @return void Tidak mengembalikan nilai.
 * @throws Tidak ada.
 */
function wajibLogin(): void
{
  if (empty($_SESSION['admin_id'])) {
    redirect('login.php');
  }
}

/**
 * Deskripsi: Menghapus sesi admin.
 * Parameter: Tidak ada.
 * @return void Tidak mengembalikan nilai.
 * @throws Tidak ada.
 */
function logout(): void
{
  $_SESSION = [];
  if (ini_get('session.use_cookies')) {
    $p = session_get_cookie_params();
    setcookie(
      session_name(),
      '',
      time() - 42000,
      $p['path'],
      $p['domain'],
      $p['secure'],
      $p['httponly']
    );
  }
  session_destroy();
}
