<?php
declare(strict_types=1);

const FILE_TAMU = __DIR__ . '/data/tamu.json';
const MAKS_PESAN = 500;
const FILE_IP_LOG = __DIR__ . '/data/ip_log.json';
const JEDA_KIRIM = 30; // dalam detik

/**
 * Memeriksa apakah IP masih dalam rentang jeda waktu (cooldown).
 */
function bolehKirimPesan(string $ip): bool
{
    if (!file_exists(FILE_IP_LOG)) {
        return true;
    }

    $isi = file_get_contents(FILE_IP_LOG);
    $log = json_decode($isi === false ? '[]' : $isi, true);
    
    if (!is_array($log) || !isset($log[$ip])) {
        return true;
    }

    $waktuTerakhir = (int) $log[$ip];
    return (time() - $waktuTerakhir) >= JEDA_KIRIM;
}

/**
 * Mencatat timestamp pengiriman pesan terakhir dari IP tertentu.
 */
function catatWaktuIp(string $ip): bool
{
    $folder = dirname(FILE_IP_LOG);
    if (!is_dir($folder) && !mkdir($folder, 0755, true)) {
        return false;
    }

    $log = [];
    if (file_exists(FILE_IP_LOG)) {
        $isi = file_get_contents(FILE_IP_LOG);
        $log = json_decode($isi === false ? '[]' : $isi, true);
        if (!is_array($log)) {
            $log = [];
        }
    }

    $log[$ip] = time();
    $json = json_encode($log, JSON_PRETTY_PRINT);

    return $json !== false && file_put_contents(FILE_IP_LOG, $json, LOCK_EX) !== false;
}

function e(string $teks): string
{
    return htmlspecialchars($teks, ENT_QUOTES, 'UTF-8');
}

function bersihkanSpasi(string $teks): string
{
    return trim((string) preg_replace('/\s+/', ' ', $teks));
}

/**
 * Memvalidasi input buku tamu.
 *
 * @param array<string, mixed> $input Data mentah (biasanya $_POST).
 * @return array{data: array<string, string>, galat: array<string, string>}
 */
function validasiTamu(array $input): array
{
    $data = [
        'nama' => bersihkanSpasi((string) ($input['nama'] ?? '')),
        'email' => trim((string) ($input['email'] ?? '')),
        'pesan' => trim((string) ($input['pesan'] ?? '')),
    ];
    $galat = [];

    if (mb_strlen($data['nama']) < 3) {
        $galat['nama'] = 'Nama minimal 3 karakter.';
    }
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $galat['email'] = 'Format email tidak valid.';
    }
    $panjang = mb_strlen($data['pesan']);
    if ($panjang === 0 || $panjang > MAKS_PESAN) {
        $galat['pesan'] = 'Pesan wajib diisi, maksimal ' . MAKS_PESAN . ' karakter.';
    }

    return ['data' => $data, 'galat' => $galat];
}

function ambilSemuaTamu(): array
{
    if (!file_exists(FILE_TAMU)) {
        return [];
    }
    $isi = file_get_contents(FILE_TAMU);
    $daftar = json_decode($isi === false ? '[]' : $isi, true);

    return is_array($daftar) ? $daftar : [];
}

function simpanTamu(array $data): bool
{
    $folder = dirname(FILE_TAMU);
    if (!is_dir($folder) && !mkdir($folder, 0755, true)) {
        return false;
    }

    $daftar = ambilSemuaTamu();
    $data['id'] = $daftar === [] ? 1 : max(array_column($daftar, 'id')) + 1;
    $data['waktu'] = date('Y-m-d H:i:s');
    $daftar[] = $data;

    $json = json_encode($daftar, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

    return $json !== false && file_put_contents(FILE_TAMU, $json, LOCK_EX) !== false;
}

function cariTamu(array $daftar, string $kata): array
{
    if ($kata === '') {
        return $daftar;
    }
    return array_values(array_filter(
        $daftar,
        fn (array $tamu): bool => stripos($tamu['nama'], $kata) !== false
    ));
}

/**
 * Menghapus data tamu berdasarkan ID.
 */
function hapusTamu(int $id): bool
{
    $daftar = ambilSemuaTamu();
    $daftarBaru = array_values(array_filter(
        $daftar,
        fn (array $tamu): bool => ((int) ($tamu['id'] ?? 0)) !== $id
    ));

    // Jika jumlah data tidak berubah, berarti ID tidak ditemukan
    if (count($daftar) === count($daftarBaru)) {
        return false;
    }

    $json = json_encode($daftarBaru, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    return $json !== false && file_put_contents(FILE_TAMU, $json, LOCK_EX) !== false;
}

/**
 * Mengunduh (download) seluruh data tamu sebagai berkas CSV.
 */
function eksporCsvTamu(): void
{
    $daftar = ambilSemuaTamu();

    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=daftar_tamu_' . date('Ymd_His') . '.csv');

    $output = fopen('php://output', 'w');
    if ($output === false) {
        return;
    }

    // Tulis BOM untuk dukungan UTF-8 di Microsoft Excel
    fprintf($output, chr(0xEF).chr(0xBB).chr(0xBF));

    // Header Kolom CSV
    fputcsv($output, ['ID', 'Waktu', 'Nama', 'Email', 'Pesan']);

    foreach ($daftar as $tamu) {
        fputcsv($output, [
            $tamu['id'] ?? '',
            $tamu['waktu'] ?? '',
            $tamu['nama'] ?? '',
            $tamu['email'] ?? '',
            $tamu['pesan'] ?? ''
        ]);
    }

    fclose($output);
    exit;
}