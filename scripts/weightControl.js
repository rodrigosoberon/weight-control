// * -------------------------------- Clases ---------------------------------------
class Persona {
  constructor(mNombre, mAltura) {
    this.nombre = mNombre;
    this.altura = mAltura;
    this.mediciones = [];
  }

  registrarPeso(mPeso) {
    //* Agrega una medición de peso con fecha HOY al vector de mediciones
    let medicion = { peso: mPeso, fecha: new Date() };
    usuario.mediciones.push(medicion);
  }

  ultimoPeso() {
    //* Retorna el útlimo pesaje registrado dentro del array de mediciones
    return this.mediciones[this.mediciones.length - 1].peso;
  }

  obtenerIMC() {
    //* Calcula y devuelve el valor de IMC en base al último peso registrado
    return ((this.ultimoPeso() / (this.altura * this.altura)) * 10000).toFixed(
      2
    );
  }

  obtenerClasificacion() {
    //* Calcula el IMC actual y devuelve un texto con la clasificación del mismo
    let imc = this.obtenerIMC();
    switch (true) {
      case imc < 18.5:
        return "PESO BAJO";
      case imc >= 18.5 && imc < 25:
        return "ADECUADO";
      case imc >= 25 && imc < 30:
        return "SOBREPESO";
      case imc >= 30:
        return "OBESIDAD";
    }
  }

  cambiarNombre() {
    //* Ejecuta una sweetalert para cambiar el nombre del usuario
    (async () => {
      const { value: nombreIngresado } = await Swal.fire({
        title: "Cambiar mi nombre:",
        input: "text",
        inputValidator: (nombreIngresado) => {
          if (!nombreIngresado) {
            return "El nombre no puede estar en blanco!";
          }
        },
      });

      if (nombreIngresado) {
        usuario.nombre = nombreIngresado;
        localStorage.setItem("usuario", JSON.stringify(usuario));
        actualizarPantalla();
      }
    })();
  }

  cambiarAltura() {
    //* Ejecuta una sweetalert para cambiar la altura del usuario
    (async () => {
      const { value: alturaIngresada } = await Swal.fire({
        title: "Modificar mi altura",
        input: "range",
        inputAttributes: {
          min: 120,
          max: 220,
          step: 1,
        },
        inputValue: usuario.altura,
      });

      if (alturaIngresada) {
        usuario.altura = alturaIngresada;
        localStorage.setItem("usuario", JSON.stringify(usuario));
        actualizarPantalla();
      }
    })();
  }

  ingresarPeso() {
    //* Ejecuta una sweet alert para registrar un peso con fecha y hora actual
    (async () => {
      const { value: pesoIngresado } = await Swal.fire({
        title: "Ingresar peso en Kg",
        input: "range",
        inputAttributes: {
          min: 40,
          max: 240,
          step: 1,
        },
        inputValue: usuario.ultimoPeso(),
      });

      if (pesoIngresado) {
        usuario.registrarPeso(parseInt(pesoIngresado));
        localStorage.setItem("usuario", JSON.stringify(usuario));
        actualizarPantalla();
      }
    })();
  }

  crearUsuario() {
    //* Carga inicial de datos de usuario. Solo debe llamarse si no existen datos en localStorage
    Swal.fire({
      title: "Ingrese sus datos",
      html:
        '<input id="swal-input1" class="swal2-input">' +
        "<label>Nombre</lable>" +
        '<input type="number" id="swal-input2" class="swal2-input">' +
        "<label>Altura (cm)</lable>" +
        '<input type="number" id="swal-input3" class="swal2-input">' +
        "<label>Peso (Kg)</lable>",
      confirmButtonText: "Registrar",
      focusConfirm: false,
      allowOutsideClick: false,
      preConfirm: () => {
        const nombreIngresado = document.getElementById("swal-input1").value;
        const alturaIngresada = parseInt(
          document.getElementById("swal-input2").value
        );
        const pesoIngresado = parseInt(
          document.getElementById("swal-input3").value
        );
        if (!nombreIngresado || !pesoIngresado || !alturaIngresada) {
          Swal.showValidationMessage(`Quedan campos vacios!`);
        }
        return [
          (this.nombre = nombreIngresado),
          (this.altura = alturaIngresada),
          this.registrarPeso(pesoIngresado),
          localStorage.setItem("usuario", JSON.stringify(usuario)),
          actualizarPantalla(),
        ];
      },
    });
  }
}

// * ------------------------------- Funciones --------------------------------------
function actualizarPantalla() {
  //* Renderiza datos en pantalla
  nombreUsuario.innerText = usuario?.nombre;
  alturaUsuario.innerHTML = `${usuario?.altura} cm`;
  infoPantalla[0].innerText = `${usuario?.ultimoPeso()} kg`;
  infoPantalla[1].innerText = `${usuario?.altura} cm`;
  infoPantalla[2].innerText = usuario.obtenerIMC();
  infoPantalla[3].innerText = usuario.obtenerClasificacion();
}

// * ---------------------------- Cosas visuales -----------------------------------
let nombreUsuario = document.getElementById("nombreUsuario");
let alturaUsuario = document.getElementById("alturaUsuario");
let infoPantalla = document.getElementsByClassName("infoPantalla");
let registrarPeso = document.getElementById("registrarPeso");

let botonMenu = document.getElementById("botonMenu");
botonMenu.onclick = () => mostrarMenu();

function mostrarMenu() {
  //* despliega u oculta el menú
  var x = document.getElementById("links");
  if (x.style.display === "inline-block") {
    x.style.display = "none";
  } else {
    x.style.display = "inline-block";
  }
}

var yValues = [65, 62, 63, 60, 59, 55, 53];

new Chart("lineas", {
  //* grafico de libreria chart.js
  type: "line",
  data: {
    labels: [
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
      "Domingo",
    ],
    datasets: [
      {
        fill: false,
        lineTension: 0.4,
        backgroundColor: "rgba(0,190,197,1.0)",
        borderColor: "rgba(255,11,172,1.0)",
        // borderWidth: 3,
        data: yValues,
      },
    ],
  },
  options: {
    legend: { display: false },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 50,
            max: 70,
            fontColor: "aliceblue",
            fontFamily: "Rajdhani",
            stepSize: 5,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            fontColor: "aliceblue",
            fontFamily: "Rajdhani",
          },
        },
      ],
    },
  },
});

// * ------------------------------- Ejecución --------------------------------------
usuario = new Persona();
localStorage.getItem("usuario")
  ? Object.assign(usuario, JSON.parse(localStorage.getItem("usuario")))
  : usuario.crearUsuario();

actualizarPantalla();

nombreUsuario.addEventListener("click", usuario.cambiarNombre);
alturaUsuario.addEventListener("click", usuario.cambiarAltura);
registrarPeso.addEventListener("click", usuario.ingresarPeso);
