console.log("(a+b)*[c-d]  :", kurungSeimbang('(a+b)*[c-d]')); // true
console.log("(a+b]        :", kurungSeimbang('(a+b]'));       // false
console.log("((a).        :", kurungSeimbang('((a).'));       // false
console.log("Teks Kosong  :", kurungSeimbang(''));            // true