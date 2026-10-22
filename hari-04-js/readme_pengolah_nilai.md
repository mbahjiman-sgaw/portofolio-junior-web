# Aplikasi Pengolah Nilai Siswa

Aplikasi konsol berbasis **Node.js** yang dirancang untuk mengelola dan menganalisis data nilai siswa secara interaktif melalui antarmuka *command-line* (CLI).

---

## 📌 Fitur Utama

1. **Input Data Siswa & Nilai**: Menambahkan nama siswa beserta nilainya (rentang 0–100).
2. **Statistik Nilai**: Menghitung dan menampilkan:
   - Nilai Rata-rata
   - Nilai Tertinggi (Max)
   - Nilai Terendah (Min)
3. **Predikat & Status Kelulusan**: Menampilkan daftar siswa beserta Grade dan Status Kelulusannya berdasarkan standar kriteria berikut:
   - **Kriteria Grade:**
     - `A` : Nilai $\ge 85$
     - `B` : $70 \le \text{Nilai} < 85$
     - `C` : $55 \le \text{Nilai} < 70$
     - `D` : Nilai $< 55$
   - **Status Kelulusan:**
     - **Lulus** jika Nilai $\ge 70$
     - **Tidak Lulus** jika Nilai $< 70$

---

## 🛠️ Prasyarat System

- [Node.js](https://nodejs.org/) (versi 14.0 atau yang lebih baru, karena menggunakan modul `readline/promises`).

---

## 🚀 Cara Menjalankan Program

1. **Unduh/Simpan Berkas**  
   Pastikan kode program disimpan dengan nama `pengolah nilai.js`.

2. **Buka Terminal / Command Prompt**  
   Arahkan direktori terminal ke lokasi berkas disimpan.

3. **Jalankan Program**  
   Ketik perintah berikut pada terminal:
   ```bash
   node "pengolah nilai.js"
   ```

---

## 📋 Contoh Penggunaan

Saat program dijalankan, menu utama akan muncul seperti berikut:

```text
===== PENGOLAH NILAI =====
1. Input nilai siswa
2. Tampilkan statistik
3. Tampilkan predikat per siswa
4. Keluar
Pilih menu (1-4): 
```

### Langkah Singkat:
1. Pilih menu `1` untuk memasukkan nama dan nilai siswa.
2. Pilih menu `2` untuk melihat ringkasan statistik (rata-rata, max, min).
3. Pilih menu `3` untuk melihat daftar siswa, grade, serta status kelulusan.
4. Pilih menu `4` untuk keluar dari program.