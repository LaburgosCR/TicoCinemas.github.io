function abrirMenu(evt, opcionMenu) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(opcionMenu).style.display = "block";
    evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();



//Mostrar datos//

const cuerpoTablaCadenas = document.querySelector('#tbl-cadenas tbody');
const inputFiltro = document.querySelector('#txt-filtro');
let listaCadenas = [];

const inicializarListaCadenas = async() => {
    listaCadenas = await obtenerCadenas('/obtener-cadena');
    mostrarTablaCadenas('');
    //.then(response => {
    //    mostrarTablaCadenas(response);
    //})

};

const mostrarTablaCadenas = async(filtro) => {
    cuerpoTablaCadenas.innerHTML = '';

    listaCadenas.forEach(objCadena => {
        if (objCadena.nombreCadena.toLowerCase().includes(filtro.toLowerCase()) || objCadena.nombreLugarCadena.toLowerCase().includes(filtro.toLowerCase())) {
            let fila = cuerpoTablaCadenas.insertRow();
            fila.insertCell().innerHTML = objCadena.codigoCadena;
            fila.insertCell().innerHTML = objCadena.nombreCadena;
            fila.insertCell().innerHTML = objCadena.nombreLugarCadena;
            fila.insertCell().innerHTML = objCadena.provincia;
            fila.insertCell().innerHTML = objCadena.canton;
            fila.insertCell().innerHTML = objCadena.distrito;
            fila.insertCell().appendChild(generarImagen(objCadena.logoCadena));

            let celdaBotones = fila.insertCell();

            let botonEditar = document.createElement('button');
            botonEditar.type = 'button';
            botonEditar.innerText = 'Editar';

            let botonEliminar = document.createElement('button');
            botonEliminar.type = 'button';
            botonEliminar.innerText = 'Eliminar';


            //Eliminar
            botonEliminar.addEventListener('click', async() => {
                let _id = objCadena._id;
                await eliminarDatos('/eliminar-cadena', _id).then(response => {
                    inicializarListaCadenas();
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
                fila.cells[0].textContent = objCadena.codigoCadena;
                fila.cells[1].textContent = objCadena.nombreCadena;
                fila.cells[2].textContent = objCadena.nombreLugarCadena;
                fila.cells[3].textContent = objCadena.provincia;
                fila.cells[4].textContent = objCadena.canton;
                fila.cells[5].textContent = objCadena.distrito;
                fila.cells[6].textContent = objCadena.logoCadena;
                fila.contentEditable = false;
            });

            botonGuardar.addEventListener('click', () => {
                botonGuardar.style.display = 'none';
                botonCancelar.style.display = 'none';
                botonEliminar.style.display = 'block';
                botonEditar.style.display = 'block';
                fila.contentEditable = false;
                let _id = objCadena._id;
                let cadena = {
                    '_id': _id,
                    'codigoCadena': fila.cells[0].textContent,
                    'nombreCadena': fila.cells[1].textContent,
                    'nombreLugarCadena': fila.cells[2].textContent,
                    'provincia': fila.cells[3].textContent,
                    'canton': fila.cells[4].textContent,
                    'distrito': fila.cells[5].textContent,
                    'logoCadena': fila.cells[6].textContent

                };
                actualizarCadenas(cadena, '/actualizar-cadena', 'mantenimientoCadenasCine.html');
            });

            celdaBotones.appendChild(botonEditar);
            celdaBotones.appendChild(botonEliminar);
            celdaBotones.appendChild(botonGuardar);
            celdaBotones.appendChild(botonCancelar);
        }


    });
};
inicializarListaCadenas();

inputFiltro.addEventListener('keyup', () => {
    mostrarTablaUsuarios(inputFiltro.value);
    console.log(inputFiltro.value)
});



//Registrar cadenas//
'use strict';
const botonRegistrar = document.querySelector('#btn-registrar');
const form = document.getElementById("formulario");

const validar = async() => {
    let error = false;
    let camposRequeridos = document.querySelectorAll(':required');
    let select1 = document.querySelector('#slt-canton');
    let select2 = document.querySelector('#slt-provincia');
    let select3 = document.querySelector('#slt-distrito');

    camposRequeridos.forEach(campo => {
        if (campo.value == '' || campo.value == '0') {
            campo.classList.add('input-error');
            campo.classList.add('select-error');
            error = true;
        } else {
            campo.classList.remove('input-error');
            campo.classList.remove('select-error');
        }
    });

    if (error == true) {
        Swal.fire({
            'icon': 'warning',
            'title': 'No se ha podido registrar la cadena de cine',
            'text': 'Por favor revise los campos resaltados'
        });
    } else {
        let cadena = {
            'codigoCadena': document.querySelector('#txt-codigoCadena').value,
            'nombreCadena': document.querySelector('#txt-nombreCadena').value,
            'nombreLugarCadena': document.querySelector('#txt-nombreLugarCadena').value,
            'provincia': document.querySelector('#slt-provincia').value,
            'canton': document.querySelector('#slt-canton').value,
            'distrito': document.querySelector('#slt-distrito').value,
            'logoCadena': document.querySelector('#foto-cadena').src,
        };

        //1. variable con datos json, 2. end-point , 3. Página donde vamos a redireccionar después del registro
        await registrarCadena(cadena, '/registrar-cadena', 'mantenimientoCadenasCine.html').then(response => {
            select1.value = "";
            select2.value = "";
            select3.value = "";
            inicializarListaCadenas();

        });



        form.reset();


    }
};

botonRegistrar.addEventListener('click', validar);


const obtenerNombreCadena = async() => {
    await obtenerCadenas('/obtener-cadena')
        .then(response => {
            listarNombreCadena(response);
        })
}

const listarNombreCadena = (nombreCadena) => {

    var dropdownNombreCadena = document.getElementById('txt-cadena');
    for (var i = 0; i < nombreCadena.length; i++) {
        dropdownNombreCadena.innerHTML = dropdownNombreCadena.innerHTML +
            '<option value="' + nombreCadena[i]['nombreCadena'] + '">' + nombreCadena[i]['nombreCadena'] + '</option>';
    }
}

obtenerNombreCadena();

//Drop-down de nombre del lugar de la cadena en asignar salas

const obtenerNombreLugarCadena = async() => {
    await obtenerCadenas('/obtener-cadena')
        .then(response => {
            listarNombreLugarCadena(response);
        })

}

const listarNombreLugarCadena = (nombreLugarCadena) => {

    var dropdownNombreLugarCadena = document.getElementById('txt-lugarCadena');

    for (var i = 0; i < nombreLugarCadena.length; i++) {
        dropdownNombreLugarCadena.innerHTML = dropdownNombreLugarCadena.innerHTML +
            '<option value="' + nombreLugarCadena[i]['nombreLugarCadena'] + '">' + nombreLugarCadena[i]['nombreLugarCadena'] + '</option>';
    }

}

inicializarListaCadenas();

inputFiltro.addEventListener('keyup', () => {
    mostrarTablaCadenas(inputFiltro.value);
    console.log(inputFiltro.value)
});


//Drop-down de nombre de cadena en asignar salas



obtenerNombreLugarCadena();

//Imagen
const generarImagen = (urlImagen) => {
    var imagen = document.createElement('img');
    imagen.src = urlImagen;
    imagen.style.maxWidth = "100px";
    imagen.style.maxHeight = "100px";
    imagen.style.display = "block";
    return imagen;
}