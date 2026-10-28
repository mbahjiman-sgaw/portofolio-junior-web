<?php
declare(strict_types=1);

require_once __DIR__ . '/functions.php';

$pesanStatus = '';
$pesanGalat = '';

// 1. OPSI EKSPOR CSV
if (isset($_GET['aksi']) && $_GET['aksi'] === 'ekspor') {
    eksporCsvTamu();
}

// 2. PROSES HAPUS PESAN
if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['aksi'] ?? '') === 'hapus') {
    $idHapus = (int) ($_POST['id'] ?? 0);
    if ($idHapus > 0) {
        if (hapusTamu($idHapus)) {
            $pesanStatus = "Pesan dengan ID #{$idHapus} berhasil dihapus.";
        } else {
            $pesanGalat = "Gagal menghapus pesan ID #{$idHapus}. Data tidak ditemukan.";
        }
    }
}

// 3. PENCARIAN & PAGINASI
$kata = trim((string) ($_GET['q'] ?? ''));
$daftarTamu = array_reverse(cariTamu(ambilSemuaTamu(), $kata));

$pesanPerHalaman = 5;
$totalPesan = count($daftarTamu);
$totalHalaman = (int) ceil($totalPesan / $pesanPerHalaman);

$halamanAktif = (int) ($_GET['hal'] ?? 1);
if ($halamanAktif < 1) $halamanAktif = 1;
if ($totalHalaman > 0 && $halamanAktif > $totalHalaman) $halamanAktif = $totalHalaman;

$awalData = ($halamanAktif - 1) * $pesanPerHalaman;
$tamuTampil = array_slice($daftarTamu, $awalData, $pesanPerHalaman);
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Admin - Kelola Buku Tamu</title>
  <style>
    body { font-family: sans-serif; line-height: 1.5; margin: 20px; }
    table { width: 100%; border-collapse: collapse; margin-top: 15px; }
    th, td { border: 1px solid #ccc; padding: 10px; text-align: left; vertical-align: top; }
    th { background-color: #f4f4f4; }
    .status { color: green; font-weight: bold; }
    .galat { color: red; font-weight: bold; }
    .aksi-bar { margin-bottom: 20px; display: flex; gap: 10px; align-items: center; }
    .btn-ekspor { background-color: #28a745; color: white; padding: 6px 12px; text-decoration: none; border-radius: 4px; }
    .btn-hapus { background-color: #dc3545; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 4px; }
  </style>
</head>
<body>
  <h1>Halaman Admin - Buku Tamu</h1>
  <p><a href="index.php">&laquo; Kembali ke Buku Tamu Utama</a></p>

  <?php if ($pesanStatus !== ''): ?>
    <p class="status"><?= e($pesanStatus) ?></p>
  <?php endif; ?>
  <?php if ($pesanGalat !== ''): ?>
    <p class="galat"><?= e($pesanGalat) ?></p>
  <?php endif; ?>

  <div class="aksi-bar">
    <!-- Form Pencarian -->
    <form method="get" action="admin.php">
      <input name="q" value="<?= e($kata) ?>" placeholder="Cari nama...">
      <button type="submit">Cari</button>
    </form>

    <!-- Tombol Ekspor CSV -->
    <a href="admin.php?aksi=ekspor" class="btn-ekspor">Unduh Data (CSV)</a>
  </div>

  <h2>Daftar Pesan Masuk (Total: <?= $totalPesan ?>)</h2>

  <?php if ($tamuTampil === []): ?>
    <p><em>Belum ada data pesan.</em></p>
  <?php else: ?>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Waktu</th>
          <th>Nama</th>
          <th>Email</th>
          <th>Pesan</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($tamuTampil as $tamu): ?>
          <tr>
            <td><?= e((string) ($tamu['id'] ?? '-')) ?></td>
            <td><small><?= e($tamu['waktu'] ?? '-') ?></small></td>
            <td><strong><?= e($tamu['nama']) ?></strong></td>
            <td><?= e($tamu['email']) ?></td>
            <td><?= nl2br(e($tamu['pesan'])) ?></td>
            <td>
              <!-- Form Hapus -->
              <form method="post" action="admin.php?q=<?= urlencode($kata) ?>&hal=<?= $halamanAktif ?>" onsubmit="return confirm('Apakah Anda yakin ingin menghapus pesan ini?');">
                <input type="hidden" name="aksi" value="hapus">
                <input type="hidden" name="id" value="<?= e((string) $tamu['id']) ?>">
                <button type="submit" class="btn-hapus">Hapus</button>
              </form>
            </td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>

    <!-- Navigasi Paginasi -->
    <?php if ($totalHalaman > 1): ?>
      <div style="margin-top: 20px;">
        Halaman: 
        <?php for ($i = 1; $i <= $totalHalaman; $i++): ?>
          <a href="admin.php?q=<?= urlencode($kata) ?>&hal=<?= $i ?>" 
             style="margin-right: 5px; <?= $i === $halamanAktif ? 'font-weight: bold; text-decoration: none;' : '' ?>">
            <?= $i ?>
          </a>
        <?php endfor; ?>
      </div>
    <?php endif; ?>
  <?php endif; ?>
</body>
</html>