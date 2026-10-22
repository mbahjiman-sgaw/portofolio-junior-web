console.log("=== Konversi Nilai Ke Huruf ===");

const nilai = Number(prompt("Nilai (0-100): "));
let grade;
if (nilai >= 85) grade = "A";
else if (nilai >= 70) grade = "B";
else if (nilai >= 55) grade = "C";
else grade = "D";
grade

console.log("=== Cari Tahun Kabisat ===");

const tahun = Number(prompt("Tahun: "));
const kabisat = (tahun % 4 === 0 && tahun % 100 !== 0) || tahun % 400 === 0;
kabisat ? "Kabisat" : "Bukan Kabisat"

console.log("=== Cari Ganjil atau Genap ===");

const bilangan = Number(prompt("Bilangan: "));
const genap = (bilangan % 2 === 0) 
//  && tahun % 100 !== 0) || tahun % 400 === 0;
genap ? "genap" : "ganjil"

console.log("=== Cari Positif atau Negatif atau Nol ===");

const angka = Number(prompt("Masukan Angka: "));
let polaritas;
if (angka > 0) polaritas = "positif";
else if (angka < 0) polaritas = "negatif";
else  polaritas = "nol";
polaritas

console.log("=== Tarif Parkir ===");

const totalJam = Number(prompt("Masukan durasi dalam jam: "));
// let jamBerikutnya = totalJam - 2
let jamBerikutnya = Math.max(0, totalJam - 2); // Jika hasil negatif, otomatis diset jadi 0
let ongkos = 2000 * jamBerikutnya + 3000;
if (ongkos >= 15000) {ongkos = 15000;}
ongkos

/* ALGORITMA HitungTarifParkir
Kamus:
    totalJam, jamBerikutnya, ongkos : Angka (Numeric)

Algoritma:
    // 1. Meminta input durasi parkir dari pengguna
    BACA totalJam

    // 2. Menghitung jam berikutnya (mencegah nilai negatif jika jam <= 2)
    JIKA (totalJam - 2) > 0 MAKA
        jamBerikutnya = totalJam - 2
    JIKA TIDAK
        jamBerikutnya = 0
    SELESAI JIKA

    // 3. Menghitung total ongkos berdasarkan tarif progresif
    ongkos = (2000 * jamBerikutnya) + 3000

    // 4. Membatasi tarif maksimal per hari
    JIKA ongkos > 15000 MAKA
        ongkos = 15000
    SELESAI JIKA

    // 5. Menampilkan hasil akhir ongkos
    TAMPILKAN ongkos
SELESAI */

console.log("=== BMI Finder ===");

const height = Number(prompt("Enter height in m: "));
const weight = Number(prompt("Enter weight in kg: "));
const BMI = weight/(height **2);
let statusBmi;
if (BMI >= 30) statusBmi = "Obesity";
else if (BMI >= 25) statusBmi = "Semi Obese";
else if (BMI >= 18.5) statusBmi = "Normal";
else statusBmi = "Low";
statusBmi

console.log("=== SIMPLE CALCULATOR ===");

const num1 = Number(prompt("Masukan nilai 1: "));
const num2 = Number(prompt("Masukan nilai 2: "));
let num3;
const op = (prompt("Pilih operator(+, -, *, /): "));

 switch (op) {
        case "+":
            num3 = num1 + num2;
            break;
        case "-":
            num3 = num1 - num2; 
            break;
        case "*":
            num3 = num1 * num2;
            break;
        case "/":
            num3 = num1 / num2;
            break;
    }
num3





