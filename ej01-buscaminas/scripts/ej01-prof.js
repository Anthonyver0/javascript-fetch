(function(){
    const WIDTH = 9
    const HEIGHT = 9
    const board = document.querySelector("#tablero")
    const fila = document.querySelector("#fila")
    const columna = document.querySelector("#columna")

    for (let i = 0; i < WIDTH * HEIGHT; i++) {
        // i = 0 , 1, 2, 3, 4 ... 80
        let newCell = document.createElement("DIV")
        newCell.classList.add("celda")
        newCell.dataset.fila = Math.floor(i / WIDTH)
        newCell.dataset.columna = i % WIDTH
        board.append(newCell)
    }

    board.addEventListener("mouseover",(ev)=>{
        if (ev.target.classList.contains("celda")) {
            fila.textContent = ev.target.dataset.fila
            columna.textContent = ev.target.dataset.columna
        }
    })
})()