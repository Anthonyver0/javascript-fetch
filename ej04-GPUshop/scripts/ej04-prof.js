//NOMBRE DEL ALUMNO: [pon aquí tu nombre]

//RESOLUCIÓN DEL EJERCICIO

(function () {
    //todo tu codigo aqui
    const buscador = document.querySelector("#buscador")
    const tablaResultados = document.querySelector("#tableResultados>tbody")
    const tablaSeleccionados = document.querySelector("#tableSeleccionados>tbody")
    const pieContadores = document.querySelector("#tableSeleccionados>tfoot>tr")
    const botonBorrar = document.querySelector("#inputBorrarTodos")

    buscador.value = ""
    buscador.focus()

    buscador.addEventListener("keyup",function(ev){
        if (ev.key == "Enter") {
            //solicitar resultados de búsqueda al PHP del servidor
            fetch('server/ej04.php?pattern='+this.value.trim())
            .then(resp=>resp.json())
            .then(json=>{
                tablaResultados.innerHTML = ""
                json.forEach(elem=>{
                    let newTR = tablaResultados.insertRow()
                    let newTD1 = newTR.insertCell()
                    let newTD2 = newTR.insertCell()
                    let newTD3 = newTR.insertCell()
                    let newBtn = document.createElement("button")
                    newTD1.textContent = elem.titulo
                    newTD2.textContent = elem.precio
                    newBtn.textContent = '+'
                    newTD3.append(newBtn)
                })
            })
        }
    })

    tablaResultados.addEventListener("click",function(ev){
        if (ev.target.nodeName.toLowerCase() == "button") {
            let newTR = tablaSeleccionados.insertRow()
            let newTD1 = newTR.insertCell()
            let newTD2 = newTR.insertCell()
            let newTD3 = newTR.insertCell()
            let newBtn = document.createElement("button")
            newTD1.textContent = ev.target.parentNode.parentNode.children[0].textContent
            newTD2.textContent = ev.target.parentNode.parentNode.children[1].textContent
            newBtn.textContent = 'X'
            newTD3.append(newBtn)
            actualizarContadores()
        }
    })

    tablaSeleccionados.addEventListener("click",function(ev){
        if (ev.target.nodeName.toLowerCase() == "button") {
            ev.target.parentNode.parentNode.remove()
            actualizarContadores()
        }
    })

    botonBorrar.addEventListener("click",function(ev){
        tablaSeleccionados.innerHTML = ""
        actualizarContadores()
    })

    function actualizarContadores(){
        let filas = tablaSeleccionados.querySelectorAll("tr")
        let numArticulos = 0
        let sumPrecios = 0
        filas.forEach(fila=>{
            numArticulos++
            sumPrecios += parseInt(fila.children[1].textContent)
        })
        console.log(numArticulos)
        console.log(sumPrecios)
        pieContadores.children[0].textContent = numArticulos + " articulo"
        if (numArticulos != 1) pieContadores.children[0].textContent += "s"
        pieContadores.children[1].textContent = sumPrecios + " €"
    }

})();
