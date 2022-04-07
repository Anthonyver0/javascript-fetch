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
            document.querySelector("#results").innerHTML = "<UL></UL>"
            let ul = document.querySelector("#results>UL")
            json.forEach( result => {
                //añadir ese result a la lista UL
                // ese result puede ser una tecno, un fabr o un coche
                let newLI = document.createElement("LI")
                newLI.textContent = result
                ul.append(newLI)
            })
        })
    })
})