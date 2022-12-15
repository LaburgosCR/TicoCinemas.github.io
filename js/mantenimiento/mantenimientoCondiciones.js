//Para acciones de salas
'use strict';
const botonRegistrarCondicion = document.querySelector('#btn-registrar-condicion');

const validarCondicion = async() => {
    let error = false;
    let campo = document.querySelector('#txt-condiciones');

    if (campo.value == '') {
        campo.classList.add('input-error');
        error = true;
    } else {
        campo.classList.remove('input-error');
    }

    if (error == true) {
        Swal.fire({
            'icon': 'warning',
            'title': 'No se ha podido registrar el dato',
            'text': 'Por favor revise los campos resaltados'
        });
    } else {
        let condicion = {
            'codigoCondicion': '000',
            'nombreCondicion': document.querySelector('#txt-condiciones').value
        };

        //1. variable con datos json, 2. end-point , 3. Página donde vamos a redireccionar después del registro
        await registrarCondicion(condicion, '/registrar-condicion', 'mantenimientoDeCatalago.html').then(response => {
            inicializarListaCondiciones();
        });
    }
};

botonRegistrarCondicion.addEventListener('click', validarCondicion);

const cuerpoTablaCondiciones = document.querySelector('#tbl-condiciones tbody');
const inputFiltroCondicion = document.querySelector('#txt-buscar-condicion');
let listaCondiciones = [];

const inicializarListaCondiciones = async() => {
    listaCondiciones = await obtenerCondicion('/obtener-condicion')
        //.then(response => {
    mostrarTablaCondiciones('');
    //})
};

const mostrarTablaCondiciones = (filtro) => {
    cuerpoTablaCondiciones.innerHTML = '';
    listaCondiciones.forEach(objCondicion => {
        if (objCondicion.nombreCondicion.toLowerCase().includes(filtro.toLowerCase())) {
            let fila = cuerpoTablaCondiciones.insertRow();
            fila.insertCell().innerHTML = objCondicion.codigoCondicion;
            fila.insertCell().innerHTML = objCondicion.nombreCondicion;

            let celdaBotones = fila.insertCell();

            let botonEditar = document.createElement('button');
            botonEditar.type = 'button';
            botonEditar.innerText = 'Editar';

            let botonEliminar = document.createElement('button');
            botonEliminar.type = 'button';
            botonEliminar.innerText = 'Eliminar';

            botonEliminar.addEventListener('click', async() => {
                let _id = objCondicion._id;
                await eliminarCondiciones('/eliminar-condicion', _id).then(response => {
                    inicializarListaCondiciones();
                });
            });

            //Botones de editar
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
                fila.cells[0].textContent = objCondicion.codigoCondicion;
                fila.cells[1].textContent = objCondicion.nombreCondicion;
                fila.contentEditable = false;
            });

            botonGuardar.addEventListener('click', async() => {
                botonGuardar.style.display = 'none';
                botonCancelar.style.display = 'none';
                botonEliminar.style.display = 'block';
                botonEditar.style.display = 'block';
                fila.contentEditable = false;
                let _id = objCondicion._id;
                let condicion = {
                    '_id': _id,
                    'codigoCondicion': fila.cells[0].textContent,
                    'nombreCondicion': fila.cells[1].textContent
                };
                await actualizarCondicion(condicion, '/actualizar-condicion', 'mantenimientoDeCatalago.html').then(response => {
                    inicializarListaCondiciones();
                });
            });

            celdaBotones.appendChild(botonEditar);
            celdaBotones.appendChild(botonEliminar);
            celdaBotones.appendChild(botonGuardar);
            celdaBotones.appendChild(botonCancelar);
        }
    });
};
inicializarListaCondiciones();

inputFiltroCondicion.addEventListener('keyup', () => {
    mostrarTablaCondiciones(inputFiltroCondicion.value);
    console.log(inputFiltro.value)
});