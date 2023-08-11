(function () {
  let DB;
  const formulario = document.querySelector("#formulario");

  document.addEventListener("DOMContentLoaded", () => {
    conectarDB();
    formulario.addEventListener("submit", validarCliente);
  });

  function validarCliente(e) {
    e.preventDefault();

    //leer todos los input
    const nombre = document.querySelector("#nombre").value;
    const email = document.querySelector("#email").value;
    const telefono = document.querySelector("#telefono").value;
    const empresa = document.querySelector("#empresa").value;

    if (nombre === "" || email === "" || telefono === "" || empresa === "") {
      imprimirAlerta("Todos los campos son obligatorios", "error");
      return;
    }

    //Crea un objeto con la informacion

    const cliente = {
      nombre: nombre,
      email: email,
      telefono: telefono,
      empresa: empresa,
    };

    cliente.id = Date.now();

    console.log(cliente);
    crearNuevoCliente(cliente);
  }

  function conectarDB() {
    const abrirConexion = window.indexedDB.open("crm", 1);

    abrirConexion.onerror = () => {
      console.log("Hubo un error en la Conexión");
    };

    abrirConexion.onsuccess = () => {
      DB = abrirConexion.result;
    };
  }

  function crearNuevoCliente(cliente) {
    const transaction = DB.transaction(["crm"], "readwrite");

    const objectStore = transaction.objectStore("crm");

    objectStore.add(cliente);

    transaction.onerror = () => {
      imprimirAlerta("Hubo un error", "error");
    };

    transaction.oncomplete = () => {
      imprimirAlerta("Datos cargados correctamente");

      spiner();
      setTimeout(() => {
        window.location.href = "index.html";
      }, 3000);
    };
  }
})();
