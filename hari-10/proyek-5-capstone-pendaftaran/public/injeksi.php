<?php

declare(strict_types=1);
require_once __DIR__ . '/../config/database.php';
$pdo = getConnection();

$email = $_GET['email'] ?? '';

echo "<h3>Input Email: " . htmlspecialchars($email) . "</h3>";

// --- VERSI BERBAHAYA (SQL Injection Vulnerable) ---
echo "<h4>1. Versi Berbahaya (String Concatenation):</h4>";
try {
  // BERBAHAYA: input langsung disambung ke string query
  $sql = "SELECT * FROM pendaftar WHERE email = '" . $email . "'";
  $stmt = $pdo->query($sql);
  $hasilBerbahaya = $stmt->fetchAll();
  echo "<pre>" . print_r($hasilBerbahaya, true) . "</pre>";
} catch (Throwable $e) {
  echo "Error: " . $e->getMessage();
}

// --- VERSI AMAN (Prepared Statement) ---
echo "<h4>2. Versi Aman (Prepared Statement):</h4>";
try {
  // AMAN: data dikirim terpisah melalui parameter bind
  $stmt = $pdo->prepare('SELECT * FROM pendaftar WHERE email = :email');
  $stmt->execute(['email' => $email]);
  $hasilAman = $stmt->fetchAll();
  echo "<pre>" . print_r($hasilAman, true) . "</pre>";
} catch (Throwable $e) {
  echo "Error: " . $e->getMessage();
}
