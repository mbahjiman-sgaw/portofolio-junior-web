/**
 * Stack (Tumpukan) - LIFO
 */
export class Stack {
  #items = [];

  push(item) {
    this.#items.push(item);
  }

  pop() {
    return this.isEmpty() ? undefined : this.#items.pop();
  }

  peek() {
    return this.isEmpty() ? undefined : this.#items[this.#items.length - 1];
  }

  isEmpty() {
    return this.#items.length === 0;
  }

  size() {
    return this.#items.length;
  }

  clear() {
    this.#items = [];
  }
}

/**
 * Queue Berbasis Array/Object - FIFO O(1)
 */
export class Queue {
  #items = {};
  #head = 0;
  #tail = 0;

  enqueue(item) {
    this.#items[this.#tail] = item;
    this.#tail++;
  }

  dequeue() {
    if (this.isEmpty()) return undefined;
    const item = this.#items[this.#head];
    delete this.#items[this.#head];
    this.#head++;
    return item;
  }

  front() {
    return this.#items[this.#head];
  }

  isEmpty() {
    return this.#tail === this.#head;
  }

  size() {
    return this.#tail - this.#head;
  }

  toArray() {
    const arr = [];
    for (let i = this.#head; i < this.#tail; i++) {
      arr.push(this.#items[i]);
    }
    return arr;
  }

  clear() {
    this.#items = {};
    this.#head = 0;
    this.#tail = 0;
  }
}

/**
 * Node untuk Singly Linked List
 */
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

/**
 * Singly Linked List dengan Head & Tail
 */
export class LinkedList {
  #head = null;
  #tail = null;
  #size = 0;

