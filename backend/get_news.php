<?php

include('connection.php');

$query = $mysqli ->prepare('SELECT * FROM news');

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