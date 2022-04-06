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

  generarDatoPrueba(mDiasDeDiferencia) {
    var pPesoRandom = Math.round(Math.random() * 20 + 80);
    var pDia = new Date();
    pDia.setDate(pDia.getDate() - mDiasDeDiferencia);
    var pMedicion = new Medicion(pDia, pPesoRandom);
    return pMedicion;
  }
}

class Persona {
  constructor(mNombre, mAltura) {
    this.nombre = mNombre;
    this.altura = mAltura;
  }
  calcularIndiceMasaCorporal(mPeso) {
    let indiceMasaMuscular = ((mPeso / (this.altura * this.altura)) * 10000).toFixed(2);
    return indiceMasaMuscular;
  }

  determinarCategoria(imc) {
    switch (true) {
      case imc < 18.5:
        return "PESO BAJO";
      case imc >= 18.5 && imc < 25:
        return "NORMAL";
      case imc >= 25 && imc < 30:
        return "SOBREPESO";
      case imc >= 30:
        return "OBESIDAD";
    }
  }
}


// * -------------------------------- Globales --------------------------------------
const unDia = 86400000;
let opcionMenu = NaN;
let mediciones = []; //? Almacena historial de registros
const usuario = new Persona("Nombre no definido", 0); //? Almacena datos de usuario
const medicionGenerica = new Medicion(); //? Para utilizar métodos de la clase


// * ------------------------------- Ejecución --------------------------------------
console.log("Inicio de programa");
while (opcionMenu != 0) {
  opcionMenu = parseInt(
    prompt(
      "Elija una opción:\n1 - Ingresar nombre\n2 - Ingresar altura\n3 - Registrar peso\n4 - Listar mediciones\n5 - Generar datos random\n6 - Historial IMC\n0 - Terminar"
    )
  );
  switch (opcionMenu) {
    case 0:
      console.log("Programa terminado");
      break;

    case 1:
      usuario.nombre = prompt("Ingrese su nombre:");
      console.log(`Nombre de usuario es ${usuario.nombre}`);
      break;

    case 2:
      usuario.altura = parseInt(prompt("Ingrese su altura en cm"));
      console.log(`Altura ingresada: ${usuario.altura} cm.`);
      break;

    case 3:
      var pesoIngresado = parseInt(prompt("Ingrese su peso en Kg:"));
      var nuevaMedicion = new Medicion(new Date(), pesoIngresado);
      nuevaMedicion.mostrarMedicion();
      mediciones.push(nuevaMedicion);
      break;

    case 4:
      medicionGenerica.listarMediciones(mediciones);
      break;

    case 5:
      //? Genero un histórico por n días con pesos random y ordeno por fecha:
      var diasDeHistorial = parseInt(prompt("Cuantos días de historial?"));
      for (let dia = 0; dia < diasDeHistorial; dia++) {
        mediciones.push(medicionGenerica.generarDatoPrueba(dia));
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
      console.log(`Se auto-generó un historial de ${diasDeHistorial} días`);
      break;

    case 6:
      if(mediciones.length == 0){
        console.log("Error: no se registran mediciones. Registre su peso primero.");
      }else{
        if(usuario.altura == 0){
          console.log("Error: su altura no ha sido definida aún.")
        }else{
          for (const mMedicion of mediciones) {
            var mFecha = mMedicion.fecha.toLocaleDateString();
            var mIMC = usuario.calcularIndiceMasaCorporal(mMedicion.peso);
            var mCategoria = usuario.determinarCategoria(mIMC);
            console.log(`${mFecha} - ${mMedicion.peso}Kg - IMC ${mIMC} -> ${mCategoria}`);
          }
        }
      }
      
    break;

    default:
      console.log(`"${opcionMenu}" no es una opción válida!`);
      break;
  }
}


// * ----------------------------- Cosas visuales ------------------------------------
function mostrarMenu() {
  var x = document.getElementById("links");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}
