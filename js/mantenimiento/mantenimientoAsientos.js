//Para acciones de salas
'use strict';
const botonRegistrarAsiento = document.querySelector('#btn-registrar-asiento');
const form = document.getElementById("form-asientos");

const validarAsiento = async() => {
    let error = false;
    let campo = document.querySelector('#txt-asiento');

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
        let asiento = {
            'codigoAsiento': '000',
            'nombreAsiento': document.querySelector('#txt-asiento').value
        };

        //1. variable con datos json, 2. end-point , 3. Página donde vamos a redireccionar después del registro
        await registrarAsiento(asiento, '/registrar-asiento', 'mantenimientoDeCatalago.html').then(response => {
            console.log(form)
            form.reset();
            inicializarListaAsientos();
        });
    }
};

botonRegistrarAsiento.addEventListener('click', validarAsiento);

const cuerpoTablaAsientos = document.querySelector('#tbl-asiento tbody');

const inicializarListaAsientos = async() => {
    await obtenerAsientos('/obtener-asiento')
        .then(response => {
            mostrarTablaAsientos(response);
        })
};

const mostrarTablaAsientos = (asientos) => {
    cuerpoTablaAsientos.innerHTML = '';
    asientos.forEach(objAsiento => {
        let fila = cuerpoTablaAsientos.insertRow();
        fila.insertCell().innerHTML = objAsiento.codigoAsiento;
        fila.insertCell().innerHTML = objAsiento.nombreAsiento;

        let celdaBotones = fila.insertCell();

        let botonEditar = document.createElement('button');
        botonEditar.type = 'button';
        botonEditar.innerText = 'Editar';

        let botonEliminar = document.createElement('button');
        botonEliminar.type = 'button';
        botonEliminar.innerText = 'Eliminar';

        //Botones de editar
        let botonGuardar = document.createElement('button');
        botonGuardar.type = 'button';
        botonGuardar.innerText = 'Guardar';
        botonGuardar.style.display = 'none';

        let botonCancelar = document.createElement('button');
        botonCancelar.type = 'button';
        botonCancelar.innerText = 'Cancelar';
        botonCancelar.style.display = 'none';

        botonEliminar.addEventListener('click', async() => {
            let _id = objAsiento._id;
            await eliminarAsientos('/eliminar-asiento', _id).then(response => {
                inicializarListaAsientos();
            });
        });

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
            fila.cells[0].textContent = objAsiento.codigoAsiento;
            fila.cells[1].textContent = objAsiento.nombreAsiento;
            fila.contentEditable = false;
        });

        botonGuardar.addEventListener('click', async() => {
            botonGuardar.style.display = 'none';
            botonCancelar.style.display = 'none';
            botonEliminar.style.display = 'block';
            botonEditar.style.display = 'block';
            fila.contentEditable = false;
            let _id = objAsiento._id;
            let asiento = {
                '_id': _id,
                'codigoAsiento': fila.cells[0].textContent,
                'nombreAsiento': fila.cells[1].textContent
            };
            await actualizarAsiento(asiento, '/actualizar-asiento', 'mantenimientoDeCatalago.html').then(response => {
                inicializarListaAsientos();
            });
        });

        celdaBotones.appendChild(botonEditar);
        celdaBotones.appendChild(botonEliminar);
        celdaBotones.appendChild(botonGuardar);
        celdaBotones.appendChild(botonCancelar);
    });
};
inicializarListaAsientos();