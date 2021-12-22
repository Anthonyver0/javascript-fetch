//NOMBRE DEL ALUMNO: [Enrique Berenguer López]

//RESOLUCIÓN DEL EXAMEN

(function(){
	//Escribe aquí todo tu código JS
	console.log("Empieza la ejecución");
	const select = document.querySelector("#criterio");
	const rival1 = document.querySelector("#rival1");
	const rival2 = document.querySelector("#rival2");
	const enviar = document.querySelector("#enviar");
	const tabla = document.querySelector("#tablaSalida>tbody");

	select.addEventListener("change", function(){
		rival1.innerHTML ="";
		fetch(`load.php?cat=${select.value}`)
		.then(response => response.json())
		.then(json =>{
			json.forEach(element => {
				let newLi = document.createElement("li");
				newLi.classList.add("rvl1");
				newLi.textContent = element;
				rival1.appendChild(newLi);
			});
		})
		rival1.addEventListener("click", function(ev){
			rival2.innerHTML ="";
			if(ev.target.classList.contains('rvl1')){
				ev.target.classList.add("seleccionado");
				ev.target.classList.add("riv1");
				ev.target.classList.remove("rvl1");
				let lis = rival1.querySelectorAll(".rvl1");
				lis.forEach(element =>{
					console.log(rival2)
					let newLi = document.createElement("li");
					newLi.classList.add("rvl2");
					newLi.textContent = element.textContent;
					rival2.append(newLi);
				})
			}
		})
		rival2.addEventListener("click", function(ev){
			if(ev.target.classList.contains('rvl2')){
				ev.target.classList.add("seleccionado");
				ev.target.classList.add("riv2");
				ev.target.classList.remove("rvl1");
				enviar.disabled = false;
			}
		});
	})
	enviar.addEventListener("click", function(){
		let cat = select.value;
		let riv1 = document.querySelector(".riv1").textContent;
		let riv2 = document.querySelector(".riv2").textContent;
		console.log(riv2);
		let data = new FormData();
		data.append("cat", cat);
		data.append("riv1", riv1);
		data.append("riv2", riv2);
		fetch("save.php", {
			   method: 'POST',
			   body: data
		}).then(response=>response.text())
		.then(xmlCrudo=>{
			let parser = new DOMParser()
			let xml = parser.parseFromString(xmlCrudo,'text/xml');
			console.log(xml);
			let encuentros = xml.querySelectorAll("encuentro");
			encuentros.forEach(encuentro => {
				let newTr = document.createElement("tr");
				let newtd1 = document.createElement("td");
				let newtd2 = document.createElement("td");
				let newtd3 = document.createElement("td");
				newtd1.innerHTML = encuentro.querySelector("cat").textContent;
				newtd2.innerHTML = encuentro.querySelector("choice1").textContent;
				newtd3.innerHTML = encuentro.querySelector("choice2").textContent;
				newTr.append(newtd1);
				newTr.append(newtd2);
				newTr.append(newtd3);
				tabla.append(newTr);
			})
		})
	})

})();
	/*	enviar.addEventListener("click", function(){
			let cat = select.value;
			let riv1 = "";
			let data = new FormData(select.value,);
			fetch("list.php", {
   				method: 'POST',
   				body: data
			})
		})
	});


/*enviar.addEventListener("click", function(){
			let cat = select.value;
			let riv1 = document.querySelector(".rv1");
			let riv2 = document.querySelector(".rv2");
			const data = new FormData(cat,riv1,riv2);
			fetch("list.php", {
   				method: 'POST',
   				body: data
			}).then(response=>response.text())
			.then(xmlCrudo=>{
				let parser = new DOMParser()
				let xml = parser.parseFromString(xmlCrudo,'text/xml');
		})

})();
/*enviar.addEventListener("click", function(){
			let cat = select.value;
			let riv1 = document.querySelector(".rv1");
			let riv2 = document.querySelector(".rv2");
			const data = new FormData(cat,riv1,riv2);
			fetch("list.php", {
   				method: 'POST',
   				body: data
			}).then(response=>response.text())
			.then(xmlCrudo=>{
				let parser = new DOMParser()
				let xml = parser.parseFromString(xmlCrudo,'text/xml');
		})
		*/