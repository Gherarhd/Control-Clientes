function spiner() {
  const spiner = document.createElement("div");
  spiner.classList.add("lds-ellipsis");
  spiner.innerHTML = `<div></div><div></div><div></div>`;

  formulario.appendChild(spiner);
  console.log("espinne");
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
      divMensaje.classList.add("bg-red-200", "border-red-400", "text-red-700");
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
