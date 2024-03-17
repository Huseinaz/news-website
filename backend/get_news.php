<?php

include('connection.php');

$news_id = $_GET['id'];

$query = $mysqli ->prepare('SELECT * FROM news WHERE id = ?');

$query ->bind_param('i', $news_id);

$query ->execute();

$query ->store_result();

$query ->bind_result($id, $title, $description);

$response = [];

while ($query ->fetch()) {
    $news = [
        'id' => $id,
        'title' => $title,
        'description' => $description
    ];
    $response[] = $news;
}

echo json_encode($response);

$mysqli ->close();