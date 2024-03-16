<?php

include('connection.php');

$title = $_POST['title'];
$description = $_POST['description'];

$query = $mysqli ->prepare('INSERT INTO news (title, description) VALUES (?,?)');

$query ->bind_param('ss', $title, $description);

if($query ->execute()){
    $response['message'] = "News  added";
} else {
    $response['message'] = "Error, News not added";
}

echo json_encode($response);

$mysqli ->close();
