document.addEventListener("DOMContentLoaded", function () {
  const inputNombre = document.getElementById("nombre");
  const inputEmail = document.getElementById("email");

  // VALIDACIÓN Solo letras para nombre
  if (inputNombre) {
    inputNombre.addEventListener("input", () => {
      inputNombre.value = inputNombre.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
    });
  }

  // FORMULARIO DE CONTACTO
  const formularioContacto = document.querySelector(".formulario-contacto");
  if (formularioContacto) {
    formularioContacto.addEventListener("submit", function (e) {
      e.preventDefault();

      const nombre = inputNombre.value.trim();
      const email = inputEmail.value.trim();
      const mensaje = document.getElementById("mensaje").value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Validación de campos vacíos
      if (nombre === "" || email === "" || mensaje === "") {
        alert("Por favor, completa todos los campos obligatorios.");
        return;
      }

      // Validación de email
      if (!emailRegex.test(email)) {
        alert("Por favor, ingresa un correo electrónico válido.");
        return;
      }

      alert("¡Mensaje enviado con éxito! Gracias por contactarnos.");
      formularioContacto.reset();
    });
  }

  // FORMULARIO DE GESTIÓN DE PRODUCTOS
  const formularioGestion = document.querySelector(".formulario-gestion");
  if (formularioGestion) {
    formularioGestion.addEventListener("submit", function (e) {
      e.preventDefault();

      const stock = document.getElementById("stock").value;

      if (stock === "" || isNaN(stock) || parseInt(stock) < 0) {
        alert("Ingresa una cantidad válida de stock.");
        return;
      }

      alert("¡Información de gestión guardada correctamente!");
      formularioGestion.reset();
    });
  }
});
