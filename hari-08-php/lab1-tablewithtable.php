<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <table border="1">
      <?php for ($row = 1; $row <= 10; $row++) { 
        echo " <tr>"; 
        for ($col = 1; $col <= 10; $col++) 
          { echo " <td>" . ($row * $col) . "</td>"; } 
        echo " </tr> "; } ?>
    </table>
  </body>
</html>