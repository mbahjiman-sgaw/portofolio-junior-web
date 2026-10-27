// Pencarian linear: O(n), tidak perlu terurut
function cariLinear(daftar, target) {
  for (let i = 0; i < daftar.length; i++) {
    if (daftar[i] === target) return i;
  }
  return -1;
}
// Pencarian biner: O(log n), WAJIB terurut
function cariBiner(daftarUrut, target) {
  let kiri = 0;
  let kanan = daftarUrut.length - 1;
  while (kiri <= kanan) {
    const tengah = Math.floor((kiri + kanan) / 2);
    if (daftarUrut[tengah] === target) return tengah;
    if (daftarUrut[tengah] < target) kiri = tengah + 1;
    else kanan = tengah - 1;
  }
  return -1;
}

// Bubble sort: O(n^2), sederhana untuk belajar
function bubbleSort(daftar) {
  const hasil = [...daftar];
  for (let i = 0; i < hasil.length - 1; i++) {
    let adaTukar = false;
    for (let j = 0; j < hasil.length - 1 - i; j++) {
      if (hasil[j] > hasil[j + 1]) {
        [hasil[j], hasil[j + 1]] = [hasil[j + 1], hasil[j]];
        adaTukar = true;
      }
    }
    if (!adaTukar) break;
  }
  return hasil;
}
// Merge sort: O(n log n), membagi lalu menggabungkan
function mergeSort(daftar) {
  if (daftar.length <= 1) return daftar;
  const tengah = Math.floor(daftar.length / 2);
  return gabung(
    mergeSort(daftar.slice(0, tengah)),
    mergeSort(daftar.slice(tengah)),
  );
}

function gabung(kiri, kanan) {
  const hasil = [];
  let i = 0;
  let j = 0;
  while (i < kiri.length && j < kanan.length) {
    hasil.push(kiri[i] <= kanan[j] ? kiri[i++] : kanan[j++]);
  }
  return hasil.concat(kiri.slice(i), kanan.slice(j));
}

function insertionSort(daftar) {
  const hasil = [...daftar];

  for (let i = 1; i < hasil.length; i++) {
    const kunci = hasil[i];
    let j = i - 1;

    // Geser elemen-elemen yang lebih besar dari kunci ke kanan
    while (j >= 0 && hasil[j] > kunci) {
      hasil[j + 1] = hasil[j];
      j--;
    }
    // Tempatkan kunci di posisi yang tepat
    hasil[j + 1] = kunci;
  }

  return hasil;
}

// Bubble Sort dengan Penghitung
function bubbleSortDenganPenghitung(daftar) {
  const hasil = [...daftar];
  let perbandingan = 0; // 1. Variabel Penghitung

  for (let i = 0; i < hasil.length - 1; i++) {
    let adaTukar = false;
    for (let j = 0; j < hasil.length - 1 - i; j++) {
      perbandingan++; // 2. Tambahkan counter setiap kali membandingkan
      if (hasil[j] > hasil[j + 1]) {
        [hasil[j], hasil[j + 1]] = [hasil[j + 1], hasil[j]];
        adaTukar = true;
      }
    }
    if (!adaTukar) break;
  }
  return { hasil, perbandingan };
}

// Insertion Sort dengan Penghitung
function insertionSortDenganPenghitung(daftar) {
  const hasil = [...daftar];
  let perbandingan = 0; // 1. Variabel Penghitung

  for (let i = 1; i < hasil.length; i++) {
    const kunci = hasil[i];
    let j = i - 1;

    while (j >= 0) {
      perbandingan++; // 2. Tambahkan counter setiap kali membandingkan
      if (hasil[j] > kunci) {
        hasil[j + 1] = hasil[j];
        j--;
      } else {
        break; // Berhenti membandingkan jika kunci sudah lebih besar
      }
    }
    hasil[j + 1] = kunci;
  }
  return { hasil, perbandingan };
}

const kasusUji = {
  "Array Kosong": [],
  "Satu Elemen": [42],
  "Sudah Terurut": [1, 2, 3, 4, 5],
  Terbalik: [5, 4, 3, 2, 1],
  "Ada Duplikat": [3, 1, 4, 1, 5, 9, 2, 6, 5],
  Acak: [7, 2, 5, 3, 8, 1, 4, 69, 6],
};

const randomArray = Array.from({ length: 1000 }, () =>
  Math.floor(Math.random() * 1000),
);
// console.log(randomArray);

// console.log("Cari Linear: ", cariLinear(kasusUji["Array Kosong"], 69)); // tampilkan index
// console.log("Cari Linear: ", cariLinear(kasusUji["Acak"], 69)); // tampilkan index
// console.log("Cari Biner: ", cariBiner(kasusUji["Sudah Terurut"], 2)); // tampilkan index
// console.log("Bubble Sort: ", bubbleSort(kasusUji["Acak"])); // tampilkan array yang sudah diurutkan
// console.log("Merge Sort: ", mergeSort(kasusUji["Ada Duplikat"])); // tampilkan array yang sudah diurutkan
// console.log("Insertion Sort: ", insertionSort(kasusUji["Acak"])); // tampilkan array yang sudah diurutkan

console.time(
  "Bubble Sort dengan Penghitung: ",
  bubbleSortDenganPenghitung(randomArray),
);
console.timeEnd(
  "Bubble Sort dengan Penghitung: ",
  bubbleSortDenganPenghitung(randomArray),
);
console.time(
  "Insertion Sort dengan Penghitung: ",
  insertionSortDenganPenghitung(randomArray),
);
console.timeEnd(
  "Insertion Sort dengan Penghitung: ",
  insertionSortDenganPenghitung(randomArray),
);

const data10000 = Array.from({ length: 10000 }, () =>
  Math.floor(Math.random() * 10000),
);
const data100000 = Array.from({ length: 100000 }, () =>
  Math.floor(Math.random() * 100000),
);
console.time("Bubble Sort 10k");
bubbleSort(data10000);
console.timeEnd("Bubble Sort 10k");
console.time("Merge Sort 10k");
mergeSort(data10000);
console.timeEnd("Merge Sort 10k");
