//Para acciones de categorías de películas
'use strict';
const botonRegistrarCategoriaPelicula = document.querySelector('#btn-registrar-categoriaPelicula');

const validarCategoriaPeliculas = async() => {
    let error = false;
    let campo = document.querySelector('#txt-categorias');

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
        let categoriaPelicula = {
            'codigoCategoriaPelicula': '000',
            'nombreCategoriaPelicula': document.querySelector('#txt-categorias').value
        };

        //1. variable con datos json, 2. end-point , 3. Página donde vamos a redireccionar después del registro
        await registrarCategoriaPelicula(categoriaPelicula, '/registrar-categoriaPelicula', 'mantenimientoDeCatalago.html').then(response => {;
            inicializarListaCategoriaPeliculas();
        });
    }
};

botonRegistrarCategoriaPelicula.addEventListener('click', validarCategoriaPeliculas);

const cuerpoTablaCategoriaPeliculas = document.querySelector('#tbl-categorias tbody');
const inputFiltroCateogria = document.querySelector('#txt-buscar-categoria');
let listaCategorias = [];

const inicializarListaCategoriaPeliculas = async() => {
    listaCategorias = await obtenerCategoriaPeliculas('/obtener-categoriaPelicula')
        //.then(response => {
    mostrarTablaCategoriaPeliculas('');
    //})
};

const mostrarTablaCategoriaPeliculas = (filtro) => {
    cuerpoTablaCategoriaPeliculas.innerHTML = '';
    listaCategorias.forEach(objCategoria => {
        if (objCategoria.nombreCategoriaPelicula.toLowerCase().includes(filtro.toLowerCase())) {
            let fila = cuerpoTablaCategoriaPeliculas.insertRow();
            fila.insertCell().innerHTML = objCategoria.codigoCategoriaPelicula;
            fila.insertCell().innerHTML = objCategoria.nombreCategoriaPelicula;

            let celdaBotones = fila.insertCell();

            let botonEditar = document.createElement('button');
            botonEditar.type = 'button';
            botonEditar.innerText = 'Editar';

            let botonEliminar = document.createElement('button');
            botonEliminar.type = 'button';
            botonEliminar.innerText = 'Eliminar';

            botonEliminar.addEventListener('click', async() => {
                let _id = objCategoria._id;
                await eliminarCategoriaPeliculas('/eliminar-categoriaPelicula', _id).then(response => {
                    inicializarListaCategoriaPeliculas();
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
                fila.cells[0].textContent = objCategoria.codigoCategoriaPelicula;
                fila.cells[1].textContent = objCategoria.nombreCategoriaPelicula;
                fila.contentEditable = false;
            });

            botonGuardar.addEventListener('click', async() => {
                botonGuardar.style.display = 'none';
                botonCancelar.style.display = 'none';
                botonEliminar.style.display = 'block';
                botonEditar.style.display = 'block';
                fila.contentEditable = false;
                let _id = objCategoria._id;
                let categoriaPelicula = {
                    '_id': _id,
                    'codigoCategoriaPelicula': fila.cells[0].textContent,
                    'nombreCategoriaPelicula': fila.cells[1].textContent
                };
                await actualizarCategoriaPelicula(categoriaPelicula, '/actualizar-categoriaPelicula', 'mantenimientoDeCatalago.html').then(response => {
                    inicializarListaCategoriaPeliculas();
                });
            });

            celdaBotones.appendChild(botonEditar);
            celdaBotones.appendChild(botonEliminar);
            celdaBotones.appendChild(botonGuardar);
            celdaBotones.appendChild(botonCancelar);
        }
    });
};
inicializarListaCategoriaPeliculas();

inputFiltroCateogria.addEventListener('keyup', () => {
    mostrarTablaCategoriaPeliculas(inputFiltroCateogria.value);
    console.log(inputFiltroCateogria.value)
});