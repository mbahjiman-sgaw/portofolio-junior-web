<?php

$input = (int)readline("Masukan nilai: ");

$message = match (true) {
  $input >= 80 => 'A',
  $input >= 65 => 'B',
  $input >= 55 => 'C',
  default => 'D',
};
echo "Nilai anda $message";
