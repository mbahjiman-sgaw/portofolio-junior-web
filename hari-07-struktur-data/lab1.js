// Uji coba LinkedList, addFirst, addLast, removeFirst, remove, toArray, find, peekFirst, size, isEmpty
import { LinkedList } from "./structure.js";

const listKosong = new LinkedList();
console.log("isEmpty():", listKosong.isEmpty()); // mengecek apakah kosong
console.log("size():", listKosong.size()); // mengecek ukuran
console.log("peekFirst():", listKosong.peekFirst()); // melihat elemen pertama
console.log("removeFirst():", listKosong.removeFirst()); // membuang elemen pertama
console.log("toArray():", listKosong.toArray()); // menampilkan isi list
console.log('addFirst("A"):', listKosong.addFirst("A")); // mengisi elemen pertama list dengan A
console.log("peekFirst():", listKosong.peekFirst()); // melihat elemen pertama
console.log("toArray after addFirst:", listKosong.toArray()); // mengecek isi list
console.log("removeFirst():", listKosong.removeFirst()); // menghapus elemen pertama
console.log("toArray after removeFirst:", listKosong.toArray()); // mengecek isi list
console.log("peekFirst():", listKosong.peekFirst()); // melihat elemen pertama lagi
console.log('addFirst("U"):', listKosong.addLast("U")); // mengisi elemen terakhir list dengan U
console.log("toArray after addLast:", listKosong.toArray()); // mengecek isi list, menampilkan isi list dimanapun lokasinya
console.log('addFirst("A"):', listKosong.addFirst("A")); // mengisi elemen pertama list dengan A
console.log('addLast("S"):', listKosong.addLast("S")); // mengisi elemen terakhir list dengan S
console.log('addFirst("S"):', listKosong.addFirst("S")); // mengisi elemen pertama list dengan S

console.log("toArray after add First dan addLast:", listKosong.toArray()); // mengecek isi list, menampilkan isi list dimanapun lokasinya

const ditemukan = listKosong.find((item) => item === "U");
console.log("Cari item:", ditemukan); // gak ada maka undefined kalau ada ditulis itemnya
listKosong.remove("S"); //hapus item langsung ke value, kasus ini di head
console.log("Hapus item:", listKosong.toArray()); //tampilkan isi list setelah dihapus
listKosong.remove("S"); //hapus item langsung ke value, kasus ini di tail
console.log("Hapus item:", listKosong.toArray());
listKosong.remove(" "); //hapus item blank
console.log("Hapus item:", listKosong.toArray());
