"use strict";
// NOTA: Función inmediatamente invocada o IIFE  es una forma común de crear un ámbito aislado para evitar que las variables y funciones definidas dentro de la función colisionen con otras variables en el ámbito global. También es útil para mantener la privacidad y evitar conflictos de nombres con otras bibliotecas o códigos en la página.
(function () {
  let DB;

  document.addEventListener("DOMContentLoaded", () => {
    crearBase();
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
        keypath: "id",
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
})();
