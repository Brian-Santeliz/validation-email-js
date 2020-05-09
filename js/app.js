//variables
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");
const btn = document.querySelector("#enviar");
const form = document.querySelector("#enviar-mail");
const resetBtn = document.querySelector("#resetBtn");

//event listeners
eventListeners();
function eventListeners() {
  //inicio de la app y deshabilitar boton.
  document.addEventListener("DOMContentLoaded", inicioApp);

  //campos del formulario.
  email.addEventListener("blur", validarCampo);
  asunto.addEventListener("blur", validarCampo);
  mensaje.addEventListener("blur", validarCampo);

  //cuando se ejecuta submit
  btn.addEventListener("click", submitForm);

  //cuando presionar reset btn
  resetBtn.addEventListener("click", resetForm);
}

//funciones

function inicioApp() {
  //cuando se cargue el documento deshabilita el btn.
  btn.disabled = true;
}

//valida que el campo tenga algo escrito

function validarCampo() {
  //almacena todos los inpurt que tienen la clase de error activa
  let errores = document.querySelectorAll(".error");

  //se valida la longitud del texto y que no este vacia
  validarLongitud(this); //objeto contexto, devuelve el input actual.

  //funcion para validad que lo que se ingresa sea un email
  if (this.type === "email") {
    validarEmail(this);
  }
  //valida que los compos no esten vacios y no tenga la clase "error"
  if (
    email.value.trim() !== "" &&
    asunto.value.trim() !== "" &&
    mensaje.value.trim() !== ""
  ) {
    if (errores.length === 0) {
      btn.disabled = false;
    }
  }
}

//veifica la longitud del texto en el campo
function validarLongitud(campo) {
  //si la longigutd del valor ingresado es mayor a 0 entonces...
  if (campo.value.length > 0) {
    campo.style.borderBottomColor = "green"; //agrego estilo personalizado
    campo.classList.remove("error");
  } else {
    campo.style.borderBottomColor = "red"; //agrego estilo
    campo.classList.add("error"); //agregando clase de error
  }
}

//validar el email
function validarEmail(campo) {
  textoEmail = campo.value;
  //comprueba si existe "@" y no retorna -1
  if (textoEmail.indexOf("@") !== -1) {
    campo.style.borderBottomColor = "green"; //agrego estilo personalizado
    campo.classList.remove("error");
  } else {
    campo.style.borderBottomColor = "red"; //agrego estilo
    campo.classList.add("error"); //agregando clase de error
  }
}

//enviando formulario
function submitForm(e) {
  e.preventDefault();

  //mostrando spinner al presionar enviar
  const spinerGif = document.querySelector("#spinner");
  spinerGif.style.display = "block";

  //mostrando gif que envia el email
  const enviado = document.createElement("img");
  enviado.src = "img/mail.gif";
  enviado.style.display = "block";

  //ocualtar spinner y mostrar enviado gif

  setTimeout(() => {
    spinerGif.style.display = "none";

    //appendChild requiere un padre
    let padreGif = document.querySelector("#loaders");
    padreGif = padreGif.appendChild(enviado);
    setTimeout(() => {
      enviado.remove(); //elimna el elemento
      form.reset(); //resetea el formulario
    }, 5000);
  }, 3000);
}

//resetea el formulario
function resetForm(e) {
  e.preventDefault();
  form.reset();
}
