(function(){
    const chat = document.querySelector("#chat")
    const nick = document.querySelector("#nick")
    const teclado = document.querySelector("#teclado")
    const enviar = document.querySelector("#enviar")
    let refresco
    let ultimoMensaje = 0

    refresco = setInterval(recargarMensajes,1000)

    function recargarMensajes() {
        fetch('server/chat_select_get_xml.php?ultimo='+ultimoMensaje)
        .then(response=>response.text())
        .then(xmlCrudo=>{
            let parser = new DOMParser()
            let xml = parser.parseFromString(xmlCrudo,'text/xml')
            let mensajes = xml.querySelectorAll("mensaje")
            mensajes.forEach(msj=>{

                let id = msj.querySelector("id").textContent
                let nick = msj.querySelector("nick").textContent
                let texto = msj.querySelector("texto").textContent
                let instante = msj.querySelector("instante").textContent

                let newP = document.createElement("P")
                newP.innerHTML = nick + "<br>" + texto + "<br>" + instante
                newP.classList.add("mensaje")
                chat.append(newP)

                ultimoMensaje = id
            })
        })
    }

})()