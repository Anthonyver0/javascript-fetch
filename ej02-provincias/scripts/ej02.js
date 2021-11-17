const selectProvincias = document.querySelector("#provincias")
const selectMunicipios = document.querySelector("#municipios")

for (let i in provincias) {
    //console.log(`La provincia con clave ${i} es ${provincias[i]}`)
    let nuevoOption = document.createElement("OPTION")
    nuevoOption.textContent = provincias[i]
    nuevoOption.value = i
    selectProvincias.append(nuevoOption)
} 

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
