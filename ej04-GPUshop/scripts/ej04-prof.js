//NOMBRE DEL ALUMNO: [pon aquí tu nombre]

//RESOLUCIÓN DEL EJERCICIO

(function () {
    //todo tu codigo aqui
    const buscador = document.querySelector("#buscador")
    const tablaResultados = document.querySelector("#tableResultados>tbody")
    const tablaSeleccionados = document.querySelector("#tableSeleccionados>tbody")
    const botonBorrar = document.querySelector("#inputBorrarTodos")

    buscador.value = ""
    buscador.focus()

    buscador.addEventListener("keyup",function(ev){
        if (ev.key == "Enter") {
            //solicitar resultados de búsqueda al PHP del servidor
            
        }
    })
})();
