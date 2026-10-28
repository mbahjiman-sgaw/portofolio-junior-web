<?php

declare(strict_types=1);

require_once __DIR__ . '/functions.php';

$galat = [];
$lama = ['nama' => '', 'email' => '', 'pesan' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $ipPengunjung = $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN';

    // 1. Cek pembatasan waktu per IP
    if (!bolehKirimPesan($ipPengunjung)) {
        $galat['umum'] = 'Mohon tunggu 30 detik sebelum mengirim pesan kembali.';
    } else {
        // 2. Jika lolos pengecekan IP, jalankan validasi input
        $hasil = validasiTamu($_POST);
        $lama = $hasil['data'];
        $galat = $hasil['galat'];

        if ($galat === []) {
            if (simpanTamu($hasil['data'])) {
                // 3. Catat timestamp IP saat pesan berhasil disimpan
                catatWaktuIp($ipPengunjung);

                header('Location: index.php?status=sukses');
                exit;
            }
            $galat['umum'] = 'Gagal menyimpan data. Silakan coba lagi.';
        }
    }
}

$kata = trim((string) ($_GET['q'] ?? ''));
$daftarTamu = array_reverse(cariTamu(ambilSemuaTamu(), $kata));

// --- LOGIKA PAGINASI ---
$pesanPerHalaman = 5;
$totalPesan = count($daftarTamu);
$totalHalaman = (int) ceil($totalPesan / $pesanPerHalaman);

// Mengambil halaman aktif dari URL (default 1)
$halamanAktif = (int) ($_GET['hal'] ?? 1);
if ($halamanAktif < 1) $halamanAktif = 1;
if ($totalHalaman > 0 && $halamanAktif > $totalHalaman) $halamanAktif = $totalHalaman;

// Menentukan indeks awal potongan array
$awalData = ($halamanAktif - 1) * $pesanPerHalaman;

// Memotong array menggunakan array_slice
$tamuTampil = array_slice($daftarTamu, $awalData, $pesanPerHalaman);
// -----------------------
?>
<!DOCTYPE html>
<html lang='id'>

<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <title>Buku Tamu</title>
</head>

<body>
    <h1>Buku Tamu</h1>

    <?php if (($_GET['status'] ?? '') === 'sukses'): ?>
        <p role='status'>Terima kasih, pesan Anda sudah tersimpan.</p>
    <?php endif; ?>
    <?php if (isset($galat['umum'])): ?>
        <p role='alert'><?= e($galat['umum']) ?></p>
    <?php endif; ?>

    <form method='post' action='index.php'>
        <p>
            <label for='nama'>Nama</label><br>
            <input id='nama' name='nama' value='<?= e($lama['nama']) ?>'>
            <?php if (isset($galat['nama'])): ?><span><?= e($galat['nama']) ?></span><?php endif; ?>
        </p>
        <p>
            <label for='email'>Email</label><br>
            <input id='email' name='email' type='email' value='<?= e($lama['email']) ?>'>
            <?php if (isset($galat['email'])): ?><span><?= e($galat['email']) ?></span><?php endif; ?>
        </p>
        <p>
            <label for='pesan'>Pesan</label><br>
            <textarea id='pesan' name='pesan' rows='4'><?= e($lama['pesan']) ?></textarea>
            <?php if (isset($galat['pesan'])): ?><span><?= e($galat['pesan']) ?></span><?php endif; ?>
        </p>
        <button type='submit'>Kirim</button>
    </form>

    <h2>Daftar Tamu</h2>
    <form method='get' action='index.php'>
        <label for='q'>Cari nama</label>
        <input id='q' name='q' value='<?= e($kata) ?>'>
        <button type='submit'>Cari</button>
    </form>

    <?php if ($tamuTampil === []): ?>
        <p>Belum ada data.</p>
    <?php else: ?>
        <!-- Ganti variabel looping dengan $tamuTampil -->
        <?php foreach ($tamuTampil as $tamu): ?>
            <article>
                <h3><?= e($tamu['nama']) ?></h3>
                <p><small><?= e($tamu['waktu']) ?></small></p>
                <p><?= nl2br(e($tamu['pesan'])) ?></p>
            </article>
        <?php endforeach; ?>

        <!-- TAUTAN PAGINASI -->
        <?php if ($totalHalaman > 1): ?>
            <div style="margin-top: 20px;">
                Halaman:
                <?php for ($i = 1; $i <= $totalHalaman; $i++): ?>
                    <a href="index.php?q=<?= urlencode($kata) ?>&hal=<?= $i ?>"
                        style="margin-right: 5px; <?= $i === $halamanAktif ? 'font-weight: bold; text-decoration: none;' : '' ?>">
                        <?= $i ?>
                    </a>
                <?php endfor; ?>
            </div>
        <?php endif; ?>
    <?php endif; ?>
</body>

</html>