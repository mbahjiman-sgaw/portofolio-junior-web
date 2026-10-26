console.log(" ===== PENGOLAH NILAI ===== ");
// 1. Input nilai siswa
// 2. Tampilkan rata - rata, nilai tertinggi, dan terendah
// 3. Tampilkan predikat lulus / tidak lulus per siswa
// 4. Keluar

function hitungRataRata(daftar) {
  if (daftar.length === 0) return 0;
  return daftar.reduce((jumlah, n) => jumlah + n, 0) / daftar.length;
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

function tampilkanMenu() {
  console.log("\n===== PENGOLAH NILAI =====");
  console.log("1. Input nilai siswa");
  console.log("2. Tampilkan statistik");
  console.log("3. Tampilkan predikat per siswa");
  console.log("4. Keluar");
}

function tampilkanLaporan(nama, nilai) {
   alert(
              `Nama: ${nama} | Nilai: ${nilai} | `
            );
}

const readline = require("readline/promises");
const { stdin: input, stdout: output } = require("process");
const NILAI_MIN = 0;
const NILAI_MAKS = 100;
const BATAS_LULUS = 70;
async function main() {
  const rl = readline.createInterface({
    input,
    output,
  });
  const daftarNama = [];
  const daftarNilai = [];
  const maxNilai = Math.max(...daftarNilai); //... untuk meload array, pakai fungsi min,max
  const minNilai = Math.min(...daftarNilai);

  let jalan = true;
  while (jalan) {
tampilkanMenu()
    const pilihan = await rl.question("Pilih menu (1-4): ");
    switch (pilihan) {
      case "1": {
        const nama = (await rl.question("Nama siswa: ")).trim();
        const nilai = Number(await rl.question("Nilai (0-100): "));
        // TODO: validasi nama tidak kosong dan nilai 0-100 (Number.isNaN)
        if (nama && !isNaN(nilai)) {
          daftarNama.push(nama); //push dari var ke array
          daftarNilai.push(nilai);
        }
        break;
      }
      case "2": {
        // TODO: jika kosong tampilkan pesan; jika ada hitung rata-rata,
        if (daftarNilai.length === 0) {
          console.log("Daftar siswa dan nilai masih kosong.");
        } else {
          // Initialize variables for loops
          let total = 0;
          let maxNilai = daftarNilai[0];
          let minNilai = daftarNilai[0];
          // 4. Display the results          
          hitungRataRata();
          cariTertinggi();
          cariTerendah();
        }
        break;
      }

      case "3": {
        // 1. Always check if the list is empty first
        if (daftarNama.length === 0) {
          console.log("Belum ada data siswa untuk ditampilkan.");
        } else {
          console.log("\n=== DAFTAR PREDIKAT SISWA ===");

          // 2. Loop through all students using their index (i)
          for (let i = 0; i < daftarNama.length; i++) {
            const nama = daftarNama[i];
            const nilai = daftarNilai[i];

            // 3. Determine Grade (A, B, C, or D)
           tentukanGrade();
            // 4. Determine Pass / Fail using your BATAS_LULUS (70) variable
           tentukanStatus();
            // 5. Print the formatted row for this specific student
            tampilkanLaporan()
                      }
        }
        break;
      }

      case "4":
        jalan = false;
        console.log("Terima kasih.");
        break;
      default:
        console.log("Pilihan tidak valid.");
    }
  }
  rl.close();
}

main();

console.assert(hitungRataRata([80, 90]) === 85, `rata-rata 80, 90 harus 85`);
console.assert(hitungRataRata([]) === 0, `rata-rata array kosong harus 0`);
console.assert(tentukanGrade(85) === `A`, `nilai 85 harus A`);
console.assert(tentukanGrade(69) === `C`, `nilai 69 harus C`);
console.assert(nilaiValid(101) === false, `101 tidak valid`);