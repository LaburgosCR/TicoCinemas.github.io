"use strict";
const botonIngresar = document.querySelector("#txt-ingresar");
const inputCorreo = document.querySelector("#txt-correo");
const inputPassword = document.querySelector("#txt-password");

const login = async() => {


    let islogin = await FindUser("/obtener-usuarios", inputCorreo.value, inputPassword.value)
    if (!islogin) {
        Swal.fire({
            "icon": "warning",
            "title": "No ha podido iniciar sesión",
            "text": "Usuario o Contraseña incorrectos",
            "confirmButtonText": "Entendido!"
        });
    }
}

const validar = () => {
    let error = false;

    //condicion que valida correo
    if (inputCorreo.value == "") {
        error = true;
        document.querySelector(".div-correo").classList.add("input-error");
    } else {
        document.querySelector(".div-correo").classList.remove("input-error");
    }
    //condicion que valida password
    if (inputPassword.value == "") {
        error = true;
        document.querySelector(".div-password").classList.add("input-error");
    } else {
        document.querySelector(".div-password").classList.remove("input-error");
    }
    //condicion que valida si hay error o no
    if (error == true) {
        Swal.fire({
            "icon": "warning",
            "title": "No ha podido iniciar sesión",
            "text": "Por favor revise los espacios marcados",
            "confirmButtonText": "Entendido!"
        });
    } else {

        login();

        /*validarCredenciales(inputCorreo.value, inputPassword.value);*/
    }
};
botonIngresar.addEventListener("click", validar);