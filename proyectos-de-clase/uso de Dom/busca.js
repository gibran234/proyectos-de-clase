function genera() {
 // Generar números aleatorios entre 0 y 10
 var numero1 = (Math.random()*10).toFixed();
 var numero2 = (Math.random()*10).toFixed();
 // Obtener los nodos padre de los párrafos
 var primero = document.getElementById("primero");
 var segundo = document.getElementById("segundo");
 // Obtener el cada uno de los párrafos
 var parrafoAnterior1 = primero.firstChild;
 var parrafoAnterior2 = segundo.firstChild;
 // Crear el nuevo párrafo
 var parrafo1 = document.createElement("p");
 var texto1 = document.createTextNode(numero1);
 parrafo1.appendChild(texto1);
 // Si ya existía un párrafo, sustituirlo. Si no, añadirlo
 if(parrafoAnterior1 != null) {
 primero.replaceChild(parrafo1, parrafoAnterior1);
 }
 else {
 primero.appendChild(parrafo1);
 }
 // Crear el otro nuevo párrafo
 var parrafo2 = document.createElement("p");
 var texto2 = document.createTextNode(numero2);
 parrafo2.appendChild(texto2);
 // Si ya existía un párrafo, sustituirlo. Si no, añadirlo
 if(parrafoAnterior2 != null) {
 segundo.replaceChild(parrafo2, parrafoAnterior2);
 }
 else {
 segundo.appendChild(parrafo2);
 }
 }


 function compara() {
 // Obtener los nodos padre de los párrafos
 var primero = document.getElementById("primero");
 var segundo = document.getElementById("segundo");
 // Obtener los párrafos (existen varios métodos...)
 var parrafo1 = primero.getElementsByTagName("p")[0];
 var parrafo2 = segundo.firstChild;
 // Obtener los números a través del nodo Text de cada
 //  nodo de tipo Element de los parrafos
 var numero1 = parseInt(parrafo1.firstChild.nodeValue);
 var numero2 = parseInt(parrafo2.firstChild.nodeValue);
 // Determinar el nodo del párrafo cuyo nodo es mayor
 var parrafoMayor = (numero1 > numero2)? parrafo1 : parrafo2;
 // Obtener el nodo padre del párrafo resultado
 var resultado = document.getElementById("resultado");
 var parrafoAnterior = resultado.firstChild;
 // Si ya existía un párrafo de resultado anterior, sustituirlo. Si no, añadirlo
 if(parrafoAnterior != null) {

 resultado.replaceChild(parrafoMayor, parrafoAnterior);

 }
 else {

 resultado.appendChild(parrafoMayor);
 
 }
 }