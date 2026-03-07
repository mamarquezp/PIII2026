let tareas = [];

document.addEventListener('DOMContentLoaded', () => {
    let datosGuardados = localStorage.getItem('misTareas');
    if (datosGuardados) {
        tareas = JSON.parse(datosGuardados);
    }
    actualizarVista();
});

document.getElementById("btnAgregar").addEventListener('click', () => {
    let nombre = document.getElementById('txtNombre').value;
    let prioridad = document.getElementById('selPrioridad').value;

    if (nombre === "") {
        alert("Por favor escribe un nombre para la tarea nueva");
        return;
    }

    let nuevaTarea = {
        id: Date.now(), // ID único y automático
        titulo: nombre,
        prioridad: prioridad,
        completado: false
    };

    tareas.push(nuevaTarea);
    
    guardarEnStorage();
    actualizarVista();
    
    document.getElementById('txtNombre').value = ""; // Limpia campos
});

document.getElementById("selFiltro").addEventListener('change', actualizarVista);

function actualizarVista() {
    let prioridadFiltro = document.getElementById('selFiltro').value;

    if (prioridadFiltro === "Todas") {
        renderizarLista(tareas);
    } else {
        let filtrados = tareas.filter(tarea => tarea.prioridad === prioridadFiltro);
        renderizarLista(filtrados);
    }
};

function renderizarLista(arrayDeTareas) {
    let listaUl = document.getElementById('listaTareas');
    listaUl.innerHTML = ""; // Limpiamos la lista

    arrayDeTareas.forEach(tarea => {
        
        let claseCss = tarea.completado ? "completado" : "";

        let itemHTML = `
            <li class="${claseCss}">
                <span>
                    <strong>${tarea.titulo}</strong> 
                    <small>(${tarea.prioridad})</small>
                </span>
                <div>
                    <button class="btn-small" onclick="marcarCompletado(${tarea.id})">✔</button>
                    <button class="btn-small btn-danger" onclick="eliminarTarea(${tarea.id})">X</button>
                </div>
            </li>
        `;
        
        listaUl.innerHTML += itemHTML;
    });
}

function guardarEnStorage() {
    localStorage.setItem('misTareas', JSON.stringify(tareas));
}

window.marcarCompletado = (id) => {
    let encontrado = tareas.find(p => p.id === id);
    if (encontrado) {
        encontrado.completado = !encontrado.completado; // Invierte true/false
        guardarEnStorage();
        actualizarVista();
    }
};

window.eliminarTarea = (id) => {
    if(confirm("¿Seguro que deseas eliminarla?")) {
        tareas = tareas.filter(p => p.id !== id);
        guardarEnStorage();
        actualizarVista();
    }
};