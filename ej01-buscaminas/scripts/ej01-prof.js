(function(){ //comienzo de nuestro código encapsulado

    const WIDTH = 9
    const HEIGHT = 9
    const MINES = 10
    const board = document.querySelector("#tablero")
    const fila = document.querySelector("#fila")
    const columna = document.querySelector("#columna")
    const mina = document.querySelector("#mina")

    generateBoard()
    assignMines()

    function generateBoard() {
        for (let i = 0; i < WIDTH * HEIGHT; i++) {
            // i = 0 , 1, 2, 3, 4 ... 80
            let newCell = document.createElement("DIV")
            newCell.classList.add("celda")
            newCell.dataset.fila = Math.floor(i / WIDTH)
            newCell.dataset.columna = i % WIDTH
            newCell.dataset.mina = false
            board.append(newCell)
        }

        board.addEventListener("mouseover",(ev)=>{
            if (ev.target.classList.contains("celda")) {
                fila.textContent = ev.target.dataset.fila
                columna.textContent = ev.target.dataset.columna
                mina.textContent = ev.target.dataset.mina
            }
        })

        board.addEventListener("click",(ev)=>{
            if (ev.target.dataset.mina == "true") {
                //has clicado mina -> pierdes

            } else {
                //no has clicado mina
                //1. comprobar si con este último clic has ganado
                //2. si no has ganado, calcular número minas alrededor
            }
        })
    }

    function assignMines() {
        const allCells = document.querySelectorAll(".celda")
        let assignedMines = 0
        while (assignedMines < MINES) {
            //generar aleatorio entre 0 y WIDTH*HEIGHT
            let randNum = Math.floor(Math.random() * WIDTH * HEIGHT)
            //colocar mina si no hay mina previamente en esa casilla
            if (allCells[randNum].dataset.mina == "false") {
                allCells[randNum].dataset.mina = true
                allCells[randNum].classList.add("mina")
                //incrementar contador de minas ya colocadas
                assignedMines++
            }
        }
    }

})() // fin de nuestro código encapsulado