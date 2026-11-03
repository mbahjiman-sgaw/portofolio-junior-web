# Peta Modul Proyek Pendaftaran

Dokumen ini mencatat seluruh file di folder `public/` dan `src/`, serta fungsi utama yang digunakan aplikasi. Pengguna menjalankan aplikasi melalui browser di localhost; pengelolaan admin dilakukan dari halaman browser setelah akun admin dibuat melalui terminal.

## Struktur `public/` dan `src/`

```text
public/
├── _form.php
├── ubah.php
├── tambah.php
├── logout.php
├── login.php
├── injeksi2.php
├── injeksi.php
├── index.php
├── ind.txt
├── hapus.php
├── cetak.php
└── assets/
    └── js/
        └── app.js

src/
├── pendaftar.php
├── helpers.php
├── bootstrap.php
└── auth.php
```

## File di `public/`

File PHP di folder ini menjadi halaman atau endpoint yang diakses melalui browser.

| File | Tanggung jawab |
|---|---|
| `public/index.php` | Halaman daftar pendaftar admin. Meminta autentikasi, mengambil data pendaftar, dan menampilkan tabel beserta tautan ubah, cetak, dan hapus. |
| `public/login.php` | Menampilkan formulir login admin, memeriksa token CSRF, memproses login, membatasi percobaan gagal dalam sesi, dan mengarahkan admin yang berhasil masuk ke daftar pendaftar. |
| `public/logout.php` | Menerima permintaan POST dengan token CSRF, mengakhiri sesi admin, lalu mengarahkan kembali ke halaman login. |
| `public/tambah.php` | Menampilkan formulir dan memproses penambahan pendaftar setelah pemeriksaan login admin, CSRF, dan validasi data. Pendaftaran disimpan dengan pemeriksaan kuota kelas. |
| `public/ubah.php` | Mengambil pendaftar berdasarkan ID, menampilkan formulir edit, memvalidasi perubahan, lalu menyimpan data. |
| `public/hapus.php` | Memproses penghapusan melalui POST setelah pemeriksaan login admin dan token CSRF. |
| `public/_form.php` | Potongan formulir bersama untuk tambah dan ubah pendaftar, mencakup nama, email, nomor HP, kelas, alamat, dan tampilan pesan validasi. |
| `public/cetak.php` | Mengambil data pendaftar berdasarkan ID, membentuk nomor registrasi, lalu membuat dan menampilkan bukti pendaftaran PDF menggunakan Dompdf. |
| `public/injeksi.php` | Halaman demonstrasi lokal yang membandingkan query SQL dengan konkatenasi dan prepared statement. Bagian query konkatenasi sengaja rentan; jangan gunakan atau publikasikan halaman ini di server produksi. |
| `public/injeksi2.php` | Halaman demonstrasi lokal lain yang membandingkan query SQL berbahaya dengan prepared statement. Batasi untuk lingkungan latihan lokal; jangan gunakan atau publikasikan di server produksi. |
| `public/ind.txt` | File berekstensi `.txt` yang berisi markup dan kode PHP halaman daftar pendaftar versi lama. Karena bukan file `.php`, server PHP umumnya menyajikannya sebagai teks dan tidak menjalankannya sebagai halaman aplikasi. |
| `public/assets/js/app.js` | Saat DOM siap, menampilkan notifikasi flash, meminta konfirmasi sebelum penghapusan, dan mengaktifkan DataTables untuk tabel pendaftar bila tersedia. |

## File di `src/`

File di folder ini menyediakan inisialisasi aplikasi, helper umum, autentikasi, serta akses dan validasi data pendaftar. Fungsi-fungsi berikut adalah fungsi utama yang didefinisikan di masing-masing file.

