(function(){
    const selectProvincias = document.querySelector("#provincias")
    const selectMunicipios = document.querySelector("#municipios")

    poblarProvincias()
    escucharCambioProvincia()

    function poblarProvincias() {
        fetch("server/cargaProvinciasXML.php")
        .then(
            function(response){
                return response.text()
            })
        .then(
            function(text) {
                //console.log(text) //TESTING: borrar luego
                let parser = new DOMParser();
                let xmlDoc = parser.parseFromString(text,"text/xml")
                let provincias = xmlDoc.querySelectorAll("provincia")
                console.log(`Número de provincias: ${provincias.length}`) //TESTING: borrar luego
                provincias.forEach(prov=>{
                    //let codigo = prov.children[0].textContent
                    let codigo = prov.querySelector("codigo").textContent
                    //let nombre = prov.children[1].textContent
                    let nombre = prov.querySelector("nombre").textContent
                    console.log(`Nombre: ${nombre} y codigo: ${codigo}`) //TESTING: borrar luego
                    let nuevoOption = document.createElement("OPTION")
                    nuevoOption.value = codigo
                    nuevoOption.textContent = nombre
                    selectProvincias.append(nuevoOption)
                })
            }
        ) //fin del fetch
    } //fin de la función poblarProvincias

    function escucharCambioProvincia() {
        selectProvincias.addEventListener("change", function(){
            let codProvElegida = this.value
            console.log("Has elegido la provincia con código " + codProvElegida)
        })
    }

})()








/*

selectProvincias.addEventListener(
    "change",
    function() {
        let provinciaElegida = this.children[this.selectedIndex].value
        //recuperar todos los municipios de la provincia seleccionada
        selectMunicipios.innerHTML = "<option value='0'>(Elige provincia)</option>"

        for (let i in municipios[provinciaElegida]) {
            let nuevoOption = document.createElement("OPTION")
            nuevoOption.textContent = municipios[provinciaElegida][i]
            nuevoOption.value = i
            selectMunicipios.append(nuevoOption)
        }
    }
)
*/


/*
   const params = new URLSearchParams("modo=1&length=5")
    const opciones = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: params // body data type must match "Content-Type" header
    }
    fetch('loadRecords.php',opciones)
        .then(function(respuesta){
            //llega del servidor texto plano
            return respuesta.json()
        })
        .then(function(json){
            //console.log("Respuesta ya en formato JSON: " + json)
            json.forEach(element => {
                console.log("Elemento individual: " + element)
            })
        })
*/
