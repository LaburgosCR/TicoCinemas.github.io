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

const cuerpoTablaPeliculas = document.querySelector('#tbl-peliculas tbody');
const inputCartelera = document.querySelector('#txt-filtro');
let listaPeliculas = [];

const inicializarListaPeliculas = async() => {
    listaPeliculas = await obtenerPeliculas('/obtener-pelicula');
    mostrarTablaPeliculas('');
    //.then(response => {
    //    mostrarTablaPeliculas(response);
    //})

};

const generarImagenPelicula = (urlImagen) => {
    var imagen = document.createElement('img');
    imagen.src = urlImagen;
    imagen.style.maxWidth = "50px";
    imagen.style.maxHeight = "50px";
    imagen.style.display = "block";
    return imagen;
}

const mostrarTablaPeliculas = async(filtro) => {
    cuerpoTablaPeliculas.innerHTML = '';

    listaPeliculas.forEach(objPelicula => {
        if (objPelicula.nombrePelicula.toLowerCase().includes(filtro.toLowerCase())) {
            let fila = cuerpoTablaPeliculas.insertRow();

            let fechaInicioPelicula = moment(objPelicula.fechaInicioPelicula).format('DD / MM / YYYY');
            let fechaFinalPelicula = moment(objPelicula.fechaFinalPelicula).format('DD / MM / YYYY');

            fila.insertCell().innerText = objPelicula.nombrePelicula;
            fila.insertCell().innerText = objPelicula.descripcionPelicula;
            fila.insertCell().innerText = objPelicula.duracionPelicula;
            fila.insertCell().innerText = objPelicula.nombreCadenaPelicula;
            fila.insertCell().innerText = objPelicula.lugarCadenaPelicula;
            fila.insertCell().innerText = objPelicula.categoriaPelicula;
            fila.insertCell().innerText = fechaInicioPelicula;
            fila.insertCell().innerText = fechaFinalPelicula;
            fila.insertCell().innerText = objPelicula.clasificacionPelicula;
            fila.insertCell().appendChild(generarImagenPelicula(objPelicula.fotoPelicula));


            let celdaBotones = fila.insertCell();

            let botonEditar = document.createElement('button');
            botonEditar.type = 'button';
            botonEditar.innerText = 'Editar';

            let botonEliminar = document.createElement('button');
            botonEliminar.type = 'button';
            botonEliminar.innerText = 'Eliminar';

            //Eliminar
            botonEliminar.addEventListener('click', async() => {
                let _id = objPelicula._id;
                await eliminarDatos('/eliminar-pelicula', _id);
                inicializarListaPeliculas();
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

                fila.cells[0].textContent = objPelicula.nombrePelicula;
                fila.cells[1].textContent = objPelicula.descripcionPelicula;
                fila.cells[2].textContent = objPelicula.duracionPelicula;
                fila.cells[3].textContent = objPelicula.nombreCadenaPelicula;
                fila.cells[4].textContent = objPelicula.lugarPelicula;
                fila.cells[5].textContent = objPelicula.fechaInicioPelicula;
                fila.cells[6].textContent = objPelicula.fechaFinalPelicula;
                fila.cells[7].textContent = objPelicula.claicificacionPelicula;
                fila.cells[8].textContent = objPelicula.fotoPelicula;
                fila.contentEditable = false;
            });

            botonGuardar.addEventListener('click', () => {
                botonGuardar.style.display = 'none';
                botonCancelar.style.display = 'none';
                botonEliminar.style.display = 'block';
                botonEditar.style.display = 'block';
                fila.contentEditable = false;
                let _id = objPelicula._id;
                let pelicula = {
                    '_id': _id,
                    'nombrePelicula': fila.cells[0].textContent,
                    'descripcionPelicula': fila.cells[1].textContent,
                    'duracionPelicula': fila.cells[2].textContent,
                    'nombreCadenaPelicula': fila.cells[3].textContent,
                    'lugarCadenaPelicula': fila.cells[4].textContent,
                    'categoriaPelicula': fila.cells[5].textContent,
                    'fechaInicioPelicula': fila.cells[6].textContent,
                    'fechaFinalPelicula': fila.cells[7].textContent,
                    'calificacionPelicula': fila.cells[8].textContent,
                    'fotoPelicula': fila.cells[9].textContent

                };
                actualizarPelicula(pelicula, '/actualizar-pelicula', 'mantenimientoCartelera.html');
            });

            celdaBotones.appendChild(botonEditar);
            celdaBotones.appendChild(botonEliminar);
            celdaBotones.appendChild(botonGuardar);
            celdaBotones.appendChild(botonCancelar);
        }
    });
};

