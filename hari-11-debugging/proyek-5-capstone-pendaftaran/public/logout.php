<?php

declare(strict_types=1);

require_once __DIR__ . '/../src/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  exit('Metode permintaan tidak diizinkan.');
}

cekCsrf();
logout();
setFlash('Anda telah keluar dari sesi admin.');
redirect('login.php');
