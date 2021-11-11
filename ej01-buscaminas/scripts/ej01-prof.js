(function(){ //comienzo de nuestro código encapsulado
    const WIDTH = 9
    const HEIGHT = 9
    const MINES = 10
    const board = document.querySelector("#tablero")
    const fila = document.querySelector("#fila")
    const columna = document.querySelector("#columna")
    const mina = document.querySelector("#mina")
    const empezar = document.querySelector("#empezar")
    let partidaEnJuego = false

    setupMouse()
    empezar.addEventListener("click",function(){
        generateBoard()
        assignMines()
        partidaEnJuego = true
    })

    function setupMouse() {
        board.addEventListener("mouseover",(ev)=>{
            if (ev.target.classList.contains("celda")) {
                fila.textContent = ev.target.dataset.fila
                columna.textContent = ev.target.dataset.columna
                mina.textContent = ev.target.dataset.mina
            }
        })
        board.addEventListener("mouseup",(ev)=>{
            if (!partidaEnJuego)
                return
            //partida en marcha: analizar todos los posibles casos
            if (ev.button == 0) {
                //se ha pulsado el botón izquierdo
                ev.target.dataset.clicada = true
                if (ev.target.dataset.mina == "true") {
                    //has clicado mina -> pierdes
                    partidaEnJuego = false
                    descubrirMinas()
                    ev.target.classList.add("mina_explotada")
                } else {
                    //no has clicado mina
                    //calcular número minas alrededor
                    let minesAround = calculateMinesAround(parseInt(ev.target.dataset.fila),
                                                           parseInt(ev.target.dataset.columna))
                    ev.target.classList.add("celda_clicada"+minesAround)
                    //comprobar si con este último clic has ganado

                }
            } else if (ev.button == 2) {
                //se ha pulsado el botón derecho
                ev.target.classList.toggle("celda_bandera")
            }
        })
        board.addEventListener("contextmenu",(ev)=>{
            ev.preventDefault()
        })   
    }

    function generateBoard() {
        board.innerHTML = ""
        for (let i = 0; i < WIDTH * HEIGHT; i++) {
            // i = 0 , 1, 2, 3, 4 ... 80
            let newCell = document.createElement("DIV")
            newCell.classList.add("celda")
            newCell.dataset.fila = Math.floor(i / WIDTH)
            newCell.dataset.columna = i % WIDTH
            newCell.dataset.mina = false
            newCell.dataset.clicada = false
            board.append(newCell)
        }
    } // FIN DE GENERATEBOARD

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

    function descubrirMinas() {
        const allCellsWithMine = document.querySelectorAll(".celda[data-mina=true]")
        allCellsWithMine.forEach(celda => celda.classList.add("mina"))
    }

    function calculateMinesAround(fila,col) {
        let celda
        let around = 0
        for (let i=fila-1; i<=fila+1; i++) {
            for (let j=col-1; j<=col+1; j++) {
                celda = document.querySelector(`.celda[data-fila='${i}'][data-columna='${j}']`)
                if (celda && celda.dataset.mina == 'true') around++
            }
        }
        return around
    } // fin de la función "calculateMinesAround"

})() // fin de nuestro código encapsulado