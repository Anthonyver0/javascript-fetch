
//NOMBRE DEL ALUMNO: [pon aquí tu nombre]

//RESOLUCIÓN DEL EXAMEN

(function(){
	//Escribe aquí todo tu código JS
	console.log("Empieza la ejecución");
	const criterio = document.querySelector("#criterio")
	const rival1 = document.querySelector("#rival1")
	const rival2 = document.querySelector("#rival2")
	const enviar = document.querySelector("#enviar")
	const salida = document.querySelector("#tablaSalida>tbody")

	rival1.addEventListener("click",function(ev){
		if (ev.target.nodeName.toLowerCase() == "li") {
			enviar.disabled = true
			rival2.innerHTML = ""
			let yaSelec = this.querySelector("li.seleccionado")
			if (yaSelec) {
				yaSelec.classList.remove("seleccionado")
			}
			ev.target.classList.add("seleccionado")

			let hermanos = this.querySelectorAll("li:not(.seleccionado)")
			hermanos.forEach(hermano=>{
				rival2.append(hermano.cloneNode(true))
			})
		}
	})

	rival2.addEventListener("click",function(ev){
		if (ev.target.nodeName.toLowerCase() == "li") {
			let yaSelec = this.querySelector("li.seleccionado")
			if (yaSelec) {
				yaSelec.classList.remove("seleccionado")
			}
			ev.target.classList.add("seleccionado")
			enviar.disabled = false
		}
	})

	criterio.addEventListener("change",function(ev){
		enviar.disabled = true
		let opcionElegida = this.value
		rival1.innerHTML = ""
		rival2.innerHTML = ""
		if (opcionElegida == "nada") return
		fetch("load.php?cat="+opcionElegida)
			.then(resp=>resp.json())
			.then(json=>{
				json.forEach(riv=>{
					let newLi = document.createElement("LI")
					newLi.textContent = riv
					rival1.append(newLi)
				})
			})
	})

	enviar.addEventListener("click",function(ev){

		let r1 = rival1.querySelector("li.seleccionado").textContent
		let r2 = rival2.querySelector("li.seleccionado").textContent

		salida.innerHTML = ""

		let params = new URLSearchParams(
			"cat=" + criterio.value + "&riv1=" + r1 + "&riv2=" + r2
		)
		let options = {
			method: "POST",
			body: params
		}
		fetch("save.php",options)
			.then(resp=>resp.text())
			.then(xmlCrudo=>{
				procesarXMLcrudo(xmlCrudo)
			})
	})

	const consultar = document.querySelector("#consultar")
	
	consultar.addEventListener("click",function(ev){
		fetch("list.php")
			.then(resp=>resp.text())
			.then(xmlCrudo=>{
				procesarXMLcrudo(xmlCrudo)
			})
	})

	function procesarXMLcrudo(xmlCrudo) {
		let parser = new DOMParser()
		let xml = parser.parseFromString(xmlCrudo,"text/xml")
		let encuentros = xml.querySelectorAll("encuentro")
		encuentros.forEach(enc=>{
			let newTR = salida.insertRow()
			let newTD1 = newTR.insertCell()
			let newTD2 = newTR.insertCell()
			let newTD3 = newTR.insertCell()
			newTD1.textContent = enc.querySelector("cat").textContent
			newTD2.textContent = enc.querySelector("choice1").textContent
			newTD3.textContent = enc.querySelector("choice2").textContent

			newTR.dataset.cat = enc.querySelector("cat").textContent
		})
	}

	const cbxEq = document.querySelector("#verEquip")
	const cbxIn = document.querySelector("#verJugad")

	cbxEq.addEventListener("change",function(ev){
		filtrarSalida()
	})

	cbxIn.addEventListener("change",function(ev){
		filtrarSalida()
	})

	function filtrarSalida() {
		let filas = salida.querySelectorAll("tr")
		filas.forEach(fila=>{
			//comprobar si esta fila debe ser mostrada o no
			let cat = fila.dataset.cat //atributo data-cat
			if (cat == "eq" && cbxEq.checked) {
				fila.style.display = "table-row"
			} else if (cat == "indiv" && cbxIn.checked) {
				fila.style.display = "table-row"
			} else {
				fila.style.display = "none"
			}
		})
	}

})();