inicializarListaPeliculas();

inputCartelera.addEventListener('keyup', () => {
    mostrarTablaPeliculas(inputCartelera.value);
    console.log(inputCartelera.value)
});

//Registrar peliculas//
'use strict';
const botonRegistrarCartelera = document.querySelector('#btn-registrarPelicula');


const validarCartelera = () => {
    let error = false;
    let camposRequeridos = document.querySelectorAll(':required');

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
            'title': 'No se ha podido registrar la película',
            'text': 'Por favor revise los campos resaltados',
            'confirmButtonText': 'Entendido'
        });
    } else {
        let pelicula = {
            'nombrePelicula': document.querySelector('#txt-nombrePelicula').value,
            'descripcionPelicula': document.querySelector('#txt-descripcionPelicula').value,
            'duracionPelicula': document.querySelector('#time-duracionPelicula').value,
            'nombreCadenaPelicula': document.querySelector('#slt-nombreCadenaPelicula').value,
            'lugarCadenaPelicula': document.querySelector('#slt-lugarCadenaPelicula').value,
            'categoriaPelicula': document.querySelector('#slt-categoriaPelicula').value,
            'fechaInicioPelicula': document.querySelector('#txt-fechaInicioPelicula').value,
            'fechaFinalPelicula': document.querySelector('#txt-fechaFinalPelicula').value,
            'clasificacionPelicula': document.querySelector('#slt-clasificacionPelicula').value,
            'fotoPelicula': document.querySelector('#imagenPelicula').src,
        };

        //1. variable con datos json, 2. end-point , 3. Página donde vamos a redireccionar después del registro
        registrarPelicula(pelicula, '/registrar-pelicula', 'mantenimientoCartelera.html');
        inicializarListaPeliculas();
    }
};

botonRegistrarCartelera.addEventListener('click', validarCartelera);



const obtenerListaCadenas = async() => {
    await obtenerCadenas('/obtener-cadena')
        .then(response => {
            listarCadenasCartelera(response);
        })
}

const listarCadenasCartelera = (cadenaCartelera) => {
    var dropdownCadenaCartelera = document.getElementById('slt-nombreCadenaPelicula');
    for (var i = 0; i < cadenaCartelera.length; i++) {
        dropdownCadenaCartelera.innerHTML = dropdownCadenaCartelera.innerHTML +
            '<option value="' + cadenaCartelera[i]['nombreCadena'] + '">' + cadenaCartelera[i]['nombreCadena'] + '</option>';
    }
}


const obtenerListaLugarCadenas = async() => {
    await obtenerCadenas('/obtener-cadena')
        .then(response => {
            listarLugarCadenas(response);
        })
}

const listarLugarCadenas = (lugarCartelera) => {
    var dropdownLugarCadena = document.getElementById('slt-lugarCadenaPelicula');
    for (var i = 0; i < lugarCartelera.length; i++) {
        dropdownLugarCadena.innerHTML = dropdownLugarCadena.innerHTML +
            '<option value="' + lugarCartelera[i]['nombreLugarCadena'] + '">' + lugarCartelera[i]['nombreLugarCadena'] + '</option>';
    }
}


const obtenerCategoria = async() => {
    await obtenerCategoriaPeliculas('/obtener-categoriaPelicula')
        .then(response => {
            listarCategorias(response);
        })
}

const listarCategorias = (categoriaCartelera) => {
    var dropdownCategoriaCartelera = document.getElementById('slt-categoriaPelicula');
    for (var i = 0; i < categoriaCartelera.length; i++) {
        dropdownCategoriaCartelera.innerHTML = dropdownCategoriaCartelera.innerHTML +
            '<option value="' + categoriaCartelera[i]['nombreCategoriaPelicula'] + '">' + categoriaCartelera[i]['nombreCategoriaPelicula'] + '</option>';
    }
}



obtenerListaCadenas();
obtenerListaLugarCadenas();
obtenerCategoria();