//Mostrar datos//

const cuerpoTablaSalas = document.querySelector('#tbl-salas tbody');
const inputFiltroSalas = document.querySelector('#txt-buscar');
let listaCadenasSalas = [];

const inicializarListaCadenasSalas = async() => {
    listaCadenasSalas = await obtenerCadenaSalas('/obtener-cadenaSalas');
    mostrarTablaCadenasSalas('');
    //.then(response => {
    //    mostrarTablaCadenas(response);
    //})

};

const mostrarTablaCadenasSalas = async(filtroSalas) => {
    cuerpoTablaSalas.innerHTML = '';

    listaCadenasSalas.forEach(objCadenaSalas => {
        if (objCadenaSalas.nombreCadenaSalas.toLowerCase().includes(filtroSalas.toLowerCase())) {
            let fila = cuerpoTablaSalas.insertRow();
            fila.insertCell().innerHTML = objCadenaSalas.nombreCadenaSalas;
            fila.insertCell().innerHTML = objCadenaSalas.nombreLugarCadena;
            fila.insertCell().innerHTML = objCadenaSalas.codigoSala;
            fila.insertCell().innerHTML = objCadenaSalas.nombreSala;

            let celdaBotones = fila.insertCell();

            let botonEditar = document.createElement('button');
            botonEditar.type = 'button';
            botonEditar.innerText = 'Editar';

            let botonEliminar = document.createElement('button');
            botonEliminar.type = 'button';
            botonEliminar.innerText = 'Eliminar';


            //Eliminar
            botonEliminar.addEventListener('click', async() => {
                let _id = objCadenaSalas._id;
                await eliminarDatosSalas('/eliminar-cadenaSalas', _id).then(response => {
                    inicializarListaCadenasSalas();
                });
            });

            //Editar
            let botonGuardar = document.createElement('button');
            botonGuardar.type = 'button';
            botonGuardar.innerText = 'Guardar';
            botonGuardar.style.display = 'none';

            let botonCancelar = document.createElement('button');
            botonCancelar.type = 'button';
            botonCancelar.innerText = 'Cancelar';
            botonCancelar.style.display = 'none';



            botonEditar.addEventListener('click', () => {
                botonGuardar.style.display = 'block';
                botonCancelar.style.display = 'block';
                botonEliminar.style.display = 'none';
                botonEditar.style.display = 'none';
                fila.contentEditable = true;
            });

            botonCancelar.addEventListener('click', () => {
                botonGuardar.style.display = 'none';
                botonCancelar.style.display = 'none';
                botonEliminar.style.display = 'block';
                botonEditar.style.display = 'block';
                fila.cells[0].textContent = objCadena.nombreCadenaSalas;
                fila.cells[1].textContent = objCadena.nombreLugarCadena;
                fila.cells[2].textContent = objCadena.codigoSala;
                fila.cells[3].textContent = objCadena.nombreSala;
                fila.contentEditable = false;
            });

            botonGuardar.addEventListener('click', () => {
                botonGuardar.style.display = 'none';
                botonCancelar.style.display = 'none';
                botonEliminar.style.display = 'block';
                botonEditar.style.display = 'block';
                fila.contentEditable = false;
                let _id = objCadenaSalas._id;
                let cadenaSalas = {
                    '_id': _id,
                    'nombreCadenaSalas': fila.cells[0].textContent,
                    'nombreLugarCadena': fila.cells[1].textContent,
                    'codigoSala': fila.cells[2].textContent,
                    'nombreSala': fila.cells[3].textContent,
                };
                actualizarCadenaSalas(cadenaSalas, '/actualizar-cadenaSalas', 'mantenimientoCadenasCine.html');
            });

            celdaBotones.appendChild(botonEditar);
            celdaBotones.appendChild(botonEliminar);
            celdaBotones.appendChild(botonGuardar);
            celdaBotones.appendChild(botonCancelar);
        }
    });
};

inicializarListaCadenasSalas();

inputFiltroSalas.addEventListener('keyup', () => {
    mostrarTablaUsuarios(inputFiltroSalas.value);
    console.log(inputFiltroSalas.value)
});


//registrar
'use strict';
const botonRegistrarSala = document.querySelector('#btn-registrarSalas');
const formSalas = document.getElementById("formularioSalas");

const camposCadena = document.querySelector('#txt-cadena');
const camposLugarCadena = document.querySelector('#txt-lugarCadena');
const camposCodigoSala = document.querySelector('#txt-codigoSala');
const camposNombreSala = document.querySelector('#txt-nombreSala');

const validarSalas = () => {
    let errorSalas = false;

    if (camposCadena.value == '' || camposCadena.value == '0') {
        errorSalas = true;
        document.querySelector('.cadena').classList.add('select-error');
    } else {
        document.querySelector('.cadena').classList.remove('select-error');
    }

    if (camposLugarCadena.value == '' || camposLugarCadena.value == '0') {
        errorSalas = true;
        document.querySelector('.lugarCadena').classList.add('select-error');
    } else {
        document.querySelector('.lugarCadena').classList.remove('select-error');
    }

    if (camposCodigoSala.value == '' || camposCodigoSala.value == '0') {
        errorSalas = true;
        document.querySelector('.codigoSala').classList.add('input-error');
    } else {
        document.querySelector('.codigoSala').classList.remove('input-error');
    }

    if (camposNombreSala.value == '' || camposNombreSala.value == '0') {
        errorSalas = true;
        document.querySelector('.nombreSala').classList.add('select-error');
    } else {
        document.querySelector('.nombreSala').classList.remove('select-error');
    }



    if (errorSalas == true) {
        Swal.fire({
            'icon': 'warning',
            'title': 'No se ha podido registrar la sala a la cadena',
            'text': 'Por favor revise los campos resaltados'
        });
    } else {
        let cadenaSalas = {
            'nombreCadenaSalas': document.querySelector('#txt-cadena').value,
            'nombreLugarCadena': document.querySelector('#txt-lugarCadena').value,
            'codigoSala': document.querySelector('#txt-codigoSala').value,
            'nombreSala': document.querySelector('#txt-nombreSala').value,
        };

        //1. variable con datos json, 2. end-point , 3. Página donde vamos a redireccionar después del registro

        registrarCadenaSala(cadenaSalas, '/registrar-cadenaSalas', 'mantenimientoCadenasCine.html');
        camposCadena.value = " ";
        camposLugarCadena.value = " ";
        camposCodigoSala.value = " ";
        camposNombreSala.value = " ";

        formSalas.reset();

    }
};

botonRegistrarSala.addEventListener('click', validarSalas);
//Drop-down de tipo de Salas
const obtenerTiposDeSalas = async() => {
 
    await obtenerSalas('/obtener-sala')
        .then(response => {
            listarTiposDeSala(response);
        })
}

const listarTiposDeSala = (salas) => {
    var dropdownSalas = document.getElementById('txt-nombreSala');
    for (var i = 0; i < salas.length; i++) {
        dropdownSalas.innerHTML = dropdownSalas.innerHTML +
            '<option value="' + salas[i]['nombreSala'] + '">' + salas[i]['nombreSala'] + '</option>';
    }
}

obtenerTiposDeSalas();