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

$method = $_SERVER['REQUEST_METHOD'];

$url = $_SERVER['REQUEST_URI'];

$values = $_REQUEST;

if($method == 'GET') { 

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

else if ($method == 'PATCH' || $method == 'PUT')  {

$stmt = $pdo->prepare('UPDATE Books SET title = :title WHERE id = :id');

$put = json_decode(file_get_contents('php://input'), true); 


//$data = array('id' => '', 'title' => 'Название книги', 'author' => 'Имя автора', 'year' => '2005', 'pages' => 350);

//$result = array_merge($data, $put);

$stmt->execute(array('id' => $put['id'], 'title' => $put['title']));

$response['error'] = 0;

$response['msg'] = 'Данные успешно изменены!';

$response['t'] = $put['title'];

exit(json_encode($response));

}

else if ($method == 'POST')  { 

$stmt = $pdo->prepare('INSERT INTO Books (title, author, pages, year) VALUES(:title, :author, :pages, :year)');

$post = json_decode(file_get_contents('php://input'), true); 

$data = array('title' => 'Название книги', 'author' => 'Имя автора', 'year' => '2005', 'pages' => 350);

$result = array_merge($data, $post);

$stmt->execute($result);

$response['error'] = 0;

$response['msg'] = 'Новая строка успешно добавлена!';

$response['t'] = $put->title;

exit(json_encode($post));

}


else if ($method == 'DELETE')  { 

$stmt = $pdo->prepare('DELETE FROM Books WHERE id = :id');

$delete = json_decode(file_get_contents('php://input')); 

//$response = $_POST;
// Забираем id из строки
preg_match('|\d+|', $url, $id);
//print_r($id[0]);  

//exit(json_encode($id[0]));

$stmt->bindParam(':id', $id[0]);

$stmt->execute();

$response['error'] = 0;

$response['msg'] = 'Запись успешно удалена!';

//$response['id'] = $delete['id'];

exit(json_encode($id[0]));

}