| File | Fungsi utama |
|---|---|
| `src/bootstrap.php` | Memulai sesi, memuat konfigurasi dan koneksi database, memuat helper, autentikasi, serta modul pendaftar, dan memasang penanganan exception untuk mencatat error serta mengirim respons HTTP 500. |
| `src/helpers.php` | `e()` mengamankan teks untuk keluaran HTML; `redirect()` mengarahkan browser; `tokenCsrf()` membuat atau mengambil token CSRF; `cekCsrf()` memvalidasi token permintaan; `setFlash()` dan `ambilFlash()` menyimpan dan mengambil pesan sementara; `isLoggedIn()` memeriksa sesi admin; `cekLoginAdmin()` meminta login sebelum halaman admin diakses. |
| `src/auth.php` | `cariAdmin()` mencari akun admin berdasarkan username; `prosesLogin()` memverifikasi kata sandi dan memulai sesi admin dengan ID sesi baru; `wajibLogin()` mewajibkan sesi admin; `logout()` menghapus data dan cookie sesi. |
| `src/pendaftar.php` | `daftarKelas()` mengambil pilihan kelas; `hitungPendaftar()` menghitung hasil pencarian nama; `ambilPendaftar()` mengambil daftar dengan pencarian dan paginasi; `ambilPendaftarById()` mengambil satu pendaftar berdasarkan ID; `emailSudahAda()` memeriksa duplikasi email; `validasiPendaftar()` menormalisasi dan memvalidasi input pendaftar; `tambahPendaftar()` menyimpan pendaftar; `ubahPendaftar()` memperbarui pendaftar; `hapusPendaftar()` menghapus pendaftar; `ambilSemuaPendaftar()` mengambil seluruh data untuk daftar admin; `ambilBuktiPendaftar()` mengambil data untuk bukti PDF; `daftarkanDenganKuota()` mendaftarkan pendaftar dalam transaksi sambil mengunci dan memeriksa kuota kelas. `KuotaPenuhException` menandai kondisi kuota penuh. |

Tidak ada fungsi PHP bernama yang didefinisikan di file halaman `public/`; file tersebut menjalankan alur halaman dengan memanggil fungsi dari `src/`. `public/assets/js/app.js` menjalankan interaksi browser melalui event listener.

## Alur aplikasi

1. Admin membuka aplikasi di browser pada localhost dan masuk melalui `public/login.php`.
2. Halaman admin memanggil `src/bootstrap.php` untuk menyiapkan sesi, koneksi database, helper, autentikasi, serta fungsi pendaftar.
3. Setelah login, `public/index.php` menampilkan data pendaftar. Admin dapat menambah, mengubah, menghapus, atau mencetak bukti pendaftaran dari halaman-halaman di `public/`.
4. Operasi data menggunakan fungsi di `src/pendaftar.php`; formulir yang dikirim diperiksa di server, dan permintaan yang mengubah data memakai token CSRF.

## Menjalankan aplikasi dan membuat admin

1. Jalankan Apache dan MySQL melalui XAMPP.
2. Siapkan database `db_pelatihan` menggunakan `database/skema.sql` dan pastikan konfigurasi koneksi sesuai dengan lingkungan lokal.
3. Buka aplikasi di browser, misalnya `http://localhost/proyek-5-capstone-pendaftaran/public/` jika folder proyek berada langsung di bawah `htdocs`.
4. Calon admin membuat akun dari terminal di direktori proyek dengan perintah `php database/buat-admin.php <nama-pengguna> <kata-sandi>`. Nama pengguna harus terdiri dari 3–100 karakter yang diizinkan skrip, dan kata sandi minimal 8 karakter. Skrip ini dijalankan melalui PHP CLI, bukan dibuka lewat browser.
5. Setelah akun dibuat, admin masuk melalui halaman login di aplikasi browser.

**Catatan:** `public/injeksi.php` dan `public/injeksi2.php` adalah materi demonstrasi yang memuat pola query tidak aman. Pertahankan hanya untuk latihan lokal dan jangan sediakan pada deployment produksi.
