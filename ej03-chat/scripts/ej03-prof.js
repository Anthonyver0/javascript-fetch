(function(){
    const chat = document.querySelector("#chat")
    const nick = document.querySelector("#nick")
    const teclado = document.querySelector("#teclado")
    const enviar = document.querySelector("#enviar")
    let refresco
    let ultimoMensaje = 0

    refresco = setInterval(recargarMensajes,1000)

    teclado.addEventListener('keyup',function(ev){
        if (ev.key == "Enter") {
            insertarMensaje()
        }
    })

    enviar.addEventListener("click",function(ev){
        insertarMensaje()
    })

    function insertarMensaje(){
        if (nick.value.trim().length && teclado.value.trim().length) {
            let params = new URLSearchParams(`nick=${nick.value.trim()}&texto=${teclado.value.trim()}`)
            //let params = new URLSearchParams("nick="+nick.value.trim()+"&texto="+teclado.value.trim())
            let options = {
                method: "POST",
                body: params
            }
            fetch('server/chat_insert_post.php',options)
            //vaciar el INPUT teclado
            teclado.value = ""
        }
    }

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
                //bajar el scroll del chat hasta abajo para que se vean los nuevos
                chat.scrollTop = chat.scrollHeight
            })
        })
    }


})()