<?php
$ct = mktime();
$token=md5('safe form'.$ct);

setcookie('token', $token, 0, '/');

echo $ct;
?>