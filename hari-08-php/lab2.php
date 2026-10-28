<?php

declare(strict_types=1);
$peserta = [
  ['nama' => 'Sari', 'kelas' => 'Web', 'nilai' => 90],
  ['nama' => 'Budi', 'kelas' => 'Web', 'nilai' => 68],
  ['nama' => 'Citra', 'kelas' => 'Data', 'nilai' => 82],
];

function hitungRataRata(array $daftar): float
{
  $total = array_sum(array_column($daftar, 'nilai'));
  return $total / count($daftar);
}

$rataRata = hitungRataRata($peserta);

function cariTertinggi(array $daftar): ?array
{
  $nilaiTertinggi = max(array_column($daftar, 'nilai'));
    return array_filter($daftar, fn($peserta) => $peserta['nilai'] === $nilaiTertinggi);
}

function filterLulus(array $peserta, int $batas = 70): array
{
  return array_filter($peserta, fn($peserta) => $peserta['nilai'] >= $batas);
}

function urutkanNilai(array $peserta): array
{
  usort($peserta, fn($a, $b) => $b['nilai'] <=> $a['nilai']);
  return $peserta;
} 

$urutan = urutkanNilai($peserta);

function kelompokkanPerKelas(array $peserta): array
{
  $kelompok = [];
  foreach ($peserta as $p) {
    $kelas = $p['kelas'];
    if (!isset($kelompok[$kelas])) {
      $kelompok[$kelas] = [];
    }   
    $kelompok[$kelas][] = $p;
  }
  return $kelompok;
}

$kelompok = kelompokkanPerKelas($peserta);
echo "\nRata-rata nilai peserta adalah: $rataRata";
echo "\nNilai tertinggi peserta adalah: " . cariTertinggi($peserta)[0]['nilai'];
echo "\nJumlah peserta yang lulus: " . count(filterLulus($peserta));
echo "\nPeserta dikelompokkan per kelas: ";
foreach ($kelompok as $kelas => $peserta) {
    echo "\nKelas: $kelas";
    foreach ($peserta as $siswa) {
        echo "\n  - {$siswa['nama']}: {$siswa['nilai']}";
    }
}

function tentukanGrade(int $nilai): string
{
  if ($nilai >= 85) {
    return 'A';
  }
  if ($nilai >= 70) {
    return 'B';
  }
  return 'C';
}
?>
<table border="1">
  <thead>
    <tr>
      <th>Nomor</th>
      <th>Nama</th>
      <th>Kelas</th>
      <th>Nilai</th>
      <th>Grade</th>
    </tr>
  </thead>
  <tbody>
    <?php foreach ($urutan as $nomor => $siswa): ?>
      <tr>
        <td><?= htmlspecialchars((string) ($nomor + 1), ENT_QUOTES, 'UTF-8') ?></td>
        <td><?= htmlspecialchars((string) $siswa['nama'], ENT_QUOTES, 'UTF-8') ?></td>
        <td><?= htmlspecialchars((string) $siswa['kelas'], ENT_QUOTES, 'UTF-8') ?></td>
        <td><?= htmlspecialchars((string) $siswa['nilai'], ENT_QUOTES, 'UTF-8') ?></td>
        <td><?= htmlspecialchars(tentukanGrade((int) $siswa['nilai']), ENT_QUOTES, 'UTF-8') ?></td>
      </tr>
    <?php endforeach; ?>
  </tbody>
</table> 