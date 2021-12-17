<?php 
$DEPURACION = false;
if ($DEPURACION) echo "<html><head></head><body>";
if(isset($_POST['cat']) && isset($_POST['riv1']) && isset($_POST['riv2'])) {
		$server = "mysql:dbname=encuentros";
		$user = "root";
		$pass = "";
		$con = new PDO($server,$user,$pass,array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'UTF8\''));
		
		$consulta = "INSERT INTO encuentros(cat,choice1,choice2) VALUES (?,?,?)";
		$sen = $con->prepare($consulta);
		$sen->bindParam(1,$_POST['cat']);
		$sen->bindParam(2,$_POST['riv1']);
		$sen->bindParam(3,$_POST['riv2']);
		$sen->execute();

		// creamos el documento XML	
		$xml = new DOMDocument('1.0', 'UTF-8');
		$root = $xml->appendChild($xml->createElement("listado"));
		if (!$DEPURACION) header('Content-type: text/xml');

		$consulta = "SELECT * FROM encuentros";
		$sen = $con->prepare($consulta);
		$sen->execute();
		
		while($row = $sen->fetch(PDO::FETCH_NAMED)){
			$node = $xml->createElement("encuentro");
			$fila = $root->appendChild($node);
			foreach ($row as $columna => $valor) {
				$node = $xml->createElement($columna,$valor);
				$newnode = $fila->appendChild($node);
			}
		}
		if ($DEPURACION) echo "<h1>Resultados de la consulta</h1>";
		if ($DEPURACION) echo $consulta;
		if ($DEPURACION) echo "<h1>XML generado</h1>";
		echo $xml->saveXML();
}
else {
	echo "No has pasado los parametros correctos. Debes pasar (cat,riv1,riv2)";
}
if ($DEPURACION) echo "</body></html>";
?>
