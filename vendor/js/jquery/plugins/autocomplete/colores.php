<?php
//header('Content-Type: application/json');
header('charset=utf8');

$datos = array();
$retorno = array();

if (isset($_GET['query'])){
    $j=0;
    $colores = array();
    
    $colores[0] = "Amarillo";
    $colores[1] = "Azul";
    $colores[2] = "Blanco";
    $colores[3] = "Marron";
    
    foreach ($colores as $i => $valor){
        if (stripos($valor, $_GET['query']) !== false){
            $datos[$j]["value"] = $colores[$i];
            $datos[$j]["data"] = $i;
            $j++;
        }
    }
}// fin if

$retorno["query"] = "Unit";
$retorno["suggestions"] = $datos;
echo json_encode($retorno);
?>