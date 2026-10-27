import { LinkedQueue } from "./structure.js";

console.log(
  "=== UJI PERFORMA: QUEUE ARRAY vs LINKED QUEUE (100.000 Elemen) ===\n",
);

const JUMLAH_DATA = 100_000;

// -------------------------------------------------------------
// 1. Pengujian Queue Berbasis Array (Menggunakan shift()) - O(n)
// -------------------------------------------------------------
const arrayQueue = [];

console.time("1. Array Queue (enqueue + shift)");

// Enqueue 100.000 data
for (let i = 0; i < JUMLAH_DATA; i++) {
  arrayQueue.push(i);
}

// Dequeue 100.000 data menggunakan shift()
for (let i = 0; i < JUMLAH_DATA; i++) {
  arrayQueue.shift();
}

console.timeEnd("1. Array Queue (enqueue + shift)");

// -------------------------------------------------------------
// 2. Pengujian LinkedQueue Berbasis Linked List - O(1)
// -------------------------------------------------------------
const linkedQueue = new LinkedQueue();

console.time("2. LinkedQueue (enqueue + dequeue)");

// Enqueue 100.000 data
for (let i = 0; i < JUMLAH_DATA; i++) {
  linkedQueue.enqueue(i);
}

// Dequeue 100.000 data
for (let i = 0; i < JUMLAH_DATA; i++) {
  linkedQueue.dequeue();
}

console.timeEnd("2. LinkedQueue (enqueue + dequeue)");

console.log("\n=== UJI PERFORMA SELESAI ===");
