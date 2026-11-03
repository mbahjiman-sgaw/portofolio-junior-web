<?php

declare(strict_types=1);
require_once __DIR__ . '/../src/bootstrap.php';

cekLoginAdmin();

$pesanError = '';
$daftarKelas = [];

try {
  $stmt = getConnection()->query(
    'SELECT id, nama_kelas, kuota FROM kelas ORDER BY nama_kelas'
  );
  $daftarKelas = $stmt->fetchAll();
} catch (PDOException $e) {
  error_log($e->getMessage());
  $pesanError = 'Data kelas belum dapat dimuat.';
}

$judul = 'Daftar Kelas';
require __DIR__ . '/../templates/header.php';
?>

<div class='d-flex justify-content-between align-items-center mb-4'>
  <div>
    <h1 class='h3 mb-1'>Daftar Kelas</h1>
    <p class='text-muted mb-0'>Kelas pelatihan dan kuota peserta.</p>
  </div>
</div>

<?php if ($pesanError !== ''): ?>
  <div class='alert alert-danger' role='alert'><?= e($pesanError) ?></div>
<?php elseif ($daftarKelas === []): ?>
  <div class='alert alert-info' role='status'>Belum ada kelas yang tersedia.</div>
<?php else: ?>
  <div class='table-responsive'>
    <table id='tabelKelas' class='table table-striped align-middle'>
      <thead>
        <tr>
          <th scope='col'>Nama Kelas</th>
          <th scope='col'>Kuota Peserta</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($daftarKelas as $kelas): ?>
          <tr>
            <td><?= e($kelas['nama_kelas']) ?></td>
            <td><?= (int) $kelas['kuota'] ?> peserta</td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  </div>
<?php endif; ?>

<?php require __DIR__ . '/../templates/footer.php'; ?>
