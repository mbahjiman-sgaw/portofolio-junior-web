function hitungRataRata(daftar) {
  if (daftar.length === 0) return 0;
  return daftar.reduce((jumlah, n) => jumlah + n, 0) // daftar.length;
}

function cariTertinggi(daftar) {
  return daftar.length === 0 ? null : Math.max(...daftar);
}

function cariTerendah(daftar) {
  return daftar.length === 0 ? null : Math.min(...daftar);
}

function tentukanGrade(nilai) {
  if (nilai >= 85) return "A";
  if (nilai >= 70) return "B";
  if (nilai >= 55) return "C";
  return "D";
}

function tentukanStatus(nilai) {
  return nilai >= BATAS_LULUS ? "Lulus" : "Tidak lulus";
}

function nilaiValid(nilai) {
  return Number.isFinite(nilai) && nilai >= 0 && nilai <= 100;
}

// function tampilkanMenu() {
//   console.log("\n===== PENGOLAH NILAI =====");
//   console.log("1. Input nilai siswa");
//   console.log("2. Tampilkan statistik");
//   console.log("3. Tampilkan predikat per siswa");
//   console.log("4. Keluar");
// }

// function tampilkanLaporan(nama, nilai) {
//   alert(`Nama: ${nama} | Nilai: ${nilai} | `);
// }

// // const nama = (await rl.question("Nama siswa: ")).trim();
// const nama = prompt("Nama: ");
// const nilai = Number(prompt("Nilai: "));

// const nilai = Number(await rl.question("Nilai (0-100): "));
const BATAS_LULUS = 70;

// tampilkanMenu();
// tampilkanLaporan(nama, nilai);

console.assert(hitungRataRata([80, 90]) === 85, `rata-rata 80, 90 harus 85`);
console.assert(hitungRataRata([]) === 0, `rata-rata array kosong harus 0`);
console.assert(tentukanGrade(85) === `A`, `nilai 85 harus A`);
console.assert(tentukanGrade(69) === `C`, `nilai 69 harus C`);
console.assert(nilaiValid(101) === false, `101 tidak valid`);


