<?php
// debug_nested.php - Testing Xdebug with Nested Loops

$rows = 3;
$cols = 3;
$matrix = [];

for ($i = 0; $i < $rows; $i++) {
  for ($j = 0; $j < $cols; $j++) {
    // SET BREAKPOINT ON THE LINE BELOW (Red Dot)
    $val = ($i + 1) * ($j + 1);
    $matrix[$i][$j] = $val;
  }
}

echo "Done building matrix!";
