/**
 * Lab 4: Code Refactoring, Clean Code, and Testing
 *
 * Bad Practices Fixed:
 * 1. Renamed non-descriptive variables/functions (d, f, g, r, h, k -> studentScores, calculateAverage, etc.)
 * 2. Replaced `var` with `const` and `let` (ES6+)
 * 3. Replaced magic number (0.11) with named constant `VAT_RATE`
 * 4. Flattened deeply nested if-else structures using guard clauses
 * 5. Applied DRY principle by eliminating duplicate tax functions `h()` and `k()`
 * 6. Used strict equality (`===`) instead of loose equality (`==`)
 */

// Constant for tax rate (eliminates Magic Number 0.11)
const VAT_RATE = 0.11;

/**
 * Calculates the average value of a numeric array using Array.prototype.reduce.
 * Replaces function `f(a)`.
 *
 * @param {number[]} numbers - Array of scores
 * @returns {number} Average of numbers
 */
function calculateAverage(numbers = []) {
  if (!Array.isArray(numbers) || numbers.length === 0) return 0;
  const total = numbers.reduce((sum, value) => sum + value, 0);
  return total / numbers.length;
}

/**
 * Determines grade classification based on score.
 * Replaces function `g(x)` with clean guard clauses.
 *
 * @param {number} score - Student score
 * @returns {string} Grade letter ('A', 'B', 'C', or 'D')
 */
function getGrade(score) {
  if (score >= 85) return "A";
  if (score >= 70) return "B";
  if (score >= 55) return "C";
  return "D";
}

/**
 * Calculates total price including VAT tax.
 * Replaces duplicate functions `h(n)` and `k(n)` (DRY Principle).
 *
 * @param {number} amount - Base price amount
 * @param {number} taxRate - Tax multiplier
 * @returns {number} Total amount including tax
 */
function calculateTotalWithTax(amount, taxRate = VAT_RATE) {
  if (typeof amount !== "number" || amount < 0) {
    throw new TypeError("Amount must be a non-negative number");
  }
  return amount + amount * taxRate;
}

/**
 * Evaluates performance status based on standard benchmark score.
 * Replaces loose equality `if (r == 80)`.
 *
 * @param {number} averageScore - Evaluated score
 * @param {number} targetScore - Target benchmark score (default: 80)
 * @returns {string} Status message ('bagus' or 'perlu ditingkatkan')
 */
function evaluatePerformance(averageScore, targetScore = 80) {
  return averageScore === targetScore ? "bagus" : "perlu ditingkatkan";
}
//panggil fungsi2 di atas di bawah ini untuk menampilkan hasilnya di console.log

// Data Sampel (sebelumnya: var d = [80,65,90])
const studentScores = [80, 65, 90];

// 1. Hitung Rata-rata
const averageScore = calculateAverage(studentScores);
console.log("--- 1. Perhitungan Rata-rata ---");
console.log("Data Nilai:", studentScores);
console.log("Nilai Rata-rata (f -> calculateAverage):", averageScore);
// Output: 78.33333333333333

// 2. Classify Grade
console.log("\n--- 2. Klasifikasi Grade ---");
const grade = getGrade(averageScore);
console.log(`Grade untuk Rata-rata (${averageScore.toFixed(2)}):`, grade);
// Output: 'B'

// 3. Evaluasi Performa
console.log("\n--- 3. Evaluasi Performa ---");
const performanceStatus = evaluatePerformance(averageScore);
console.log("Status Performa Evaluasi:", performanceStatus);
// Output: 'perlu ditingkatkan' (karena 78.33 !== 80)

console.log("Status Jika Nilai Pas 80:", evaluatePerformance(80));
// Output: 'bagus'

// 4. Kalkulasi Pajak (DRY Principle)
console.log("\n--- 4. Perhitungan Pajak (Prinsip DRY) ---");
const price = 100000;
const priceWithTax = calculateTotalWithTax(price);
console.log(`Harga Awal: Rp${price.toLocaleString()}`);
console.log(
  `Harga + PPN (${VAT_RATE * 100}%): Rp${priceWithTax.toLocaleString()}`,
);
// Output: Rp111,000
