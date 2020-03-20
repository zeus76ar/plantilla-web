<?php
$continuar=false;
$segundos=60 * 10;

if (isset($_POST['ts']) && isset($_COOKIE['token'])) $continuar=true;
?>