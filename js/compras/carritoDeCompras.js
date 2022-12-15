const cuerpoTablaSalas = document.querySelector('#tbl-pago tbody');

let listaPagos = [];

const inicializarListaPagos = async() => {
    listaPagos = await obtenerPago('/obtener-pago');
    mostrarTablaPago('');
        //.then(response => {
        //    mostrarTablaCadenas(response);
        //})
        
};

const mostrarTablaPago = async() => {
    cuerpoTablaSalas.innerHTML = '';
    var f = '<input type="checkbox" id="complete" value="no">';
    
    listaPagos.forEach(objPago => {
        //if (objCadenaSalas.nombreCadenaSalas.toLowerCase().includes(filtroSalas.toLowerCase())) {
            let fila = cuerpoTablaSalas.insertRow();
            fila.insertCell().innerHTML = f;
            fila.insertCell().innerHTML = objPago.nombreTarjeta;
            fila.insertCell().innerHTML = objPago.numeroTarjeta;
            fila.insertCell().innerHTML = objPago.mesExpiracion + '/' + objPago.annoExpiracion;
            fila.insertCell().innerHTML = objPago.tipoTarjeta;

            let celdaBotones = fila.insertCell();

            let botonEditar = document.createElement('button');
            botonEditar.type = 'button';
            botonEditar.innerText = 'Editar';

            let botonEliminar = document.createElement('button');
            botonEliminar.type = 'button';
            botonEliminar.innerText = 'Eliminar';


            //Eliminar
            botonEliminar.addEventListener('click', async() => {
                let _id = objPago._id;
                await eliminarPago('/eliminar-pago',_id).then(response =>{
                    inicializarListaPagos();
                });
            });

            celdaBotones.appendChild(botonEliminar);
            celdaBotones.appendChild(botonGuardar);
            celdaBotones.appendChild(botonCancelar);
        //}        
    });
};

inicializarListaPagos();


