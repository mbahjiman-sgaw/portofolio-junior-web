const peserta = [
  { id: 1, nama: "Sari", kelas: "Web", nilai: 90, aktif: true },
  { id: 2, nama: "Budi", kelas: "Web", nilai: 68, aktif: true },
  { id: 3, nama: "Citra", kelas: "Data", nilai: 82, aktif: false },
  { id: 4, nama: "Deni", kelas: "Web", nilai: 95, aktif: true },
  { id: 5, nama: "Eka", kelas: "Mobile", nilai: 75, aktif: true },
  { id: 6, nama: "Fani", kelas: "Data", nilai: 88, aktif: false },
  { id: 7, nama: "Gita", kelas: "Web", nilai: 91, aktif: true },
  { id: 8, nama: "Hadi", kelas: "Mobile", nilai: 60, aktif: true },
  { id: 9, nama: "Indah", kelas: "Data", nilai: 85, aktif: true },
  { id: 10, nama: "Joko", kelas: "Web", nilai: 78, aktif: false },
];

// Lihat Peserta Aktif
console.log("Lihat Peserta Aktif");
const pesertaAktif = peserta.filter((p) => p.aktif === true);
console.log(pesertaAktif);

// Urutkan peserta
console.log("Urutkan Peserta by Nama");
const urutNama = [...peserta].sort((a, b) => a.nama.localeCompare(b.nama)); //pakai localeCompare
console.log(urutNama);

console.log("Urutkan Peserta by Nilai Ascending");
const urutNilaiAsc = [...peserta].sort((a, b) => a.nilai - b.nilai); //pakai -
console.log(urutNilaiAsc);

console.log("Urutkan Peserta by Nilai Decending");
const urutNilaiDsc = [...peserta].sort((a, b) => b.nilai - a.nilai);
console.log(urutNilaiDsc);

// Cari peserta
console.log("Cari Peserta by ID");
function cariPesertaDenganId(idCari) {
  const hasil = peserta.find((p) => p.id === idCari);
  if (!hasil) {
    return `Peserta dengan ID ${idCari} tidak ditemukan!`;
  }
  return hasil;
}

console.log("Cari ID 2:", cariPesertaDenganId(99)); //panggil fungsi

// Hitung peserta
console.log("Hitung Jumlah Peserta per Kelas");
const hitungPerKelas = peserta.reduce((penghitung, p) => {
  penghitung[p.kelas] = (penghitung[p.kelas] || 0) + 1;
  return penghitung;
}, {});
console.log('Total per kelas cara modern: ', hitungPerKelas);

// Step 1: Create an empty tally sheet object
const hitungPerKelas2 = {};

// Step 2: Loop through every participant in the array
for (const p of peserta) {
  // Step 3: Check if class exists in object; if not, default to 0, then add 1
  if (hitungPerKelas2[p.kelas] === undefined) {
    hitungPerKelas2[p.kelas] = 1; // First time seeing this class!
  } else {
    hitungPerKelas2[p.kelas] = hitungPerKelas2[p.kelas] + 1; // Add to existing count!
  }
}

console.log('Total per kelas cara kuno: ', hitungPerKelas2);

// Tambah peserta baru (Push)
console.log("Tambah, Ubah, Hapus Peserta")
peserta.push({ id: 11, nama: 'Ginem', kelas: 'Web', nilai: 89, aktif: true });
// Ubah nilai (ID ke 2)
const budi = peserta.find(p => p.id === 2);
if (budi) budi.nilai = 75;
// Hapus peserta non-aktif (Filter)
const pesertaBaru = peserta.filter(p => p.aktif);
console.log("Hasil setelah ubah & hapus:", pesertaBaru);

// Ubah array jadi berindex
console.log("Ubah Array Menjadi Objek Berindeks ID (Super Cepat O(1))");
const objekBerindeks = peserta.reduce((acc, p) => { //acc memuat data dari peserta satu-demi-satu
  acc[p.id] = p; //format di dalam acc, peserta diikuti id
  return acc;
}, {});
console.log("Sebelum diubah: ", peserta);
console.log("Setelah diubah: ", objekBerindeks);

