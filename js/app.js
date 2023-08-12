// NOTA: Función inmediatamente invocada o IIFE  es una forma común de crear un ámbito aislado para evitar que las variables y funciones definidas dentro de la función colisionen con otras variables en el ámbito global. También es útil para mantener la privacidad y evitar conflictos de nombres con otras bibliotecas o códigos en la página.
(function () {
  let DB;
  const listado = document.querySelector("#listado-clientes");
  let idEliminar;
  document.addEventListener("DOMContentLoaded", () => {
    crearBase();

    if (window.indexedDB.open("crm", 1)) {
      obtenerClientes();
    }

    listado.addEventListener("click", eliminarRegistro);
  });
  //Crea la base de datos en indexDB
  function crearBase() {
    const crearDB = window.indexedDB.open("crm", 1);

    crearDB.onerror = () => {
      console.log("Hubo un error");
    };

    crearDB.onsuccess = () => {
      DB = crearDB.result;
    };

    crearDB.onupgradeneeded = (e) => {
      const db = e.target.result;

      const objectStore = db.createObjectStore("crm", {
        keyPath: "id",
        autoIncrement: true,
      });

      objectStore.createIndex("nombre", "nombre", { unique: false });
      objectStore.createIndex("email", "email", { unique: true });
      objectStore.createIndex("telefono", "telefono", { unique: false });
      objectStore.createIndex("empresa", "empresa", { unique: false });
      objectStore.createIndex("id", "id", { unique: true });

      console.log("DB creada correctamente");
    };
  }

  function eliminarRegistro(e) {
    if (e.target.classList.contains("eliminar")) {
      idEliminar = Number(e.target.dataset.cliente);
      console.log(idEliminar);
      swal({
        title: "¿Estás seguro?",
        text: "Una vez eliminado, no podrás recuperar este archivo!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal("Tu archivo se elimino con éxito", {
            icon: "success",
          });

          ejecutarEliminacion(e);
        } else {
          swal("Tu archivo está a salvo!");
        }
      });
    }
  }

  function ejecutarEliminacion(e) {
    const transaction = DB.transaction(["crm"], "readwrite");
    const objectStore = transaction.objectStore("crm");

    objectStore.delete(idEliminar);

    transaction.oncomplete = function () {
      console.log("Eliminado.....");
      e.target.parentElement.parentElement.remove();
    };

    transaction.onerror = function () {
      console.log("Hubo un error");
    };
  }

  function obtenerClientes() {
    const abrirConexion = window.indexedDB.open("crm", 1);

    abrirConexion.onerror = () => {
      console.log("Hubo un error");
    };

    abrirConexion.onsuccess = () => {
      DB = abrirConexion.result;
      const objectStore = DB.transaction("crm").objectStore("crm");

      objectStore.openCursor().onsuccess = function (e) {
        const cursor = e.target.result;

        if (cursor) {
          listadoClientes(cursor);
          cursor.continue();
        } else {
          console.log("No hay mas registros");
        }
      };
    };
  }

  function listadoClientes(cursor) {
    const { nombre, email, telefono, empresa, id } = cursor.value;

    listado.innerHTML += ` <tr>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
              <p class="text-sm leading-10 text-gray-700"> ${email} </p>
          </td>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
              <p class="text-gray-700">${telefono}</p>
          </td>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
              <p class="text-gray-600">${empresa}</p>
          </td>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
              <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
              <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
          </td>
      </tr>
  `;
  }
})();
