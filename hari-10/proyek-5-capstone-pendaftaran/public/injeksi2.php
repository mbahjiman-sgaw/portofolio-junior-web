<?php

declare(strict_types=1);

// Menghubungkan ke database menggunakan PDO dari config/database.php
require_once __DIR__ . '/../config/database.php';
$pdo = getConnection();

// Mengambil input dari URL (contoh: ?email=x'%20OR%20'1'='1)
$emailInput = $_GET['email'] ?? '';
?>
<!DOCTYPE html>
<html lang="id">

<head>
  <meta charset="UTF-8">
  <title>Demonstrasi SQL Injection - Lab 2</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
      line-height: 1.6;
    }

    .box-danger {
      background-color: #ffe6e6;
      border-left: 5px solid #ff4d4d;
      padding: 15px;
      margin-bottom: 20px;
    }

    .box-safe {
      background-color: #e6ffcc;
      border-left: 5px solid #53d769;
      padding: 15px;
      margin-bottom: 20px;
    }

    pre {
      background: #fff;
      padding: 10px;
      border: 1px solid #ddd;
    }
  </style>
</head>

<body>

  <h1>Laboratorium 2: Demonstrasi SQL Injection</h1>
  <p><strong>Input yang dimasukkan via URL (?email=...):</strong> <code><?= htmlspecialchars($emailInput) ?></code></p>

  <!-- ================= 1. VERSI BERBAHAYA ================= -->
  <div class="box-danger">
    <h3>1. Versi Berbahaya (String Concatenation)</h3>
    <p><strong>Status:</strong> <span style="color: red; font-weight: bold;">BERHASIL DIJEBOL (BREACHED)</span></p>
    <p><strong>Mengapa bisa jebol?</strong> Menggunakan penggabungan string (concatenation). Input pengguna digabung langsung ke dalam query SQL. Jika input berisi perintah SQL (seperti <code>OR '1'='1'</code>), database akan menganggapnya sebagai bagian dari perintah asli, membuat kondisi selalu benar dan membocorkan seluruh data[cite: 5].</p>

    <h4>Hasil Eksekusi:</h4>
    <?php
    try {
      // BERBAHAYA: input pengguna disambung langsung ke query
      $sqlDanger = "SELECT * FROM pendaftar WHERE email = '" . $emailInput . "'";
      $stmtDanger = $pdo->query($sqlDanger);
      $hasilDanger = $stmtDanger->fetchAll();

      echo "<pre>" . print_r($hasilDanger, true) . "</pre>";
    } catch (Throwable $e) {
      echo "<p>Error: " . htmlspecialchars($e->getMessage()) . "</p>";
    }
    ?>
  </div>

  <!-- ================= 2. VERSI AMAN ================= -->
  <div class="box-safe">
    <h3>2. Versi Aman (Prepared Statement)</h3>
    <p><strong>Status:</strong> <span style="color: green; font-weight: bold;">AMAN / TERLINDUNGI</span></p>
    <p><strong>Mengapa aman?</strong> Menggunakan <em>prepared statement</em> dengan placeholder (<code>:email</code>). Data dikirim secara terpisah dari struktur perintah SQL[cite: 5]. Database memperlakukan input pengguna secara ketat sebagai teks biasa (literal data), sehingga trik injeksi apa pun akan dianggap sebagai teks email yang dicari, bukan kode program.</p>

    <h4>Hasil Eksekusi:</h4>
    <?php
    try {
      // AMAN: prepared statement; data dikirim terpisah dari perintah SQL
      $stmtSafe = $pdo->prepare('SELECT * FROM pendaftar WHERE email = :email');
      $stmtSafe->execute(['email' => $emailInput]);
      $hasilSafe = $stmtSafe->fetchAll();

      echo "<pre>" . print_r($hasilSafe, true) . "</pre>";
    } catch (Throwable $e) {
      echo "<p>Error: " . htmlspecialchars($e->getMessage()) . "</p>";
    }
    ?>
  </div>

</body>

</html>