console.log(" ===== TEBAK ANGKA ===== ");

let angka = Math.floor(Math.random() * 100) + 1; //keluarkan angka random
let num;

do {
  num = Number(prompt("Masukan angka 1 sd 100: "));
  if (num < angka) {
    alert("Kurang gede"); //pake alert biar muncul di notification chrome
  } else if (num > angka) {
    alert("Kegedean");
  } else {
    alert("Pas");
  }
} while (num !== angka);
