// structures.js
export class Stack {
  constructor() {
    this.items = []; // Kotak penyimpanan tumpukan di dalam array[cite: 5]
  }

  // Menaruh barang di tumpukan paling atas[cite: 5]
  push(item) {
    this.items.push(item);
  }

  // Mengambil dan menghapus barang dari tumpukan paling atas[cite: 5]
  pop() {
    return this.isEmpty() ? undefined : this.items.pop();
  }

  // Melihat barang yang ada di paling atas TANPA mengambilnya[cite: 5]
  peek() {
    return this.isEmpty() ? undefined : this.items[this.items.length - 1];
  }

  // Mengecek apakah tumpukan sedang kosong[cite: 5]
  isEmpty() {
    this.items.length === 0; // Fixed syntax check based on module logic
    return this.items.length === 0;
  }

  // Menghitung jumlah barang di tumpukan[cite: 6]
  size() {
    return this.items.length;
  }

  // Mengosongkan tumpukan[cite: 6]
  clear() {
    this.items = [];
  }
}

// Menggunakan versi Efisien O(1) dengan head dan tail!
export class Queue {
  constructor() {
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }

  // Masuk antrean dari belakang
  enqueue(item) {
    this.items[this.tail] = item;
    this.tail++;
  }

  // Orang paling depan selesai dan keluar antrean
  dequeue() {
    if (this.isEmpty()) return undefined;
    const item = this.items[this.head];
    delete this.items[this.head];
    this.head++;
    return item;
  }

  // Lihat siapa yang paling depan
  front() {
    return this.items[this.head];
  }

  // Apakah antrean kosong?
  isEmpty() {
    return this.tail === this.head;
  }

  // Berapa orang yang sedang mengantre?
  size() {
    return this.tail - this.head;
  }

  // Fitur Tambahan Tantangan Modul: Mengubah queue jadi Array aman tanpa merusak enkapsulasi
  toArray() {
    const arr = [];
    for (let i = this.head; i < this.tail; i++) {
      arr.push(this.items[i]);
    }
    return arr;
  }

  // Reset antrean
  clear() {
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }
}
