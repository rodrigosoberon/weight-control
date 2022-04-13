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
  }

  registrarPeso(){
    var nuevaMedicion = new Medicion(new Date(), parseInt(prompt("Ingrese su peso:")));
    mediciones.push(nuevaMedicion);
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
    this.nombre = mNombre;
    this.altura = mAltura;
  }
  calcularIndiceMasaCorporal(mPeso) {
    let indiceMasaMuscular = (
      (mPeso / (this.altura * this.altura)) *
      10000
    ).toFixed(2);
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

  cambiarNombre(){
    this.nombre = prompt("Ingrese su nombre:");
    var nombreUsuario = document.getElementById("nombreUsuario");
    nombreUsuario.innerText = this.nombre;
  }
}

class Modal{
  constructor(mTitulo, mContenido){
    this.titulo = mTitulo;
    this.contenido = mContenido;
  }

  mostrarModal(){
    contenedorModal.style.display = "block";
    contenedorModal.innerHTML = `<div class="contenidoModal"><span id="cerrarModal">&times;</span><h3>${this.titulo}</h3>${this.contenido}</div>`;
    let cerrarModal = document.getElementById("cerrarModal");
    cerrarModal.onclick = () => {contenedorModal.style.display = "none";contenedorModal.innerHTML = "";}
  }
}

// * -------------------------------- Globales --------------------------------------
let infoPantalla = document.getElementsByClassName("infoPantalla");
const unDia = 86400000;
// let opcionMenu = NaN;
let mediciones = []; //? Almacena historial de registros
const usuario = new Persona("Nombre no definido", 0); //? Almacena datos de usuario
const medicionGenerica = new Medicion(); //? Para utilizar métodos de la clase

// * ------------------------------- Ejecución --------------------------------------

usuario.cambiarNombre();
usuario.altura = parseInt(prompt("Ingrese su altura en centimetros:"));
medicionGenerica.registrarPeso();

let botonRegistrar = document.getElementById("registrar-peso");
botonRegistrar.onclick = () => medicionGenerica.registrarPeso();

let contenedorModal = document.getElementById("contenedorModal");

let miModal = new Modal("Titulo del modal", "<p>Contenido del modal</p>",);
miModal.mostrarModal();



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
