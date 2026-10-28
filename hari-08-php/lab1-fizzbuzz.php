<?php
for ($angka = 1; $angka <= 30; $angka++) {
  if ($angka % 3 == 0 && $angka % 5 == 0) {
    echo "$angka is a FizzBuzz";
    echo "\n";
  } else if ($angka % 5 == 0) {
    echo "$angka is a Buzz";
    echo "\n";
  } else if ($angka % 3 == 0) {
    echo "$angka is a Fizz";
    echo "\n";
  } else {
    echo "$angka is nothing";
    echo "\n";
  }
}
