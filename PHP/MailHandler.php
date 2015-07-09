<?php
$to = $_POST['to'];
$subject = "You've got mail";
$message = $_POST['message'];

// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

mail($to,$subject,$message,$headers);
?>