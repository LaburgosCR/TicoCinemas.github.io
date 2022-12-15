//Drop-down de tipo de Salas
const obtenerTiposDeSalas = async() => {
    await obtenerSalas('/obtener-sala')
        .then(response => {
            listarTiposDeSala(response);
        })
}

const listarTiposDeSala = (salas) => {
    var dropdownSalas = document.getElementById('tipoSalaPelicula');
    for (var i = 0; i < salas.length; i++) {
        dropdownSalas.innerHTML = dropdownSalas.innerHTML +
            '<option value="' + salas[i]['nombreSala'] + '">' + salas[i]['nombreSala'] + '</option>';
    }
}

obtenerTiposDeSalas();


const obtenerHorarioTanda = async() => {
    await obtenerSalasCartelera('/obtener-salasCartelera')
        .then(response => {
            listarHorario(response);
        })
}

const listarHorario = (horario) => {
    var dropdownHorario = document.getElementById('div-tipoid');
    for (var i = 0; i < horario.length; i++) {
        dropdownHorario.innerHTML = dropdownHorario.innerHTML +
            '<option value="' + horario[i]['horarioSalaCartelera'] + '">' + horario[i]['horarioSalaCartelera'] + '</option>';
    }
}

obtenerHorarioTanda();