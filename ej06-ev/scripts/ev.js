const lis = document.querySelectorAll("li.nav-item")

const queries = ["tecnologias","fabricantes","coches"]
const urlbase = "http://my-json-server.typicode.com/luismiguel-fernandez/angular2022/"

lis.forEach( (li,index)=>{
    li.addEventListener("click",()=>{
        let url = urlbase + queries[index]
        fetch(url)
        .then( respcruda => respcruda.json() )
        .then( json => {
            //recorrer cada resultado de búsqueda para mostrarlo en pantalla
            document.querySelector("#results").innerHTML = '<UL class="list-group"></UL>'
            let ul = document.querySelector("#results>UL")
            json.forEach( result => {
                //añadir ese result a la lista UL
                // ese result puede ser una tecno, un fabr o un coche
                let newLI = document.createElement("LI")
                newLI.classList.add("list-group-item")
                newLI.dataset.toggle="modal"
                newLI.dataset.target="#carThumb"
                //distinguir si es coche o si es tecn/fabr
                newLI.textContent = result.text ? result.text : result.nombre + " " + result.precio + "€"
                newLI.addEventListener("mouseover",ev=>{
                    if (document.querySelector(".active"))
                        document.querySelector(".active").classList.remove("active")
                    newLI.classList.add("active")
                })
                newLI.addEventListener("click",ev=>{
                    //distinguir si es coche o no
                    if (!result.text) {
                       const modal = document.querySelector("div.modal-dialog")
                       const imagen = modal.querySelector("img")
                       imagen.src = result.imagen
                       $('#carThumb').modal('show');
                    }
                })
                ul.append(newLI)
            })
        })
    })
})