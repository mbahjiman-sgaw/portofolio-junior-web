console.log("=== 1. Hitung Frekuensi Kata (Map) ===");
const kalimat =
  "saya belajar web saya suka web ginem sukamto suginem sukamto kamto ajar aya website";
const kataArray = kalimat.split(" ");
const frekuensiMap = new Map();

kataArray.forEach((kata) => {
  frekuensiMap.set(kata, (frekuensiMap.get(kata) || 0) + 1);
});

const frekuensiTerurut = [...frekuensiMap.entries()]
  .sort((a, b) => b[1] - a[1])
  .map(([kata, frekuensi]) => `${kata}: ${frekuensi}`);

console.log(frekuensiTerurut);

console.log("=== 2. Hitung  Kata  ===");

const JumlahKata = kataArray.length;
console.log("Jumlah kata: ", JumlahKata);

console.log("=== 3. Hilangkan Duplikat Email (Set) ===");
const daftarEmail = [
  "wags378@icloud.com",
  "swagsgawon@yahoo.com",
  "on_326@icloud.com",
  "swon968@protonmail.com",
  "sgawon245@outlook.com",
  "sgaw841@protonmail.com",
  "wags_220@protonmail.com",
  "sgawon691@yahoo.com",
  "on_sgaw208@yandex.com",
  "swonswag@mail.com",
  "sgawsgawon@protonmail.com",
  "sgawon_163@gmail.com",
  "swonswon@mail.com",
  "swagsgawon@icloud.com",
  "sgaw.swon@gmail.com",
  "on286@yandex.com",
  "swag928@icloud.com",
  "wags311@gmail.com",
  "on.sgawon@mail.com",
  "on_sgawon980@outlook.com",
  "sgawon.swon@yahoo.com",
  "swonswon@mail.com",
  "sgaw611@protonmail.com",
  "sgawon_swag849@yahoo.com",
  "sgawswag@mail.com",
  "swonswag@yandex.com",
  "sgawon.sgaw@icloud.com",
  "sgawon_on15@gmail.com",
  "on_swag196@icloud.com",
  "swag.swag@yandex.com",
  "sgawon.sgaw@icloud.com",
  "swon446@yahoo.com",
  "sgaw_757@mail.com",
  "swon_467@protonmail.com",
  "sgawon.sgawon@mail.com",
  "wags_735@gmail.com",
  "wags.sgaw@gmail.com",
  "sgawon.swag@mail.com",
  "wags_707@gmail.com",
  "wags.on@outlook.com",
  "swon_swon172@yahoo.com",
  "wags_641@mail.com",
  "swon889@mail.com",
  "sgawonswon@yandex.com",
  "sgawsgaw@yandex.com",
  "wags_848@outlook.com",
  "sgawon.wags@gmail.com",
  "sgaw658@outlook.com",
  "swag_on915@outlook.com",
  "onsgawon@icloud.com",
  "sgaw_sgawon210@outlook.com",
  "sgawon_405@outlook.com",
  "sgaw_872@mail.com",
  "wagssgawon@outlook.com",
  "wagson@icloud.com",
  "sgawon301@mail.com",
  "wagswags@icloud.com",
  "wags_wags667@gmail.com",
  "wagssgaw@yahoo.com",
  "sgawon_wags351@mail.com",
  "wagson@icloud.com",
  "sgawon.swag@yahoo.com",
  "sgaw.swon@gmail.com",
  "swon_755@mail.com",
  "sgawswon@protonmail.com",
  "sgawon501@icloud.com",
  "wags_sgaw160@protonmail.com",
  "swag_955@protonmail.com",
  "sgawon.swag@gmail.com",
  "sgawswag@icloud.com",
  "sgawon.on@yandex.com",
  "sgaw_698@outlook.com",
  "swagwags@gmail.com",
  "on130@yandex.com",
  "on369@mail.com",
  "on388@protonmail.com",
  "wagssgawon@yandex.com",
  "wagsswon@icloud.com",
  "swon_sgaw241@icloud.com",
  "swon_wags377@protonmail.com",
  "sgawon_wags677@icloud.com",
  "swon_579@mail.com",
  "swon_925@protonmail.com",
  "swagswag@mail.com",
  "swagwags@gmail.com",
  "swon370@protonmail.com",
  "wags925@outlook.com",
  "wags820@mail.com",
  "swonwags@protonmail.com",
  "swag_on915@outlook.com",
  "on439@yandex.com",
  "swagon@protonmail.com",
  "on.sgawon@yahoo.com",
  "sgaw_669@protonmail.com",
  "sgawon.sgawon@yandex.com",
  "swon.sgaw@gmail.com",
  "sgaw_961@mail.com",
  "on883@yahoo.com",
  "sgawsgaw@outlook.com",
  "swonswon@yahoo.com",
];

console.log("Sebelum (Ada duplikat):", daftarEmail);
console.log(daftarEmail.length);

const setEmailUnik = new Set(daftarEmail); //set otomatis hapus duplikat
const emailBersih = [...setEmailUnik];
console.log("Sesudah (Bersih dari duplikat):", emailBersih);
console.log(emailBersih.length);

console.log("=== 4. Irisan Dua Daftar Peserta (Set) ===");

const kelasA = new Set(['Sari', 'Budi', 'Citra', 'Deni', 'Gita', 'Hadi', 'Indah', 'Joko']);
const kelasB = new Set(['Budi', 'Deni', 'Eka', 'Fani', 'Gita', 'Irfan', 'Kevin', 'Lani']);

// Cari siapa yang ikut di dua kelas sekaligus
const irisan = [...kelasA].filter(nama => kelasB.has(nama));
console.log("Peserta yang ada di Kelas A dan B:", irisan);

console.log("=== 4. Fungsi Cek Duplikat dengan Set ===");
function adaDuplikat(daftar) {
  const terlihat = new Set();
  for (const item of daftar) { //cek element per element
    if (terlihat.has(item)) return true; // Ketemu duplikat maka TRUE
    terlihat.add(item);
  }
  return false; //Gak ada duplikat maka FALSE
}

console.log(adaDuplikat(daftarEmail));
console.log(adaDuplikat(emailBersih));