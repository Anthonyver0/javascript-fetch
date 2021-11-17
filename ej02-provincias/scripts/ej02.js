(function(){
    console.log("empieza ejecución del ej02")
    fetch("server/cargaProvinciasXML.php").then(
        function(response){
            console.table(response)
        }
    )
    console.log("hola")
})()
