# Arsitektur Sistem Pendaftaran Pelatihan

## Ringkasan

Aplikasi ini adalah aplikasi web monolitik berbasis PHP. Halaman dan endpoint berada di `public/`, logika bersama dan akses data berada di `src/`, template HTML/PDF berada di `templates/`, dan data disimpan di MySQL/MariaDB. Pengguna mengakses aplikasi melalui browser di localhost yang dilayani Apache/PHP (misalnya XAMPP).

Saat ini alur aplikasi yang ada berpusat pada panel admin untuk melihat dan mengelola pendaftar. Formulir tambah pendaftar tersedia di panel tersebut; halaman publik mandiri untuk pendaftaran belum tampak pada struktur route saat ini.

## Diagram komponen

```text
┌─────────────────────┐
│ Browser             │
│ HTML, Bootstrap, JS │
└──────────┬──────────┘
           │ HTTP
           ▼
┌─────────────────────────────────────┐
│ Apache + PHP                        │
│ public/ (route/halaman aplikasi)    │
│                                     │
│ login.php  index.php  tambah.php    │
│ ubah.php   hapus.php   cetak.php    │
└──────────┬──────────────────────────┘
           │ memuat / memanggil
           ▼
┌─────────────────────────────────────┐
│ src/                                │
│ bootstrap, helper, auth, pendaftar  │
└──────────┬──────────────────────────┘
           │ PDO
           ▼
┌─────────────────────┐
│ MySQL / MariaDB     │
│ admin, kelas,       │
│ pendaftar           │
└─────────────────────┘

public/cetak.php ──► templates/bukti.php ──► Dompdf ──► PDF
public/*.php ──────► templates/header.php dan footer.php ──► HTML
```

## Lapisan aplikasi

### Antarmuka dan route: `public/`

Setiap file PHP yang dapat diminta browser bertindak sebagai route, mengolah request, lalu menampilkan template atau mengarahkan pengguna:

- `login.php` mengautentikasi admin.
- `index.php` menampilkan daftar pendaftar untuk admin yang sudah login.
- `tambah.php` dan `ubah.php` menangani formulir tambah dan edit.
- `hapus.php` menerima penghapusan melalui POST.
- `logout.php` mengakhiri sesi melalui POST.
- `cetak.php` mengambil satu pendaftar dan mengirim hasil PDF.
- `_form.php` adalah partial formulir yang digunakan halaman tambah dan ubah.
- `injeksi.php` dan `injeksi2.php` merupakan demonstrasi lokal perbandingan query SQL, bukan bagian alur produksi.
- `assets/js/app.js` mengatur notifikasi flash, konfirmasi penghapusan, dan DataTables di browser.

### Bootstrap dan logika bersama: `src/`

- `bootstrap.php` memulai sesi, membaca konfigurasi, memuat koneksi/helper/autentikasi/fungsi pendaftar, serta memasang penanganan exception.
- `helpers.php` menyediakan escaping HTML, redirect, token CSRF, pesan flash, dan pemeriksaan sesi admin.
- `auth.php` mencari akun, memverifikasi kata sandi, membuat sesi admin, mewajibkan autentikasi, dan logout.
- `pendaftar.php` menyediakan pengambilan kelas dan data pendaftar, validasi input, operasi tambah/ubah/hapus, pengambilan data bukti, dan pendaftaran dengan pemeriksaan kuota.

Route menggunakan fungsi di `src/` agar akses database dan aturan umum tidak perlu ditulis ulang di setiap halaman.

### Template: `templates/`

- `header.php` memulai markup halaman, navigasi, dan pesan flash.
- `footer.php` menutup markup dan memuat library UI serta `public/assets/js/app.js`.
- `bukti.php` merender data pendaftar ke HTML untuk dikonversi menjadi PDF.

### Akses database dan konfigurasi

- `config/config.php` menyimpan konfigurasi koneksi dan mode debug; `config/config.contoh.php` adalah contoh konfigurasi.
- `config/database.php` menyediakan `getConnection()` yang membuat satu koneksi PDO per request dan mengatur exception, hasil associative array, serta prepared statement native.
- `database/skema.sql` mendefinisikan database dan tabel inti.
- `database/buat-admin.php` adalah utilitas CLI terpisah untuk membuat akun admin. Ini bukan route browser.

