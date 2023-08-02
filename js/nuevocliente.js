"use strict";

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
    console.log("Validando....");
    //leer todos los input
    const nombre = document.querySelector("#nombre").value;
    const email = document.querySelector("#email").value;
    const telefono = document.querySelector("#telefono").value;
    const empresa = document.querySelector("#empresa").value;

    if (nombre === "" || email === "" || telefono === "" || empresa === "") {
      imprimirAlerta("Todos los campos son obligatorios", "error");
      return;
    }
  }

  function imprimirAlerta(mensaje, tipo) {
    // falta definir la funcion...................
  }
})();
