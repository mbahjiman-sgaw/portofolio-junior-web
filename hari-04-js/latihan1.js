console.log("=== 2 ===");

const namaLengkap = "Sukamto";
let umur = 39;
let tinggiBadan = 1.85; // dalam meter
let statusAktif = true;

console.log("Nama: ", namaLengkap);
console.log("Umur: ", umur);
console.log("Tinggi Badan: ", tinggiBadan, "m");
console.log("Status Aktif: ", statusAktif);

console.log(`Nama: ${namaLengkap}`);
console.log(`Umur: ${umur} tahun`);
console.log(`Tinggi Badan: ${tinggiBadan} m`);
console.log(`Status Aktif: ${statusAktif}`);

console.log("=== 3 ===");

console.log(typeof ("5" + 3));
console.log(typeof (5 + 3));
console.log(typeof ("5" * 3));
console.log(typeof (0.1 + 0.2));
console.log(typeof Number("abc"));
console.log(typeof (10 / 3));
console.log(typeof (10 % 3));
console.log(typeof (2 ** 10));

console.log("=== 4 ===");

const jariJari = 7;
const luasLingkaran = Math.PI * jariJari ** 2;
const kelilingLingkaran = 2 * Math.PI * jariJari;

console.log("-- Luas dan Keliling --");
console.log("Luas Lingkaran: ", Math.round(luasLingkaran), "cm\u00B2");
console.log("Keliling Lingkaran: ", Math.round(kelilingLingkaran), "cm");

console.log("-- Detik per Hari --");
const detik = 60;
const menit = 60;
const hari = 24 * menit * detik;
console.log("Total detik per hari: ", hari, "detik");

console.log("-- Konversi C ke F --");
const celcius = 35;
const fahrenheit = (celcius * 9) / 5 + 32;
console.log("Suhu dalam Fahrenheit: ", fahrenheit, "derajat");