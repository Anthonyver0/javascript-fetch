<?php 
if(isset($_GET['cat'])) {
	if (($_GET['cat'] == "eq") || ($_GET['cat'] == "indiv")) {
		$server = "mysql:dbname=encuentros";
		$user = "root";
		$pass = "";
		$con = new PDO($server,$user,$pass,array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'UTF8\''));
		$result = array();

		$select = "SELECT * ";
		if ($_GET['cat'] == "eq") $from = "FROM equipos ";
		else if ($_GET['cat'] == "indiv") $from = "FROM individuales ";
		
		$consulta = $select.$from;
		
		$sen = $con->prepare($consulta);
		$sen->execute();

		while($row = $sen->fetch(PDO::FETCH_NAMED)){
			$result[] = $row['name'];
		}
		echo json_encode($result);
	}
	else {
		echo "El valor del parametro 'cat' no se admite (cat=".$_GET['cat'].")";
	}
}
else {
	echo "No has pasado el parametro 'cat'";
}
?>
