# Daftar Library dan Dependensi Project

Dokumen ini berisi daftar library, framework, dan dependensi yang digunakan dalam proyek **`proyek-5-capstone-pendaftaran`**.

---

## 1. Environment & Runtime

- **PHP** (v7.4+ / v8.x): Bahasa pemrograman utama server-side.
- **MySQL / MariaDB**: Database Management System (DBMS) relasional.

---

## 2. Server & Driver

- **PDO (PHP Data Objects)**: Extension PHP untuk komunikasi dan query database MySQL secara aman (`config/database.php`).
- **PHP Native Sessions**: Modul bawaan PHP untuk penanganan otentikasi/login pengguna (`public/login.php`, `public/logout.php`).

---

## 3. Library / Module Internal

Proyek ini menggunakan struktur helper dan modul internal tanpa dependensi external composer heavy:

| File / Module         | Fungsi & Deskripsi                                                        |
| :-------------------- | :------------------------------------------------------------------------ |
| `src/bootstrap.php`   | Inisialisasi awal aplikasi, pemuatan konfigurasi, dan penanganan session. |
| `src/helpers.php`     | Fungsi-fungsi bantuan (formatting, sanitasi input, redirect).             |
| `src/pendaftar.php`   | Logika bisnis dan fungsi CRUD data pendaftaran.                           |
| `config/config.php`   | Konfigurasi global aplikasi.                                              |
| `config/database.php` | Konfigurasi dan handler koneksi database.                                 |

---

## 4. Frontend & Layout

- **HTML5 & CSS Native**: Digunakan pada komponen template (`templates/header.php`, `templates/footer.php`, `public/_form.php`).
- **Native JavaScript**: Digunakan untuk validasi sisi klien dan interaksi antarmuka dasar.

---

## 5. Ringkasan Arsitektur

Proyek ini dikembangkan menggunakan **Native PHP Architecture** (tanpa framework besar seperti Laravel/CodeIgniter) untuk menjaga efisiensi, performa tinggi, dan ketergantungan minimal terhadap pihak ketiga.
