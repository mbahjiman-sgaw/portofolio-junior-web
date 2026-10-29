<?php

declare(strict_types=1);

require_once __DIR__ . '/../src/bootstrap.php';

unset($_SESSION['admin_logged_in'], $_SESSION['admin_user']);
setFlash('Anda telah keluar dari sesi admin.');
redirect('index.php');
