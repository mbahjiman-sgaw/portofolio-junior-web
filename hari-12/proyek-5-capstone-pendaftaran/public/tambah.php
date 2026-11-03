<?php

declare(strict_types=1);
require_once __DIR__ . '/../src/bootstrap.php'; // Memuat konfigurasi aplikasi, helper, dan fungsi-fungsi inti.
cekLoginAdmin(); // Memastikan admin sudah login sebelum mengakses halaman ini.
$pdo = getConnection(); // Mengambil koneksi database PDO agar bisa berinteraksi dengan database.
$kelas = daftarKelas($pdo); // Mengambil daftar kelas dari database untuk ditampilkan di form.

// Simpan data lama supaya form tetap terisi.
$lama = ['nama' => '', 'email' => '', 'no_hp' => '', 'alamat' => '', 'kelas_id' =>
0];

// Variabel untuk menampung error validasi.
$galat = [];

// Jika user mengirim form, proses data yang dikirim.
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Cek CSRF dulu agar form aman.
  cekCsrf(); // Memastikan request berasal dari form yang valid dan mencegah serangan CSRF.

  // Validasi input pendaftar.
  $hasil = validasiPendaftar($_POST, $pdo, null); // Memvalidasi data form dan mengembalikan data yang sudah dibersihkan serta error jika ada.
  $lama = $hasil['data'];
  $galat = $hasil['galat'];

  // Kalau tidak ada error, simpan pendaftar.
  if ($galat === []) {
    try {
      // Simpan pendaftar dengan pengecekan kuota.
      daftarkanDenganKuota($pdo, $lama); // Menyimpan data pendaftar dan mengecek apakah kuota kelas masih tersedia.
      setFlash('Pendaftar berhasil ditambahkan.'); // Menyimpan pesan sukses agar ditampilkan setelah redirect.
      redirect('index.php'); // Mengarahkan ke halaman daftar pendaftar.
    } catch (KuotaPenuhException $exception) {
      // Tampilkan error kalau kelas sudah penuh.
      $galat['kelas_id'] = $exception->getMessage(); // Menyimpan pesan error kuota penuh ke field kelas_id untuk ditampilkan di form.
    }
  }
}
$judul = 'Tambah Pendaftar';
require __DIR__ . '/../templates/header.php'; // Memuat template header halaman.
require __DIR__ . '/_form.php'; // Memuat form pendaftaran untuk menambah data.
require __DIR__ . '/../templates/footer.php'; // Memuat template footer halaman.