## Model data

```text
kelas 1 ─────────── * pendaftar

admin (akun autentikasi, terpisah dari pendaftar)
```

- `kelas`: daftar kelas pelatihan dan kuotanya.
- `pendaftar`: data peserta, kelas yang dipilih, dan waktu pendaftaran. `kelas_id` merujuk ke `kelas.id`; email ditetapkan unik oleh skema.
- `admin`: kredensial untuk panel admin. Kata sandi disimpan dalam bentuk hash oleh skrip pembuat admin.

## Alur request penting

### Login admin

1. Browser meminta `public/login.php`.
2. Halaman memuat `src/bootstrap.php`, yang memulai sesi dan memuat helper serta autentikasi.
3. Saat form dikirim, token CSRF diperiksa, lalu `prosesLogin()` mencari admin dan memverifikasi hash kata sandi.
4. Jika berhasil, ID admin disimpan dalam sesi dan browser diarahkan ke `index.php`.

### Operasi data pendaftar

1. Route admin memeriksa autentikasi dan mengambil koneksi melalui `getConnection()`.
2. Input POST diperiksa token CSRF dan divalidasi di server.
3. Fungsi di `src/pendaftar.php` membaca atau memodifikasi database dengan PDO.
4. Tambah pendaftar memakai transaksi dan penguncian baris kelas ketika memeriksa kuota agar pendaftaran bersamaan tidak melewati kuota.
5. Setelah berhasil, route mengatur pesan flash dan mengarahkan browser ke daftar pendaftar.

### Cetak bukti

`public/cetak.php` mengambil data berdasarkan ID, membentuk nomor registrasi, merender `templates/bukti.php`, lalu Dompdf mengubah HTML menjadi PDF yang ditampilkan browser.

## Keamanan dan batas kepercayaan

- Browser dan seluruh input request dianggap tidak tepercaya; validasi penting dilakukan kembali di server.
- Output HTML menggunakan helper `e()` untuk escaping.
- Operasi perubahan data memakai token CSRF; tindakan penghapusan dan logout menggunakan POST.
- Query data aplikasi memakai prepared statement melalui PDO.
- Autentikasi admin menggunakan `password_verify()` dan memperbarui ID sesi setelah login berhasil.
- Konfigurasi dan kredensial database tidak seharusnya dipublikasikan.
- Halaman demonstrasi `public/injeksi.php` dan `public/injeksi2.php` memuat contoh konkatenasi query yang sengaja tidak aman. Nonaktifkan atau keluarkan dari deployment produksi.
- Bootstrap mencatat exception ke log dan mengembalikan respons 500 umum kepada browser.

## Teknologi dan dependensi

- PHP 8.1 atau lebih baru dan MySQL/MariaDB.
- PDO MySQL untuk akses database.
- Dompdf melalui Composer untuk pembuatan PDF.
- Bootstrap, jQuery, DataTables, dan SweetAlert2 dimuat dari CDN pada template.
- Apache/PHP lokal melalui XAMPP atau Laragon untuk penggunaan browser di localhost.

## Menjalankan secara lokal

1. Jalankan Apache dan MySQL.
2. Buat database dengan mengimpor `database/skema.sql`.
3. Sesuaikan `config/config.php` dengan koneksi database lokal.
4. Jalankan `composer install` untuk dependensi PHP.
5. Dari direktori proyek, buat admin melalui terminal: `php database/buat-admin.php <nama-pengguna> <kata-sandi>`. Nama pengguna harus 3–100 karakter yang diizinkan skrip; kata sandi minimal 8 karakter.
6. Buka `http://localhost/pendaftaran/public/` (sesuaikan `pendaftaran` dengan nama folder proyek di `htdocs`) dan masuk melalui halaman login.

## Catatan konsistensi skema admin

`database/skema.sql` dan `database/buat-admin.php` membuat definisi tabel `admin` yang berbeda. Skema SQL menetapkan `password` sebagai unik, sedangkan skrip CLI menetapkan `username` sebagai unik. Karena skrip hanya menjalankan `CREATE TABLE IF NOT EXISTS`, ia tidak mengubah tabel yang sudah dibuat oleh skema. Selaraskan constraint unik pada username di skema database agar perilaku akun sesuai dengan validasi username di skrip.