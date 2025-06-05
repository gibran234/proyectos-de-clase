let clientes = [];

function descargaArchivo() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "./datos.xml", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const xmlDoc = xhr.responseXML; // || new DOMParser().parseFromString(xhr.responseText, "text/xml");
      const clienteNodes = xmlDoc.getElementsByTagName("cliente");

      clientes = [];
      for (let i = 0; i < clienteNodes.length; i++) {
        clientes.push({
          nombre: clienteNodes[i].getElementsByTagName("nombre")[0].textContent,
          sector: clienteNodes[i].getElementsByTagName("sector")[0].textContent,
          notas: clienteNodes[i].getElementsByTagName("notas")[0].textContent.trim()
        });
      }

      mostrarClientes();
    }
  };
  xhr.send();

  const guardados = localStorage.getItem("clientes");
  if (guardados) {
    clientes = JSON.parse(guardados);
    mostrarClientes();
  }
}

function mostrarClientes() {
  const contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = "<h2>Lista de Clientes</h2>";
  const ul = document.createElement("ul");

  clientes.forEach((cliente, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>Nombre:</strong> ${cliente.nombre}<br>
      <strong>Sector:</strong> ${cliente.sector}<br>
      <strong>Notas:</strong> ${cliente.notas}<br>
      <button onclick="editarCliente(${index})">Editar</button>
      <button onclick="borrarCliente(${index})">Borrar</button>
    `;
    ul.appendChild(li);
  });

  contenedor.appendChild(ul);
}

function editarCliente(index) {
  const cliente = clientes[index];
  document.getElementById("nombre").value = cliente.nombre;
  document.getElementById("sector").value = cliente.sector;
  document.getElementById("notas").value = cliente.notas;
  document.getElementById("index").value = index;
}

function borrarCliente(index) {
  clientes.splice(index, 1);
  mostrarClientes();
}

function guardarCliente() {
  const nombre = document.getElementById("nombre").value;
  const sector = document.getElementById("sector").value;
  const notas = document.getElementById("notas").value;
  const index = document.getElementById("index").value;

  const nuevoCliente = { nombre, sector, notas };

  if (index === "") {
    clientes.push(nuevoCliente);
  } else {
    clientes[parseInt(index)] = nuevoCliente;
  }

  document.getElementById("formulario").reset();
  document.getElementById("index").value = "";
  mostrarClientes();
}

function guardarEnLocalStorage() {
  localStorage.setItem("clientes", JSON.stringify(clientes));
  alert("Clientes guardados en el navegador.");
}

function exportarComoXML() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<clientes>\n';

  clientes.forEach(cliente => {
    xml += `  <cliente>\n`;
    xml += `    <nombre>${cliente.nombre}</nombre>\n`;
    xml += `    <sector>${cliente.sector}</sector>\n`;
    xml += `    <notas><![CDATA[${cliente.notas}]]></notas>\n`;
    xml += `  </cliente>\n`;
  });

  xml += '</clientes>';

  const blob = new Blob([xml], { type: "application/xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "clientes.xml";
  a.click();
  URL.revokeObjectURL(url);
}

window.onload = descargaArchivo;
