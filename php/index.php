<?php
include_once 'app.config.php';
$host = DB_HOST;
$dbname = DB_NAME;
$password = DB_PASSWORD;
$user = DB_USER;
$dsn = "mysql:host=$host;dbname=$dbname";
$opt = array(
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
);

// Создаём объект pdo
$pdo = new PDO($dsn, $user, $password, $opt);

if($_SERVER['REQUEST_METHOD'] == 'GET') { 

$stmt = $pdo->query('SELECT * FROM Books');


$rows = $stmt->fetchAll();
// while ($row = $stmt->fetch())
// {
// 	echo '<pre>';
//     print_r($row);
//     echo '</pre>';
// }

 //print_r($rows);

exit(json_encode($rows));
}



