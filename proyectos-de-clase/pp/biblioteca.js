function obtenerDatos(){
	fetch("/robots.txt", options)
  .then(response => response.text())
  .then(data => {
    /** Procesar los datos **/
  });

  /*

.then( procesaDatos(response) )

//  response => response.text()    //arrow function ó función flecha

function procesaDatos(response){
      return response.text();
}



.then( muestraDatos(data) )

//data => console.log(data)

function muestraDatos(data){
  console.log(data); 

}

*/
}




