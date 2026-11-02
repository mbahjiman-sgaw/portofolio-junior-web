<?php
declare(strict_types=1);

// bug-nilai.php (Starter Code dengan Komentar Bug)
// Tugas: Perbaiki bug pada kode ini berdasarkan petunjuk komentar!

$nilai = ['Sari' => 90, 'Budi' => '68', 'Citra' => 82, 'Dewi' => 70];

function hitungRataRata(array $daftar): float
{
    $total = 0;
    foreach ($daftar as $n) {
        var_dump($n);
        // BUG [B-02 - Runtime Error]:
        // Data 'Budi' bertipe string ('68'). Dalam mode strict_types=1,
        // penambahan implisit memicu TypeError/Warning.
        // PETUNJUK: Lakukan type casting (float)$n atau (int)$n.
        $total += (int)$n;
    }
    // BUG [B-03 - Logic Error]:
    // Pembagi menggunakan count($daftar) - 1, sehingga hasil rata-rata menjadi terlalu tinggi.
    // PETUNJUK: Ganti pembagi menjadi count($daftar) dan pastikan array tidak kosong.
     $hasil = $total / (count($daftar) - 1);
    return $hasil;
}

function hitungLulus(array $daftar): int
{
    $lulus = 0;
    foreach ($daftar as $nama => $n) {
        // BUG [B-04 - Logic Error]:
        // Syarat lulus adalah minimal 70 (>= 70). Menggunakan '>' menyebabkan Dewi (nilai 70) tidak lulus.
        // PETUNJUK: Ubah operator '>' menjadi '>='.
        if ($n >= 70) {
            $lulus++;
        }
    }
    // BUG [B-01 - Syntax Error]:
    // Titik koma (;) hilang di akhir statement return.
    // PETUNJUK: Tambahkan titik koma ';' di akhir statement return.
    return $lulus;
}

header('X-Debug: selesai');
echo 'Rata-rata: ' . hitungRataRata($nilai) . '<br>';
echo 'Lulus: ' . hitungLulus($nilai) . '<br>';

// BUG [B-05 - Runtime Warning]:
// Key 'Eko' tidak ada dalam array $nilai, menyebabkan 'Undefined array key "Eko"'.
// PETUNJUK: Gunakan Null Coalescing Operator ($nilai['Eko'] ?? 'Tidak ada') atau isset().
echo 'Nilai Eko: ' . ($nilai['Eko'] ?? 'Tidak ada') . '<br>';

// BUG [B-06 - Runtime Warning]:
// Pemanggilan header() dilakukan setelah keluaran HTTP (echo) dikirim ke browser.
// Memicu error 'Cannot modify header information - headers already sent'.
// PETUNJUK: Pindahkan header() ke baris paling atas sebelum output HTML/echo.
