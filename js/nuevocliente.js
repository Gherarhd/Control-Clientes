(function () {
  let DB;
  const formulario = document.querySelector("#formulario");

  document.addEventListener("DOMContentLoaded", () => {
    conectarDB();
    formulario.addEventListener("submit", validarCliente);
  });

  function conectarDB() {
    const abrirConexion = window.indexedDB.open("crm", 1);

    abrirConexion.onerror = () => {
      console.log("Hubo un error en la Conexión");
    };

    abrirConexion.onsuccess = () => {
      DB = abrirConexion.result;
    };
  }

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

  function spiner() {
    const spiner = document.createElement("div");
    spiner.classList.add("lds-ellipsis");
    spiner.innerHTML = `<div></div><div></div><div></div>`;

    formulario.appendChild(spiner);
  }

  function imprimirAlerta(mensaje, tipo) {
    //elimina la repetición de la alerta
    const alerta = document.querySelector(".alerta");

    if (!alerta) {
      //crear alerta

      const divMensaje = document.createElement("div");
      divMensaje.classList.add(
        "px-4",
        "py-3",
        "rounded",
        "max-w-lg",
        "mx-auto",
        "mt-6",
        "text-center",
        "border",
        "alerta"
      );

      if (tipo === "error") {
        divMensaje.classList.add(
          "bg-red-200",
          "border-red-400",
          "text-red-700"
        );
      } else {
        divMensaje.classList.add(
          "bg-green-100",
          "border-green-400",
          "text-green-700"
        );
      }

      divMensaje.textContent = mensaje;
      formulario.appendChild(divMensaje);

      setTimeout(() => {
        divMensaje.remove();
      }, 5000);
    }
  }
})();
