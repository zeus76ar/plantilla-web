<?php
$retorno = array();

$retorno['error'] = '';

if (count($_FILES) < 1){
    $retorno['error'] = 'No se envio algun archivo.';
}

echo json_encode($retorno);
?>