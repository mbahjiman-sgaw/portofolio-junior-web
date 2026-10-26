import { Stack } from "./structures.js";

export function kurungSeimbang(teks) {
  const pasangan = { ")": "(", "]": "[", "}": "{" };
  const tumpukan = new Stack();

  for (const karakter of teks) {
    if ("([{".includes(karakter)) {
      tumpukan.push(karakter);
    } else if (karakter in pasangan) {
      if (tumpukan.isEmpty() || tumpukan.pop() !== pasangan[karakter]) {
        return false; // Kurung tutup tidak cocok atau tidak ada pasangannya!
      }
    }
  }
  return tumpukan.isEmpty();
}

console.log("=== Uji Coba push, pop, peek ===");
const stackJersey = new Stack();
stackJersey.push("Jersey Home");
stackJersey.push("Jersey Away");
stackJersey.push("Jersey Third");

console.log(stackJersey.peek());
stackJersey.pop();
console.log(stackJersey.peek());
stackJersey.pop();
console.log(stackJersey.peek());
stackJersey.pop();
console.log(stackJersey.peek());

console.log("(a+b)*[c-d]  :", kurungSeimbang("(a+b)*[c-d]")); // true
console.log("(a+b]        :", kurungSeimbang("(a+b]")); // false
console.log("((a).        :", kurungSeimbang("((a).")); // false
console.log("Teks Kosong  :", kurungSeimbang("")); // true

console.log("=== Membalik String & Cek Palindrom dengan Stack ===");
function balikKata(kata) {
  const s = new Stack();
  for (const huruf of kata) s.push(huruf);

  let hasil = "";
  while (!s.isEmpty()) {
    hasil += s.pop();
  }
  return hasil;
}

function cekPalindrom(kata) {
  const kataBersih = kata.toLowerCase().replace(/[^a-z0-9]/g, "");
  return kataBersih === balikKata(kataBersih);
}

const kataTest = "a man, a plan, a canal: Panama";
console.log(`${kataTest} dibalik jadi ->`, balikKata(kataTest));
console.log(`Apakah ${kataTest} palindrom? ->`, cekPalindrom(kataTest)); // true/false

