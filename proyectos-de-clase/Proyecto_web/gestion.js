let productos = [];

function descargaArchivo() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "./productos.xml", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const xmlDoc = xhr.responseXML;
      const productoNodes = xmlDoc.getElementsByTagName("producto");

      productos = [];
      for (let i = 0; i < productoNodes.length; i++) {
        productos.push({
          stock: productoNodes[i].getElementsByTagName("stock")[0].textContent,
          actualizado: productoNodes[i].getElementsByTagName("actualizado")[0].textContent,
          agotados: productoNodes[i].getElementsByTagName("agotados")[0].textContent.trim(),
          problemas: productoNodes[i].getElementsByTagName("problemas")[0]?.textContent || "",
          masvendidos: productoNodes[i].getElementsByTagName("masvendidos")[0].textContent.trim(),
          categoria: productoNodes[i].getElementsByTagName("categoria")[0].textContent,
          fecha: productoNodes[i].getElementsByTagName("fecha")[0].textContent,
          observaciones: productoNodes[i].getElementsByTagName("observaciones")[0].textContent.trim()
        });
      }

      mostrarProductos();
    }
  };
  xhr.send();

  const guardados = localStorage.getItem("productos");
  if (guardados) {
    productos = JSON.parse(guardados);
    mostrarProductos();
  }
}

function mostrarProductos() {
  const contenedor = document.getElementById("contenedor") 
  contenedor.innerHTML = "<h2>Lista de Productos</h2>";
  const ul = document.createElement("ul");

  productos.forEach((prod, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>Stock:</strong> ${prod.stock}<br>
      <strong>Actualizado:</strong> ${prod.actualizado}<br>
      <strong>Agotados:</strong> ${prod.agotados}<br>
      <strong>Problemas:</strong> ${prod.problemas}<br>
      <strong>Más vendidos:</strong> ${prod.masvendidos}<br>
      <strong>Categoría:</strong> ${prod.categoria}<br>
      <strong>Fecha:</strong> ${prod.fecha}<br>
      <strong>Observaciones:</strong> ${prod.observaciones}<br>
        <div class="producto-acciones">
        <button onclick="editarProducto(${index})" class="btn-editar">
          <i class="fa fa-edit"></i> Editar
        </button>
        <button onclick="borrarProducto(${index})" class="btn-borrar">
          <i class="fa fa-trash"></i> Borrar
        </button>
      </div>

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
}
</style>
    `;
    ul.appendChild(li);
  });

   contenedor.appendChild(ul);
}

function editarProducto(index) {

    const producto = productos[index];

  document.getElementById("stock").value = producto.stock;
  document.querySelector(`input[name="actualizado"][value="${producto.actualizado}"]`).checked = true;
  document.getElementById("agotados").value = producto.agotados;
  document.getElementById("masvendidos").value = producto.masvendidos;
  document.getElementById("categoria").value = producto.categoria;
  document.getElementById("fecha").value = producto.fecha;
  document.getElementById("observaciones").value = producto.observaciones;

  const checkboxes = document.querySelectorAll('input[name="problemas"]');
  checkboxes.forEach(checkbox => {
    checkbox.checked = producto.problemas.includes(checkbox.value);
  });

  document.getElementById("index").value = index;
}

function borrarProducto(index) {
  productos.splice(index, 1);
  mostrarProductos();
}

function guardarProducto() {
  event.preventDefault();

  const stock = document.getElementById("stock").value;
  const actualizado = document.querySelector('input[name="actualizado"]:checked').value;
  const agotados = document.getElementById("agotados").value;
  const problemas = Array.from(document.querySelectorAll('input[name="problemas"]:checked')).map(cb => cb.value).join(",");
  const masvendidos = document.getElementById("masvendidos").value;
  const categoria = document.getElementById("categoria").value;
  const fecha = document.getElementById("fecha").value;
  const observaciones = document.getElementById("observaciones").value;
  const index = document.getElementById("index").value;

  const nuevoProducto = { stock, actualizado, agotados, problemas, masvendidos, categoria, fecha, observaciones };

  if (index === "") {
    productos.push(nuevoProducto);
  } else {
    productos[parseInt(index)] = nuevoProducto;
  }

  document.querySelector(".formulario-gestion").reset();
  document.getElementById("index").value = "";
  mostrarProductos();
}

function guardarEnLocalStorage() {
  localStorage.setItem("productos", JSON.stringify(productos));
  alert("Productos guardados en el navegador.");
}

function exportarComoXML() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<productos>\n';

  productos.forEach(prod => {
    xml += `  <producto>\n`;
    xml += `    <stock>${prod.stock}</stock>\n`;
    xml += `    <actualizado>${prod.actualizado}</actualizado>\n`;
    xml += `    <agotados><![CDATA[${prod.agotados}]]></agotados>\n`;
    xml += `    <problemas>${prod.problemas}</problemas>\n`;
    xml += `    <masvendidos><![CDATA[${prod.masvendidos}]]></masvendidos>\n`;
    xml += `    <categoria>${prod.categoria}</categoria>\n`;
    xml += `    <fecha>${prod.fecha}</fecha>\n`;
    xml += `    <observaciones><![CDATA[${prod.observaciones}]]></observaciones>\n`;
    xml += `  </producto>\n`;
  });

  xml += '</productos>';

  const blob = new Blob([xml], { type: "application/xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "productos.xml";
  a.click();
  URL.revokeObjectURL(url);
}

window.onload = descargaArchivo;
