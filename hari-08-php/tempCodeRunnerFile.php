<?php
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