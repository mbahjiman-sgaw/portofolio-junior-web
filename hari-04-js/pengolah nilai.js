console.log(" ===== PENGOLAH NILAI ===== ");
// 1. Input nilai siswa
// 2. Tampilkan rata - rata, nilai tertinggi, dan terendah
// 3. Tampilkan predikat lulus / tidak lulus per siswa
// 4. Keluar

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
    console.log("\n===== PENGOLAH NILAI =====");
    console.log("1. Input nilai siswa");
    console.log("2. Tampilkan statistik");
    console.log("3. Tampilkan predikat per siswa");
    console.log("4. Keluar");
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

          // 2. Loop through the array to find total, max, and min
          for (let i = 0; i < daftarNilai.length; i++) {
            const currentNilai = daftarNilai[i];

            // Add to total for average calculation
            total += currentNilai;

            // Check for maximum
            if (currentNilai > maxNilai) {
              maxNilai = currentNilai;
            }

            // Check for minimum
            if (currentNilai < minNilai) {
              minNilai = currentNilai;
            }
          }

          // 3. Calculate the final average
          const avgNilai = total / daftarNilai.length;

          // 4. Display the results
          console.log("Rata-rata nilai: ", avgNilai.toFixed(2));
          console.log("Nilai Tertinggi (Max): ", maxNilai);
          console.log("Nilai Terendah (Min): ", minNilai);
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
            let grade = "D";
            if (nilai >= 85) {
              grade = "A";
            } else if (nilai >= 70) {
              grade = "B";
            } else if (nilai >= 55) {
              grade = "C";
            } else grade = "D";

            // 4. Determine Pass / Fail using your BATAS_LULUS (70) variable
            let status = "Tidak Lulus";
            if (nilai >= BATAS_LULUS) {
              status = "Lulus";
            }

            // 5. Print the formatted row for this specific student
            console.log(
              `${i + 1}. ${nama} | Nilai: ${nilai} | Grade: ${grade} | Status: ${status}`,
            );
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
