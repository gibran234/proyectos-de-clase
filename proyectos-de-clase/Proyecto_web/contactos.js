let contactos = [];

function descargaArchivo() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "./contactos.xml", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const xmlDoc = xhr.responseXML;
      const contactoNodes = xmlDoc.getElementsByTagName("contacto");

      contactos = [];
      for (let i = 0; i < contactoNodes.length; i++) {
        contactos.push({
          nombre: contactoNodes[i].getElementsByTagName("nombre")[0].textContent,
          email: contactoNodes[i].getElementsByTagName("email")[0].textContent,
          asunto: contactoNodes[i].getElementsByTagName("asunto")[0].textContent,
          mensaje: contactoNodes[i].getElementsByTagName("mensaje")[0].textContent.trim()
        });
      }

      mostrarContactos();
    }
  };
  xhr.send();

  const guardados = localStorage.getItem("contactos");
  if (guardados) {
    contactos = JSON.parse(guardados);
    mostrarContactos();
  }
}

function mostrarContactos() {
  const contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = "<h2>Lista de Contactos</h2>";
  const ul = document.createElement("ul");

  contactos.forEach((contacto, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>Nombre:</strong> ${contacto.nombre}<br>
      <strong>Email:</strong> ${contacto.email}<br>
      <strong>Asunto:</strong> ${contacto.asunto}<br>
      <strong>Mensaje:</strong> ${contacto.mensaje}<br>
       <div class="producto-acciones">
        <button onclick="editarContacto(${index})" class="btn-editar">
          <i class="fa fa-edit"></i> Editar
        </button>
        <button onclick="borrarContacto(${index})" class="btn-borrar">
          <i class="fa fa-trash"></i> Borrar
        </button>
      <style>
      .producto-acciones {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 6px;
}

.producto-acciones button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 0.9em;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.btn-editar {
  background: #e0f0ff;
  color: #005a9c;
}

.btn-editar:hover {
  background: #c9e5fc;
}

.btn-borrar {
  background: #ffe0e0;
  color: #b30000;
}

.btn-borrar:hover {
  background: #f8c4c4;
}

.fa {
  font-size: 1em;

      </style>
    `;
    ul.appendChild(li);
  });

  contenedor.appendChild(ul);
}

function editarContacto(index) {
  const contacto = contactos[index];
  document.getElementById("nombre").value = contacto.nombre;
  document.getElementById("email").value = contacto.email;
  document.getElementById("asunto").value = contacto.asunto;
  document.getElementById("mensaje").value = contacto.mensaje;
  document.getElementById("index").value = index;
}

function borrarContacto(index) {
  contactos.splice(index, 1);
  mostrarContactos();
}

function guardarContactos() {
  event.preventDefault(); 

  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const asunto = document.getElementById("asunto").value;
  const mensaje = document.getElementById("mensaje").value;
  const index = document.getElementById("index").value;

  const nuevoContacto = { nombre, email, asunto, mensaje };

  if (index === "") {
    contactos.push(nuevoContacto);
  } else {
    contactos[parseInt(index)] = nuevoContacto;
  }

  document.querySelector(".formulario-contacto").reset();
  document.getElementById("index").value = "";
  mostrarContactos();
}

function guardarEnLocalStorage() {
  localStorage.setItem("contactos", JSON.stringify(contactos));
  alert("Contactos guardados en el navegador.");
}

function exportarComoXML() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<contactos>\n';

  contactos.forEach(contacto => {
    xml += `  <contacto>\n`;
    xml += `    <nombre>${contacto.nombre}</nombre>\n`;
    xml += `    <email>${contacto.email}</email>\n`;
    xml += `    <asunto>${contacto.asunto}</asunto>\n`;
    xml += `    <mensaje><![CDATA[${contacto.mensaje}]]></mensaje>\n`;
    xml += `  </contacto>\n`;
  });

  xml += '</contactos>';

  const blob = new Blob([xml], { type: "application/xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "contactos.xml";
  a.click();
  URL.revokeObjectURL(url);
}

window.onload = descargaArchivo;
