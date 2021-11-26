(function(){
    const selectProvincias = document.querySelector("#provincias")
    const selectMunicipios = document.querySelector("#municipios")

    poblarProvincias()
    escucharCambioProvincia()


    function poblarProvincias() {
        fetch('server/cargaProvinciasXML.php') //solicitar un recurso de la red
        .then(
            //código que se va a ejecutar cuando llegue la respuesta de mi solicitud
            respuesta=>{
                return respuesta.text() //solicitar la extracción del texto de la información útil
            }
        ).then(
            //código que se va a ejecutar cuando se complete la extracción del texto de la información
            xmlText=>{
                //console.log(xmlText)
                let parser = new DOMParser();
                let xmlDoc = parser.parseFromString(xmlText,"text/xml")
                let provincias = xmlDoc.querySelectorAll("provincia")
                /* provincia
                    +---codigo
                    +---nombre
                */
               provincias.forEach(prov=>{
                   //extraer de "prov" el código y el nombre de la provincia
                   let codProv = prov.querySelector("codigo").textContent
                        //let codProv = prov.children[0].textContent
                   let nomProv = prov.querySelector("nombre").textContent
                        //let nomProv = prov.children[1].textContent

                   let newOption = document.createElement("option")
                   newOption.textContent = nomProv
                   newOption.value = codProv
                   selectProvincias.append(newOption)
               })

            }
        ).catch(
            error=>{
                console.error("todo fatal: " + error)
            }
        )
    }

    function escucharCambioProvincia() {
        selectProvincias.addEventListener("change",function(){
            //se inicia una 2ª solicitud HTTP al servidor
            //para obtener la lista de municipios de la provincia elegida
            let codProvElegida = this.value
            //console.log(this.value)
            const params = new URLSearchParams("provincia="+codProvElegida) //provincia=04
            const options = {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                body: params // body data type must match "Content-Type" header
            }
            fetch('server/cargaMunicipiosXML.php',options)
            .then(
                respuesta=>{
                    return respuesta.text()
                }
            ).then(
                datosCrudos=>{
                    console.log(datosCrudos)
                    let parser = new DOMParser();
                    let xmlDoc = parser.parseFromString(datosCrudos,"text/xml")
                    let municipios = xmlDoc.querySelectorAll("municipio")
                    //vaciar primero la lista de municipios
                    selectMunicipios.innerHTML = '<option value="0">(Elige municipio)</option>'
                    //rellenar el SELECT de municipios
                    municipios.forEach(muni=>{
                        //extraer de "muni" el código y el nombre de la provincia
                        let codMuni = muni.querySelector("codigo").textContent
                        let nomMuni = muni.querySelector("nombre").textContent
     
                        let newOption = document.createElement("option")
                        newOption.textContent = nomMuni
                        newOption.value = codMuni
                        selectMunicipios.append(newOption)
                    })
                }
            )
        })
    }





















/*
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
*/
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
