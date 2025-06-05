function hola(){
	console.log("Hola mundo");
	console.log(2 + 2);
	console.trace("Rastreo de ejecución");
	const users = [
	  { name: "Manz", role: "streamer", status: "happy" },
	  { name: "BlurSoul_", role: "mod", status: "happy" },
	  { name: "felixicaza", role: "mod", status: "happy" },
	  
	  { name: "pheralb", role: "mod", status: "porosad" }
	];

	console.table(users);
}
