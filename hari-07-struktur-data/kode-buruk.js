const d = [80, 65, 90];
function f(a) {
  let s = 0;
  for (let i = 0; i < a.length; i++) {
    s = s + a[i];
  }
  return s / a.length;
}
function g(x) {
  if (x >= 85) {
    return "A";
  } else {
    if (x >= 70) {
      return "B";
    } else {
      if (x >= 55) {
        return "C";
      } else {
        return "D";
      }
    }
  }
}
const r = f(d);
if (r === 80) {
  console.log("bagus");
}

console.log(g(r));
