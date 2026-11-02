<?php

declare(strict_types=1);
require_once __DIR__ . '/../src/validasi.php';
$hasilUji = [];
function uji(array &$hasil, string $nama, mixed $diharapkan, mixed $aktual): void
{
  $hasil[] = [$nama, $diharapkan === $aktual, $diharapkan, $aktual];
}
// uji($hasilUji, 'HP 10 digit lolos', true, validNoHp('0812345678'));
// uji($hasilUji, 'HP 9 digit gagal', false, validNoHp('081234567'));
// uji($hasilUji, 'HP 14 digit gagal', false, validNoHp('08123456789012'));
// uji($hasilUji, 'HP huruf gagal', false, validNoHp('08abc45678'));
// uji($hasilUji, 'Sisa kuota normal', 5, hitungSisaKuota(30, 25));
// uji($hasilUji, 'Sisa kuota tidak negatif', 0, hitungSisaKuota(30, 31));
// uji($hasilUji, 'Nomor bukti', 'REG-2026-000007', formatNomorBukti(2026, 7));

// uji($hasilUji, 'HP 10 digit total (08 + 8) - Valid Batas Bawah', true, validNoHp('0812345678'));
// uji($hasilUji, 'HP 13 digit total (08 + 11) - Valid Batas Atas', true, validNoHp('0812345678901'));
uji($hasilUji, 'HP 9 digit total (08 + 8) - Batas Bawah', true, validNoHp('0812345678'));
uji($hasilUji, 'HP 13 digit total (08 + 11) - Batas Atas', true, validNoHp('0812345678901'));
uji($hasilUji, 'HP 8 digit total (08 + 8) - Gagal', true, validNoHp('081234567'));
uji($hasilUji, 'HP 14 digit total (08 + 12) - Gagal', true, validNoHp('08123456789011'));
uji($hasilUji, 'HP Kosong - Gagal', true, validNoHp(''));
uji($hasilUji, 'Spasi - Gagal', true, validNoHp('081234567 8'));
uji($hasilUji, 'Karakter Khusus - Gagal', true, validNoHp('0812345678!'));


// uji($hasilUji, 'HP Awalan Bukan 08 (07123456789) - Gagal', false, validNoHp('07123456789'));
// uji($hasilUji, 'Sisa kuota normal', 5, hitungSisaKuota(30, 25));
// uji($hasilUji, 'Sisa kuota tidak negatif', 0, hitungSisaKuota(30, 31));

$gagal = 0;
echo '<pre>';
foreach ($hasilUji as [$nama, $lolos, $diharapkan, $aktual]) {
  if ($lolos) {
    echo '[LOLOS] ' . $nama . PHP_EOL;
  } else {
    $gagal++;
    echo '[GAGAL] ' . $nama . ' | diharapkan ' . var_export($diharapkan, true)
      . ', aktual ' . var_export($aktual, true) . PHP_EOL;
  }
}
echo PHP_EOL . ($gagal === 0 ? 'Semua uji lolos.' : $gagal . ' uji gagal.') .
  PHP_EOL;
echo '</pre>';
exit($gagal === 0 ? 0 : 1);
