// * -------------------------------- Clases ---------------------------------------
class Medicion {
  constructor(mFecha, mPeso) {
    this.fecha = mFecha;
    this.peso = mPeso;
  }

  mostrarMedicion() {
    console.log(
      `Peso registrado el ${this.fecha.toLocaleDateString()}: ${this.peso}Kg.`
    );
  }

  listarMediciones(mArrayMediciones) {
    console.log("Listando todas las mediciones.");
    for (const mMedicion of mArrayMediciones) {
      mMedicion.mostrarMedicion();
    }
  }

  generarDatosDePrueba(mDiasDeHistorial) {
    for (let dia = 0; dia < mDiasDeHistorial; dia++) {
      var pPesoRandom = Math.round(Math.random() * 20 + 80);
      var pDia = new Date();
      pDia.setDate(pDia.getDate() - mDiasDeHistorial);
      var pMedicion = new Medicion(pDia, pPesoRandom);
      mediciones.push(pMedicion);
    }
    mediciones.sort((a, b) => {
      if (a.fecha > b.fecha) {
        return 1;
      }
      if (a.fecha < b.fecha) {
        return -1;
      }
      return 0;
    });
    localStorage.setItem("mediciones", JSON.stringify(mediciones)); // * PERSISTENCIA DE ARRAY DE MEDICIONES
  }

  registrarPeso(mPeso) {
    var nuevaMedicion = new Medicion(new Date(), parseInt(mPeso));
    mediciones.push(nuevaMedicion);
    localStorage.setItem("mediciones", JSON.stringify(mediciones)); // * PERSISTENCIA DE ARRAY DE MEDICIONES
    this.actualizarPantalla();
  }

  actualizarPantalla() {
    var ultimoPeso = mediciones[mediciones.length - 1].peso;
    infoPantalla[0].innerText = ultimoPeso + "Kg";
    infoPantalla[1].innerText = usuario.altura + "cm";
    infoPantalla[2].innerText = usuario.calcularIndiceMasaCorporal(ultimoPeso);
    infoPantalla[3].innerText = usuario.determinarCategoria(usuario.calcularIndiceMasaCorporal(ultimoPeso));
  }
}

class Persona {
  constructor(mNombre, mAltura) {
    this.altura = mNombre;
    this.altura = mAltura;
  }
  calcularIndiceMasaCorporal(mPeso) {
    let indiceMasaMuscular = (
      (mPeso / (this.altura * this.altura)) * 10000).toFixed(2);
    return indiceMasaMuscular;
  }

  determinarCategoria(imc) {
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

  cambiarNombre(mNombre) {
    this.nombre = mNombre;
    nombreUsuario.innerText = this.nombre;
    localStorage.setItem('usuario', mNombre);
  }
  cambiarAltura(mAltura) {
    this.altura = parseInt(mAltura);
    if (mediciones?.length > 0){medicionGenerica.actualizarPantalla()}
    localStorage.setItem('altura', mAltura);
  }
}

class Modal {
  mostrarModal(pContenido) {
    contenedorModal.style.display = "block";
    contenedorModal.innerHTML = pContenido;
    let cerrarModal = document.getElementById("cerrarModal");
    cerrarModal.onclick = () => {
      contenedorModal.style.display = "none";
      contenedorModal.innerHTML = "";
    };
  }

  armarModalGenerico(mTitulo, mCampo, mFuncion) {
    var contenido = `<div class="contenidoModal">
      <span id="cerrarModal">&times;</span>
        <h3>${mTitulo}</h3>
        <input id="${mCampo}" type="text">
        <button id="guardar">Guardar</button>
    </div>`;
    this.mostrarModal(contenido);
    let guardar = document.getElementById("guardar");
    guardar.onclick = () => {
      contenedorModal.style.display = "none";
      mFuncion(document.getElementById(mCampo).value);
      contenedorModal.innerHTML = "";
    };
  }
}


// * -------------------------------- Globales --------------------------------------
let infoPantalla = document.getElementsByClassName("infoPantalla");
const unDia = 86400000;
let miModal = new Modal(); //? Manejo de modales
let contenedorModal = document.getElementById("contenedorModal");
let mediciones = []; //? Almacena historial de registros
const usuario = new Persona("Nombre no definido", 0); //? Almacena datos de usuario
const medicionGenerica = new Medicion(); //? Para utilizar métodos de la clase


// * ------------------------------- Eventos --------------------------------------
let nombreUsuario = document.getElementById("nombreUsuario");
nombreUsuario.addEventListener("click", cambiarNombre);

let alturaUsuario = document.getElementById("alturaUsuario");
alturaUsuario.addEventListener("click", cambiarAltura);

let registrarPeso = document.getElementById("registrarPeso");
registrarPeso.addEventListener("click", guardarPeso);

// * ------------------------------- Ejecución --------------------------------------
nombreUsuario.innerText = localStorage.getItem('usuario');

if (!nombreUsuario.innerText){
  cambiarNombre();
}

usuario.altura = parseInt(localStorage.getItem('altura'));

let medicionesAlmacenadas = JSON.parse(localStorage.getItem('mediciones'));

if (medicionesAlmacenadas?.length > 0){
  mediciones = medicionesAlmacenadas;
}

if(mediciones?.length > 0){
  medicionGenerica.actualizarPantalla();
}

// * ------------------------------- Funciones --------------------------------------
function cambiarNombre() {
  miModal.armarModalGenerico(
    "Ingrese su nombre",
    "nombre",
    usuario.cambiarNombre.bind(usuario)
  );
}

function cambiarAltura() {
  miModal.armarModalGenerico(
    "Ingrese su altura en cm",
    "altura",
    usuario.cambiarAltura.bind(usuario)
  );
}

function guardarPeso() {
  miModal.armarModalGenerico(
    "Ingrese su peso en Kg",
    "peso",
    medicionGenerica.registrarPeso.bind(medicionGenerica)
  );
}

// * ---------------------------- Cosas visuales -----------------------------------

let botonMenu = document.getElementById("botonMenu");
botonMenu.onclick = () => mostrarMenu();

function mostrarMenu() {
  var x = document.getElementById("links");
  if (x.style.display === "inline-block") {
    x.style.display = "none";
  } else {
    x.style.display = "inline-block";
  }
}

var yValues = [65, 62, 63, 60, 59, 55, 53];

new Chart("lineas", {
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
