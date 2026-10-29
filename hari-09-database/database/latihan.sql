-- 1. Tampilkan semua pendaftar diurutkan nama A-Z
SELECT * FROM pendaftar ORDER BY nama ASC;

-- 2. Tampilkan 5 pendaftar terbaru
SELECT * FROM pendaftar ORDER BY id DESC LIMIT 5;

-- 3. Cari pendaftar yang namanya mengandung 'an'
SELECT * FROM pendaftar WHERE nama LIKE '%an%';

-- 4. Tampilkan nama pendaftar beserta nama kelas (JOIN)
SELECT p.nama, k.nama_kelas 
FROM pendaftar p 
JOIN kelas k ON k.id = p.kelas_id;

-- 5. Hitung jumlah pendaftar per kelas (GROUP BY)
SELECT k.nama_kelas, COUNT(p.id) AS jumlah 
FROM kelas k 
LEFT JOIN pendaftar p ON p.kelas_id = k.id 
GROUP BY k.id, k.nama_kelas;

-- 6. Tampilkan kelas yang belum memiliki pendaftar (LEFT JOIN + IS NULL)
SELECT k.* 
FROM kelas k 
LEFT JOIN pendaftar p ON p.kelas_id = k.id 
WHERE p.id IS NULL;

-- 7. Ubah nomor HP satu pendaftar (dengan WHERE)
UPDATE pendaftar SET no_hp = '08696969696969' WHERE id = 1;

-- 8. Hapus satu pendaftar
DELETE FROM pendaftar WHERE id = 1;

-- 9. Coba masukkan email ganda dan amati pesan error (1062 Duplicate entry)
-- (Contoh baris di bawah ini akan memicu error jika email sudah ada di database)
-- INSERT INTO pendaftar (nama, email, no_hp, alamat, kelas_id) 
-- VALUES ('Test', 'sari@contoh.com', '081234567890', 'Jakarta', 1);

-- 10. Coba hapus kelas yang masih memiliki pendaftar dan amati pesan error foreign key (1451)
-- (Contoh baris di bawah ini akan memicu error foreign key constraint)
-- DELETE FROM kelas WHERE id = 1;