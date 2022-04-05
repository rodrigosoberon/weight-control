class Persona {
  constructor(nombre, altura, peso) {
    this.nombre = nombre;
    this.altura = altura;
    this.peso = peso;
  }
  calcularIndiceMasaCorporal() {
    let indiceMasaMuscular = (this.peso / (this.altura * this.altura)) * 10000;
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

function mostrarMenu() {
  var x = document.getElementById("links");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

/* let nombreUsuario = prompt("Ingrese su nombre:");
let alturaUsuario = parseInt(prompt("Ingrese su altura en centímetros (ej: 178):"));
let pesoUsuario = parseInt(prompt("Ingrese su peso en kilogramos:"));

const usuario = new Persona(nombreUsuario, alturaUsuario, pesoUsuario);
let imcUsuario = usuario.calcularIndiceMasaCorporal();

console.log("Hola " + usuario.nombre);
console.log("Tu indince de masa corporal es " + imcUsuario.toFixed(2));
console.log("Su categoría según índice es " + usuario.determinarCategoria(imcUsuario)); */
