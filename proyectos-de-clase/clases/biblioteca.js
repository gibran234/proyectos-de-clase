class Personaje {
  name;                 // Propiedad sin definir (undefined)
  type = "Player";      // Propiedad definida
  lifes = 5;            // Propiedad definida con 5 vidas restantes
  energy = 10;          // Propiedad definida con 10 puntos de energía

  constructor(name) {
    this.name = name;   // Modificamos el valor de la propiedad name
    console.log(`¡Bienvenido/a, ${this.name}!`);  // Accedemos al valor de name
  }

  hola(){
    return this.name;
  }
}

//const mario = new Personaje("Mario");   // '¡Bienvenido/a, Mario!'