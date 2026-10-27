import { BinarySearchTree } from "./structure.js";

console.log("=== UJI LAB 2: BINARY SEARCH TREE (BST) ===\n");

// 1. Inisialisasi BST dan Data Pengujian Modul
const bst = new BinarySearchTree();
const dataInput = [50, 30, 70, 20, 40, 60, 80];

console.log("1. Memasukkan Data ke BST:");
console.log("   Data Input:", dataInput);

// Loop masukkan setiap elemen ke dalam BST
dataInput.forEach((nilai) => {
  bst.insert(nilai);
});

// 2. Uji Penelusuran inOrder() (Hasil harus terurut secara ascending)
console.log("\n2. Penelusuran inOrder():");
const hasilInOrder = bst.inOrder();
console.log("   Hasil inOrder():", hasilInOrder);
// Expected: [20, 30, 40, 50, 60, 70, 80]

// 3. Uji Method has(nilai)
console.log("\n3. Pengujian Pencarian Nilai (has):");

const ada60 = bst.has(60);
console.log("   Uji has(60):", ada60); // Expected: true

const ada65 = bst.has(65);
console.log("   Uji has(65):", ada65); // Expected: false

// 4. Visualisasi Bentuk Pohon BST Hasil Input
console.log("\n4. Visualisasi Bentuk Pohon BST:");
console.log(`
         50 (Akar)
       /    \\
     30      70
    /  \\    /  \\
   20  40  60  80 (Daun)
`);

console.log("=== UJI BST SELESAI ===");