  addFirst(data) {
    const node = new Node(data);
    node.next = this.#head;
    this.#head = node;
    if (this.#tail === null) this.#tail = node;
    this.#size++;
  }

  addLast(data) {
    const node = new Node(data);
    if (this.#tail === null) {
      this.#head = node;
    } else {
      this.#tail.next = node;
    }
    this.#tail = node;
    this.#size++;
  }

  removeFirst() {
    if (this.#head === null) return undefined;
    const data = this.#head.data;
    this.#head = this.#head.next;
    if (this.#head === null) this.#tail = null;
    this.#size--;
    return data;
  }

  remove(data) {
    if (this.#head === null) return false;

    // Kasus 1: Menghapus Node Kepala (Head)
    if (this.#head.data === data) {
      this.removeFirst();
      return true;
    }

    // Kasus 2: Menghapus Node Tengah atau Ekor (Tail)
    let saatIni = this.#head;
    while (saatIni.next !== null && saatIni.next.data !== data) {
      saatIni = saatIni.next;
    }

    if (saatIni.next !== null) {
      if (saatIni.next === this.#tail) {
        this.#tail = saatIni; // Update tail jika menghapus ekor
      }
      saatIni.next = saatIni.next.next; // Bypass node yang dihapus
      this.#size--;
      return true;
    }

    // Kasus 3: Data tidak ditemukan
    return false;
  }

  peekFirst() {
    return this.#head === null ? undefined : this.#head.data;
  }

  find(predikat) {
    let saatIni = this.#head;
    while (saatIni !== null) {
      if (predikat(saatIni.data)) return saatIni.data;
      saatIni = saatIni.next;
    }
    return undefined;
  }

  size() {
    return this.#size;
  }

  isEmpty() {
    return this.#size === 0;
  }

  toArray() {
    const hasil = [];
    let saatIni = this.#head;
    while (saatIni !== null) {
      hasil.push(saatIni.data);
      saatIni = saatIni.next;
    }
    return hasil;
  }
}

/**
 * Queue berbasis Linked List: semua operasi O(1) dan detail internal tersembunyi
 */
export class LinkedQueue {
  #daftar = new LinkedList();

  enqueue(item) {
    this.#daftar.addLast(item);
  }

  dequeue() {
    return this.#daftar.removeFirst();
  }

  front() {
    return this.#daftar.peekFirst();
  }

  isEmpty() {
    return this.#daftar.isEmpty();
  }

  size() {
    return this.#daftar.size();
  }

  toArray() {
    return this.#daftar.toArray();
  }
}

/**
 * Node Binary Search Tree
 */
class BstNode {
  constructor(nilai) {
    this.nilai = nilai;
    this.kiri = null;
    this.kanan = null;
  }
}

/**
 * Binary Search Tree (BST)
 */
export class BinarySearchTree {
  #akar = null;

  insert(nilai) {
    const baru = new BstNode(nilai);
    if (this.#akar === null) {
      this.#akar = baru;
      return;
    }

    let saatIni = this.#akar;
    while (true) {
      if (nilai < saatIni.nilai) {
        if (saatIni.kiri === null) {
          saatIni.kiri = baru;
          return;
        }
        saatIni = saatIni.kiri;
      } else {
        if (saatIni.kanan === null) {
          saatIni.kanan = baru;
          return;
        }
        saatIni = saatIni.kanan;
      }
    }
  }

  has(nilai) {
    let saatIni = this.#akar;
    while (saatIni !== null) {
      if (nilai === saatIni.nilai) return true;
      saatIni = nilai < saatIni.nilai ? saatIni.kiri : saatIni.kanan;
    }
    return false;
  }

  inOrder() {
    const hasil = [];
    const telusuri = (node) => {
      if (node === null) return;
      telusuri(node.kiri);
      hasil.push(node.nilai);
      telusuri(node.kanan);
    };
    telusuri(this.#akar);
    return hasil;
  }
}

const folder = {
  nama: "proyek",
  anak: [
    { nama: "css", anak: [] },
    { nama: "js", anak: [{ nama: "app.js", anak: [] }] },
  ],
};

export function cetakPohon(node, tingkat = 0) {
  console.log(" ".repeat(tingkat * 2) + node.nama);
  for (const anak of node.anak) {
    cetakPohon(anak, tingkat + 1);
  }
}
export function hitungNode(node) {
  let total = 1;
  for (const anak of node.anak) total += hitungNode(anak);
  return total;
}

/**
 * BFS (Breadth-First Search) menggunakan Queue
 */
export function bfs(graf, mulai) {
  const dikunjungi = new Set([mulai]);
  const antrean = [mulai];
  const urutan = [];

  while (antrean.length > 0) {
    const simpul = antrean.shift();
    urutan.push(simpul);

    for (const tetangga of graf[simpul] || []) {
      if (!dikunjungi.has(tetangga)) {
        dikunjungi.add(tetangga);
        antrean.push(tetangga);
      }
    }
  }

  return urutan;
}

/**
 * DFS (Depth-First Search) menggunakan Rekursi
 */
export function dfs(graf, simpul, dikunjungi = new Set()) {
  dikunjungi.add(simpul);

  for (const tetangga of graf[simpul] || []) {
    if (!dikunjungi.has(tetangga)) {
      dfs(graf, tetangga, dikunjungi);
    }
  }

  return [...dikunjungi];
}

/**
 * Menghitung jarak terpendek (jumlah sisi/langkah) antara asal dan tujuan menggunakan BFS
 */
export function jarakTerpendek(graf, asal, tujuan) {
  if (asal === tujuan) return 0;

  const dikunjungi = new Set([asal]);
  const antrean = [{ simpul: asal, jarak: 0 }];

  while (antrean.length > 0) {
    const { simpul, jarak } = antrean.shift();

    for (const tetangga of graf[simpul] || []) {
      if (tetangga === tujuan) {
        return jarak + 1;
      }

      if (!dikunjungi.has(tetangga)) {
        dikunjungi.add(tetangga);
        antrean.push({ simpul: tetangga, jarak: jarak + 1 });
      }
    }
  }

  return -1; // Tidak terhubung
}

export function cariNode(node, namaTarget, jalurSaatIni = "") {
  const jalurBaru = jalurSaatIni ? `${jalurSaatIni}/${node.nama}` : node.nama;

  if (node.nama === namaTarget) {
    return jalurBaru;
  }

  for (const anak of node.anak) {
    const hasil = cariNode(anak, namaTarget, jalurBaru);
    if (hasil) return hasil;
  }

  return null;
}

export const grafKota = {
  Jakarta: ["Bandung", "Semarang"],
  Bandung: ["Jakarta", "Yogyakarta"],
  Semarang: ["Jakarta", "Yogyakarta", "Surabaya"],
  Yogyakarta: ["Bandung", "Semarang", "Surabaya"],
  Surabaya: ["Semarang", "Yogyakarta", "Bali"],
  Bali: ["Surabaya"],
};

export const folderSampel = {
  nama: "proyek",
  anak: [
    { nama: "css", anak: [] },
    {
      nama: "js",
      anak: [
        { nama: "app.js", anak: [] },
        { nama: "structures.js", anak: [] },
      ],
    },
    { nama: "index.html", anak: [] },
  ],
};
