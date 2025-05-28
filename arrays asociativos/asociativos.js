function crearTradicional(){
	
	let primos =[1,2,3,5,7,11,13,17,23,29,31]



const divRespuestaHTML = document.getElementById("respuestaHtml");

if(divRespuestaHTML){
	divRespuestaHTML.innerText = "<h1> Arreglo de primos: </h1>"+ primos;

}


 const divRespuestaInnerText = document.getElementById("respuestaInnerText");

if(divRespuestaInnerText){
	divRespuestaInnerText.innerText = "Arreglo de primos: "+ primos;

}
		

	const divRespuestaTextContent = document.getElementById("respuestaTextContent");

if(divRespuestaTextContent){
	divRespuestaTextContent.textContent = "Arreglo de primos: "+ primos;

}	

}

function crearAsociativo(){
	let temperaturas = new Array();
	temperaturas['primavera']=29;
	temperaturas['verano']=35;
	temperaturas['otonio']=24;
	temperaturas['invierno']=22;

	document.write("<p>Arreglo asociativo: </p>"
		+"<ul>"
		+"<li>"+temperaturas['primavera'] +"</li>"
	 +"<li>"+temperaturas['verano']+"</li>"
	 +"<li>"+temperaturas['otonio']+"</li>"
	 +"<li>"+temperaturas['invierno'] +
	 "</li></ul>");
}