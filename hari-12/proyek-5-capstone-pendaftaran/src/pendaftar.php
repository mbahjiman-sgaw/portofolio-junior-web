<?php

declare(strict_types=1);
function daftarKelas(PDO $pdo): array
{
  return $pdo->query('SELECT id, nama_kelas FROM kelas ORDER BY
nama_kelas')->fetchAll();
}
function hitungPendaftar(PDO $pdo, string $kata): int
{
  $stmt = $pdo->prepare('SELECT COUNT(*) FROM pendaftar WHERE nama LIKE :kata');
  $stmt->execute(['kata' => '%' . $kata . '%']);
  return (int) $stmt->fetchColumn();
}
function ambilPendaftar(PDO $pdo, string $kata, int $batas, int $offset): array
{
  $sql = 'SELECT p.id, p.nama, p.email, p.no_hp, k.nama_kelas FROM pendaftar p JOIN kelas k ON k.id = p.kelas_id
WHERE p.nama LIKE :kata
ORDER BY p.id DESC LIMIT :batas OFFSET :offset';
  $stmt = $pdo->prepare($sql);
  $stmt->bindValue(':kata', '%' . $kata . '%');
  $stmt->bindValue(':batas', $batas, PDO::PARAM_INT);
  $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
  $stmt->execute();
  return $stmt->fetchAll();
}
function ambilPendaftarById(PDO $pdo, int $id): ?array
{
  $stmt = $pdo->prepare('SELECT * FROM pendaftar WHERE id = :id');
  $stmt->execute(['id' => $id]);
  $baris = $stmt->fetch();
  return $baris === false ? null : $baris;
}
/**
 * Checks if an email is already registered in the system.
 *
 * @param PDO $pdo PDO database connection.
 * @param string $email Email address to check.
 * @param int|null $kecualiId Applicant ID to exclude (useful during update).
 * @return bool True if email exists, false otherwise.
 * @throws PDOException If query execution fails.
 */
function emailSudahAda(PDO $pdo, string $email, ?int $kecualiId): bool
{
  $stmt = $pdo->prepare('SELECT COUNT(*) FROM pendaftar WHERE email = :email AND id
<> :id');
  $stmt->execute(['email' => $email, 'id' => $kecualiId ?? 0]);
  return (int) $stmt->fetchColumn() > 0;
}

function validasiPendaftar(array $input, PDO $pdo, ?int $idUbah): array
{
  // Rapikan data yang dikirim dari formulir.
  $data = [
    'nama' => trim((string) ($input['nama'] ?? '')), // trim() menghapus spasi di awal dan akhir nama.
    'email' => strtolower(trim((string) ($input['email'] ?? ''))), // trim() merapikan email dan strtolower() menyeragamkan hurufnya.
    'no_hp' => trim((string) ($input['no_hp'] ?? '')), // trim() menghapus spasi pada nomor HP.
    'alamat' => trim((string) ($input['alamat'] ?? '')), // trim() menghapus spasi pada alamat.
    'kelas_id' => (int) ($input['kelas_id'] ?? 0), // Ubah ID kelas menjadi bilangan bulat; gunakan 0 jika tidak dikirim.
  ];
  $galat = [];
  // Pastikan nama memiliki minimal 3 karakter.
  if (mb_strlen($data['nama']) < 3) { // mb_strlen() menghitung karakter Unicode pada nama.
    $galat['nama'] = 'Nama minimal 3 karakter.';
  }
  // Periksa format dan keunikan email.
  if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) { // filter_var() memeriksa apakah format email valid.
    $galat['email'] = 'Format email tidak valid.';
  } elseif (emailSudahAda($pdo, $data['email'], $idUbah)) { // emailSudahAda() mengecek duplikasi, kecuali ID yang sedang diubah.
    $galat['email'] = 'Email sudah terdaftar.';
  }
  // Nomor HP harus diawali 08 dan memiliki 10-13 digit.
  if (!preg_match('/^08[0-9]{8,11}$/', $data['no_hp'])) { // preg_match() mencocokkan nomor dengan pola yang diwajibkan.
    $galat['no_hp'] = 'Nomor HP diawali 08 dan 10-13 digit.';
  }
  // Pastikan kelas yang dipilih tersedia.
  if (!in_array($data['kelas_id'], array_column(daftarKelas($pdo), 'id'), true)) { // daftarKelas() mengambil kelas, array_column() mengumpulkan ID, dan in_array() memeriksa pilihan.
    $galat['kelas_id'] = 'Pilih kelas yang tersedia.';
  }
  return ['data' => $data, 'galat' => $galat];
}

/**
 * Inserts a new applicant record into the database.
 *
 * @param PDO $pdo PDO database connection.
 * @param array $d Applicant data array.
 * @return bool True on success, false on failure.
 * @throws PDOException If execution fails.
 */

function tambahPendaftar(PDO $pdo, array $d): bool
{
  $sql = 'INSERT INTO pendaftar (nama, email, no_hp, alamat, kelas_id)
VALUES (:nama, :email, :no_hp, :alamat, :kelas_id)';
  return $pdo->prepare($sql)->execute($d);
}

function ubahPendaftar(PDO $pdo, int $id, array $d): bool
{
  $sql = 'UPDATE pendaftar SET nama = :nama, email = :email, no_hp = :no_hp,
alamat = :alamat, kelas_id = :kelas_id WHERE id = :id';
  return $pdo->prepare($sql)->execute($d + ['id' => $id]);
}
function hapusPendaftar(PDO $pdo, int $id): bool
{
  return $pdo->prepare('DELETE FROM pendaftar WHERE id = :id')->execute(['id' =>
  $id]);
}
function ambilSemuaPendaftar(PDO $pdo): array
{
  $sql = 'SELECT p.id, p.nama, p.email, p.no_hp, p.tgl_daftar, k.nama_kelas
FROM pendaftar p JOIN kelas k ON k.id = p.kelas_id
ORDER BY p.id DESC';
  return $pdo->query($sql)->fetchAll();
}

function ambilBuktiPendaftar(PDO $pdo, int $id): ?array
{
  $sql = 'SELECT p.id, p.nama, p.email, p.no_hp, p.tgl_daftar, k.nama_kelas
FROM pendaftar p JOIN kelas k ON k.id = p.kelas_id
WHERE p.id = :id';
  $stmt = $pdo->prepare($sql);
  $stmt->execute(['id' => $id]);
  $baris = $stmt->fetch();
  return $baris === false ? null : $baris;
}

final class KuotaPenuhException extends RuntimeException {}

/**
 * Registers a applicant after verifying class quota availability.
 *
 * @param PDO   $pdo  PDO database connection instance.
 * @param array $data Registration payload containing applicant info and kelas_id.
 *
 * @return void
 *
 * @throws KuotaPenuhException If the target class has reached maximum quota capacity.
 * @throws Throwable           If database operations fail during transaction execution.
 */

// Daftarkan peserta dalam transaksi agar pemeriksaan dan pengurangan kuota aman.
function daftarkanDenganKuota(PDO $pdo, array $data): void
{
  $pdo->beginTransaction(); // PDO memulai transaksi.
  try {
    // Kunci baris kelas agar pendaftaran lain tidak memeriksa kuota bersamaan.
    $stmt = $pdo->prepare('SELECT kuota FROM kelas WHERE id = :id FOR UPDATE'); // PDO menyiapkan query kuota.
    $stmt->execute(['id' => $data['kelas_id']]); // PDO menjalankan query untuk kelas yang dipilih.
    $kuota = (int) $stmt->fetchColumn(); // PDOStatement mengambil nilai kuota.
    // Hitung jumlah peserta yang sudah terdaftar di kelas ini.
    $stmt = $pdo->prepare('SELECT COUNT(*) FROM pendaftar WHERE kelas_id = :id'); // PDO menyiapkan query jumlah pendaftar.
    $stmt->execute(['id' => $data['kelas_id']]); // PDO menjalankan query untuk kelas yang dipilih.
    if ((int) $stmt->fetchColumn() >= $kuota) {
      // Hentikan proses jika jumlah peserta sudah mencapai kuota.
      throw new KuotaPenuhException('Kuota kelas sudah penuh, daftar di kelas lain.');
    }
    tambahPendaftar($pdo, $data); // Panggil tambahPendaftar() untuk menyimpan peserta baru.
    $pdo->commit(); // PDO mengesahkan transaksi dan menyimpan perubahan.
  } catch (Throwable $e) {
    if ($pdo->inTransaction()) { // PDO memeriksa apakah transaksi masih berjalan.
      $pdo->rollBack(); // PDO membatalkan perubahan jika terjadi kesalahan.
    }
    throw $e; // Teruskan kembali kesalahan agar dapat ditangani pemanggil fungsi.
  }
}
