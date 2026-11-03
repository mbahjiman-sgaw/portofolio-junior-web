# Dokumentasi Modul Autentikasi Admin

> **ID Modul:** `MOD-AUT-001`  
> **Versi:** 1.0.0 (Aktif)  
> **Penulis:** Dito  
> **Tanggal:** October 26

## 1. Ringkasan Modul

| Properti       | Detail                                                                                                              |
| -------------- | ------------------------------------------------------------------------------------------------------------------- |
| Lokasi berkas  | `src/auth.php`                                                                                                      |
| Kegunaan utama | Menyediakan fungsi autentikasi administrator berbasis sesi server dan verifikasi kata sandi aman (`password_hash`). |

## 2. Dependensi Berkas

Modul ini bergantung pada berkas berikut:

| Berkas                | Kegunaan                                          |
| --------------------- | ------------------------------------------------- |
| `config/database.php` | Menyediakan koneksi database melalui objek PDO.   |
| `src/helpers.php`     | Menyediakan fungsi pembantu seperti `redirect()`. |

## 3. Implementasi Kode Sumber

Berkas: `src/auth.php`

## 4. Fungsi Publik

| Fungsi                                                   | Deskripsi                                                                                                          |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `cariAdmin(PDO $pdo, string $username)`                  | Mengambil data administrator berdasarkan username menggunakan prepared statement untuk mencegah SQL injection.     |
| `prosesLogin(PDO $pdo, string $username, string $sandi)` | Memverifikasi akun dengan `password_verify()`. Jika valid, ID sesi diregenerasi dan `$_SESSION['admin_id']` diisi. |
| `wajibLogin()`                                           | Memeriksa `$_SESSION['admin_id']` dan mengalihkan pengguna ke `login.php` jika belum login.                        |
| `logout()`                                               | Mengosongkan data sesi, menghapus cookie sesi, dan menghancurkan sesi di server.                                   |

## 5. Catatan Keamanan

- **Session fixation:** `prosesLogin()` memanggil `session_regenerate_id(true)` setelah kredensial berhasil diverifikasi.
- **Pesan galat:** Gunakan pesan generik seperti “Username atau password salah” agar tidak membocorkan keberadaan username.
- **Proteksi logout:** Picu logout melalui metode POST yang dilengkapi token CSRF untuk mencegah Cross-Site Request Forgery.

## 6. Contoh Pemakaian

Untuk mengamankan halaman admin, panggil `wajibLogin()` di bagian paling atas berkas:

```php
<?php
require_once 'config/database.php';
require_once 'src/helpers.php';
require_once 'src/auth.php';

// Proteksi halaman admin
wajibLogin();

// Kode halaman admin selanjutnya di sini...
```

## 7. Riwayat Revisi

| Versi | Tanggal    | Penulis | Deskripsi perubahan                                                   |
| ----- | ---------- | ------- | --------------------------------------------------------------------- |
| 1.0.0 | October 26 | Dito    | Inisialisasi awal pembuatan dan implementasi modul autentikasi admin. |
