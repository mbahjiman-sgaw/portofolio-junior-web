console.log(" ===== TAMBAHKAN DIGIT ===== ");

let num = Number(prompt("Masukan angka: "));
let sum = 0;

// Preserve original number for output display
let temp = num;

while (temp > 0) {
  let lastDigit = temp % 10;   // ambil digit terakhir
  sum = sum + lastDigit;             // tambah digit terakhir ke var akhir
  temp = Math.floor(temp / 10); // Remove the last digit
}
sum