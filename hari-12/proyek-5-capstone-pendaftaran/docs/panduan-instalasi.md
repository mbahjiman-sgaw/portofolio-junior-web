## Instalasi

### Persiapan

Pastikan perangkat lunak berikut sudah tersedia:

- **XAMPP** untuk menyediakan Apache, PHP, dan MySQL/MariaDB.
- **Composer** untuk memasang dependensi PHP proyek.
- **PHP CLI** untuk menjalankan perintah PHP dari terminal. XAMPP biasanya sudah menyertakannya di folder `php`.
- **Browser modern** (misalnya Chrome, Firefox, atau Edge) untuk membuka aplikasi.
- **Editor teks atau kode** untuk menyesuaikan konfigurasi, misalnya Visual Studio Code. Editor bukan syarat untuk menjalankan aplikasi, tetapi diperlukan untuk mengubah berkas konfigurasi.

Apache, PHP, MySQL/MariaDB, dan dependensi PHP yang dipasang dengan Composer diperlukan agar aplikasi berjalan. Browser digunakan untuk mengaksesnya. Git bersifat opsional dan hanya diperlukan jika Anda ingin mengambil atau mengelola kode dari repositori.

Buka XAMPP Control Panel, lalu jalankan **Apache** dan **MySQL**. Pastikan keduanya menunjukkan status berjalan. Jika Apache atau MySQL gagal dijalankan, periksa apakah port yang diperlukan sedang digunakan oleh aplikasi lain.

Buka terminal baru dan periksa bahwa PHP dan Composer dapat dikenali:

```sh
php --version
composer --version
```

Jika perintah `php` tidak ditemukan, tambahkan folder PHP XAMPP (umumnya `C:\xampp\php`) ke `PATH`, atau jalankan PHP dengan lokasi lengkapnya, misalnya `C:\xampp\php\php.exe`. Tutup dan buka kembali terminal setelah mengubah `PATH`.

### Langkah instalasi

1. Salin folder proyek ke direktori web XAMPP dan ubah namanya menjadi `pendaftaran`. Pastikan struktur foldernya benar, termasuk folder `config`, `database`, dan `public`. Lokasi proyek menjadi `C:\xampp\htdocs\pendaftaran`.

2. Buat database. Buka `http://localhost/phpmyadmin` di browser dan pilih **New**. Masukkan nama database, misalnya `pendaftaran`, pilih kolasi yang sesuai (misalnya `utf8mb4_general_ci` jika tersedia), lalu klik **Create**. Catat nama database yang digunakan.

3. Impor skema ke database tersebut:
   - Pilih database yang baru dibuat di panel sebelah kiri phpMyAdmin.
   - Buka tab **Import**, lalu klik **Choose File**.
   - Pilih `database/skema.sql` dari folder proyek.
   - Klik **Import** atau **Go** dan tunggu sampai phpMyAdmin menyatakan impor berhasil.
   - Pastikan tabel-tabel aplikasi muncul di dalam database yang dipilih.

4. Siapkan konfigurasi aplikasi. Salin `config/config.contoh.php` dengan nama `config/config.php` (jangan menimpa berkas contoh). Buka `config/config.php` menggunakan editor teks dan sesuaikan nilai koneksi database dengan lingkungan lokal Anda. Nama database harus sama dengan yang dibuat pada langkah 2; pada instalasi XAMPP standar, pengguna MySQL biasanya `root` dan kata sandinya kosong, kecuali Anda telah mengubahnya. Jangan mengunggah berkas konfigurasi yang berisi kredensial ke repositori publik.

5. Pasang dependensi PHP. Buka terminal dan pindah ke direktori proyek:

   ```sh
   cd C:\xampp\htdocs\pendaftaran
   ```

   Lalu jalankan:

   ```sh
   composer install
   ```

   Tunggu hingga Composer selesai tanpa pesan galat. Perintah ini akan memasang dependensi yang dibutuhkan proyek.

6. Buat akun administrator dari terminal yang masih berada di direktori proyek. Ganti `SandiKuat123` dengan kata sandi unik yang kuat. Hindari memakai contoh kata sandi ini untuk penggunaan nyata dan simpan kata sandi dengan aman:

   ```sh
   php database/buat-admin.php admin SandiKuat123
   ```

   Jika pembuatan akun berhasil, gunakan nama pengguna `admin` dan kata sandi yang Anda tentukan untuk masuk.

7. Buka `http://localhost/pendaftaran/public/` di browser. Masuk menggunakan akun administrator yang dibuat pada langkah 6. Jika halaman tidak terbuka, pastikan Apache berjalan dan alamat URL serta lokasi folder proyek sudah benar.

### Fitur aplikasi

- **Cetak atau simpan sebagai PDF:** buka halaman yang ingin dicetak, gunakan fitur cetak browser (biasanya `Ctrl+P`), lalu pilih **Save as PDF** atau **Simpan sebagai PDF** sebagai tujuan. Tampilan hasil dapat berbeda menurut browser.
- **Batas peserta kelas:** kapasitas dapat ditetapkan untuk kelas. Setelah kapasitas tercapai, pendaftaran peserta baru untuk kelas tersebut tidak dapat dilanjutkan.

### Jika terjadi kendala

- Pastikan Apache dan MySQL sedang berjalan.
- Jika halaman menampilkan galat koneksi database, periksa nama database, pengguna, kata sandi, dan host di `config/config.php`. Pastikan database yang dikonfigurasi sama dengan database tempat `database/skema.sql` diimpor.
- Jika phpMyAdmin tidak dapat dibuka, periksa status Apache dan MySQL di XAMPP Control Panel. Jika salah satunya tidak dapat berjalan, pastikan portnya tidak digunakan layanan lain.
- Jika `composer` atau `php` tidak dikenali, periksa instalasi dan `PATH`, lalu buka terminal baru. Anda juga dapat menjalankan terminal dari XAMPP atau memakai lokasi lengkap `php.exe`.
- Jika Composer melaporkan ekstensi PHP yang belum tersedia, aktifkan ekstensi yang disebutkan pada `php.ini` yang digunakan PHP CLI, lalu jalankan kembali `composer install`.
- Jalankan perintah Composer dan PHP dari direktori proyek (`C:\xampp\htdocs\pendaftaran`) agar jalur berkas ditemukan dengan benar.
- Periksa pesan galat pada terminal dan log Apache/PHP di XAMPP untuk petunjuk lebih lanjut.
