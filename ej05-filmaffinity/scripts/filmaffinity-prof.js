(function(){

    const buscador = document.querySelector('#buscador')
    const divSugerencias = document.querySelector('#divSugerencias')
    const divResultados = document.querySelector('#divResultados')
    const resultados = document.querySelectorAll('ul.listaResultados')

    function mostrarSugerenciasPorPatron(patron) {
        //1º vaciamos el DIV de sugerencias, esto se podría hacer fuera de la función antes de llamarla
        divSugerencias.innerHTML = ''
        //2º rellenamos el DIV con los datos que nos devuelve el servidor
        fetch('server/search.php?p=' + patron)
        .then(resp=>resp.json())
        .then(json=>{
            json.forEach(elem=>{
                let newP = document.createElement('P')
                newP.textContent = elem.texto
                divSugerencias.append(newP)
            })
        })
    }

    function mostrarResultadosPorPatron(patron) {
       //1º vaciamos las listas de resultados, esto se podría hacer fuera de la función antes de llamarla
       resultados.forEach(lista => lista.innerHTML = '')
       //2º rellenamos las listas con los datos que nos devuelve el servidor
       fetch('server/search.php?p=' + patron)
       .then(resp=>resp.json())
       .then(json=>{
           json.forEach(elem=>{
               let newLI = document.createElement('LI')
               newLI.textContent = elem.texto
               newLI.dataset.id = elem.id
               newLI.dataset.tipo = elem.tipo
               if (elem.tipo == 'tit') resultados[0].append(newLI)
               else if (elem.tipo == 'dir') resultados[1].append(newLI)
               else if (elem.tipo == 'act') resultados[2].append(newLI)
           })
       })
    }

    function mostrarResultadosPorId(id,tipo) {
        //1º vaciamos las listas de resultados, esto se podría hacer fuera de la función antes de llamarla
        resultados.forEach(lista => lista.innerHTML = '')
        //2º rellenamos las listas con los datos que nos devuelve el servidor
        fetch('server/search.php?id=' + id + '&t=' + tipo)
        .then(resp=>resp.text())
        .then(xmlCrudo=>{
            let parser = new DOMParser()
            let xml = parser.parseFromString(xmlCrudo,'text/xml')
            //recorrer los resultados del XML y analizar si son películas, directores o actores
            xml.querySelectorAll('resultado').forEach(resul=>{
                let newLI = document.createElement('li')
                let tipo = resul.querySelector('tipo').textContent
                switch (tipo) {
                    case '0':
                        //Es una película
                        newLI.textContent = resul.querySelector('titulo').textContent + ' (' + resul.querySelector('anyo').textContent + ')'
                        newLI.dataset.id = resul.querySelector('id').textContent
                        newLI.dataset.tipo = 'tit'
                        resultados[0].append(newLI)
                        break;
                    case '1':
                        //Es un director o directora
                        newLI.textContent = resul.querySelector('nombre').textContent
                        newLI.dataset.id = resul.querySelector('id').textContent
                        newLI.dataset.tipo = 'dir'
                        resultados[1].append(newLI)
                        break;
                    case '2':
                        //Es un actor o actriz
                        newLI.textContent = resul.querySelector('nombre').textContent
                        newLI.dataset.id = resul.querySelector('id').textContent
                        newLI.dataset.tipo = 'act'
                        resultados[2].append(newLI)
                        break;
                } // SWITCH
            }) // FOREACH
        }) // THEN
    } // FUNCTION mostrarResultadosPorId

    buscador.value = ''
    buscador.focus()

    buscador.addEventListener('keyup',function(ev){
        let patron = this.value.trim()
        if (patron.length) {
            //hay algo escrito en el buscador --> distinguir si se ha pulsado INTRO

            if (ev.key == 'Enter') {
                //mostramos los resultados en las listas inferiores
                divSugerencias.style.display = 'none'
                mostrarResultadosPorPatron(patron)
            } else {
                //mostramos sugerencias en el div del buscador
                divSugerencias.style.display = 'block'
                mostrarSugerenciasPorPatron(patron)
            }    

        } else {
            //no hay nada escrito en el buscador
            divSugerencias.style.display = 'none'
        }    
    }) //fin del KEYUP    


    divResultados.addEventListener('click',function(ev){
        if (ev.target.nodeName.toLowerCase() == 'li') {
            //el usuario ha hecho clic sobre un resultado de búsqueda en las listas inferiores
            let id = ev.target.dataset.id
            let tipo = ev.target.dataset.tipo
            mostrarResultadosPorId(id,tipo)
        }
    })
/*
    //Capturar el clic de las sugerencias '<P>' (delegación de eventos)
    $('#divSugerencias').on('click','p',function(){
        consultarPorID($(this).data('id'),$(this).data('tipo'))
    })
    //Capturar el clic de los resultados '<LI>' de cada una de las 3 listas (delegación de eventos)
    $('#divResultados').on('click','li',function(){
        consultarPorID($(this).data('id'),$(this).data('tipo'))
    })

    function main() {
    $('#buscador').keyup(function(ev){
        //comprobar si hay un patron escrito para buscar en la BD
        let patron = $(this).val().trim()
        let $divSugerencias = $('#divSugerencias').empty()
        if ( patron.length ) {
            //consultar este patron en la BD
            $.ajax({
                url: 'search.php',
                method: 'GET',
                data: {
                    p: patron
                },
                success: function(json){
                    //cada elemento del JSON tiene que insertarse en el DIV del chat
                    let $json = jQuery.parseJSON(json)
                    for (let i=0; i<$json.length; i++) {
                        let texto = $json[i].texto
                        let $nuevoP = $('<p>')
                                        .html(texto)
                                        .data('id',$json[i].id)
                                        .data('tipo',$json[i].tipo)
                                        .appendTo($divSugerencias)
                    }
                    if ($json.length)
                        $divSugerencias.show()
                    else 
                        $divSugerencias.hide()
                },
                error: function(error) {
                    alert('error en la llamada AJAX')
                }
            }) //AJAX
        } //IF
        else {
            $divSugerencias.hide()
        }

    })

    } //function MAIN

    function consultarPorID(id,tipo) {
    $.ajax({
        url: 'search.php',
        method: 'GET',
        data: {
            id: id,
            t: tipo
        },
        success: function(respuestaXML){
            //procesar el XML y colocar cada tipo de dato en su DIV correspondiente
            let $xml = $(respuestaXML)
            let $resultados = $xml.find('resultado')

            //localizar las 3 listas (películas = 0, directores = 1, actores = 2)
            let $ulPeliculas = $('.listaResultados').eq(0).empty()
            let $ulDirectores = $('.listaResultados').eq(1).empty()
            let $ulActores = $('.listaResultados').eq(2).empty()

            let x:String = 'hola'
            x = 2

            $resultados.each(function(){
                let tipo = $(this).find('tipo').html()
                switch (tipo) {
                    case '0':
                        //Es una película
                        $('<LI>')
                            .html( $(this).find('titulo').html() )
                            .data('id', $(this).find('id').html() )
                            .data('tipo', 'tit')
                            .appendTo($ulPeliculas)
                        break;
                    case '1':
                        //Es un director o directora
                        $('<LI>')
                            .html( $(this).find('nombre').html() )
                            .data('id', $(this).find('id').html() )
                            .data('tipo', 'dir')
                            .appendTo($ulDirectores)
                        break;
                    case '2':
                        //Es un actor o actriz
                        $('<LI>')
                            .html( $(this).find('nombre').html() )
                            .data('id', $(this).find('id').html() )
                            .data('tipo', 'act')
                            .appendTo($ulActores)
                        break;
                    
                } // SWITCH
            }) // EACH
        },
        error: function(error) {
            alert('error en la llamada AJAX')
        }
    }) //AJAX
    }
*/
})()