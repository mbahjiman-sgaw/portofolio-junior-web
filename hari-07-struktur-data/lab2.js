import { BinarySearchTree } from "./structure.js";

import {
  folderSampel,
  cetakPohon,
  hitungNode,
  cariNode,
  grafKota,
  bfs,
  dfs,
  jarakTerpendek,
} from "./structure.js";

console.log("==============================================");
console.log("             UJI PRAKTIKUM LAB 2              ");
console.log("==============================================\n");

// -------------------------------------------------------------
// TUGAS 1: Tree Rekursif dan Struktur Folder
// -------------------------------------------------------------
console.log("--- 1. Testing Tree Rekursif & Folder ---");
console.log("Cetak Struktur Folder:");
cetakPohon(folderSampel);

console.log("\nTotal Node:", hitungNode(folderSampel)); // Expected: 6

console.log("Cari app.js:", cariNode(folderSampel, "app.js"));
// Expected: "proyek/js/app.js"

console.log("Cari css:", cariNode(folderSampel, "css"));
// Expected: "proyek/css"

console.log("Cari ghaib.js:", cariNode(folderSampel, "ghaib.js"));
// Expected: null

// -------------------------------------------------------------
// TUGAS 2: Binary Search Tree (BST)
// -------------------------------------------------------------
console.log("\n--- 2. Testing Binary Search Tree (BST) ---");
const bst = new BinarySearchTree();
const inputData = [50, 30, 70, 20, 40, 60, 80];

inputData.forEach((val) => bst.insert(val));

console.log("Input Data BST:", inputData);
console.log("Hasil inOrder() (Terurut):", bst.inOrder());
// Expected: [20, 30, 40, 50, 60, 70, 80]

console.log("Uji has(60):", bst.has(60)); // Expected: true
console.log("Uji has(65):", bst.has(65)); // Expected: false

// -------------------------------------------------------------
// TUGAS 3: Graph Jaringan 6 Kota, BFS, DFS, & Jarak Terpendek
// -------------------------------------------------------------
console.log("\n--- 3. Testing Graph (6 Kota) ---");
console.log("Urutan Penelusuran BFS dari Jakarta:", bfs(grafKota, "Jakarta"));
console.log("Urutan Penelusuran DFS dari Jakarta:", dfs(grafKota, "Jakarta"));

console.log("\nUji Jarak Terpendek (Jumlah Sisi):");
console.log(
  "Jakarta -> Bali:",
  jarakTerpendek(grafKota, "Jakarta", "Bali"),
  "sisi",
);
// Expected: 3 sisi (Jakarta -> Semarang/Yogyakarta -> Surabaya -> Bali)

console.log(
  "Jakarta -> Bandung:",
  jarakTerpendek(grafKota, "Jakarta", "Bandung"),
  "sisi",
);
// Expected: 1 sisi

console.log(
  "Bandung -> Bali:",
  jarakTerpendek(grafKota, "Bandung", "Bali"),
  "sisi",
);
// Expected: 3 sisi (Bandung -> Yogyakarta -> Surabaya -> Bali)

console.log("\n==============================================");
console.log("            UJI LAB 2 SELESAI                 ");
console.log("==============================================");
