let users = [];

document.getElementById("btnBuscar").addEventListener('click', obtenerUsers);

function actualizarVista() {
    let nombreBuscado = document.getElementById('txtNombre').value.toLowerCase();

    if (nombreBuscado === "") {
        renderizarLista(users);
    } else {
        let filtrados = users.filter(usr => usr.name.toLowerCase().includes(nombreBuscado));
        renderizarLista(filtrados);
    }
};

async function obtenerUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!response.ok) {
            throw new Error('Error al obtener datos');
        }

        users = await response.json();

        console.log('Datos recibidos:', users);

        actualizarVista();

    } catch (error) {
        console.error('Error:', error);
        alert('No se pudieron consultar los usuarios.');
    }
}

function renderizarLista(listaDeUsuariosFiltrados) {
    let listaUl = document.getElementById('listaUsuarios');
    listaUl.innerHTML = "";

    if (listaDeUsuariosFiltrados.length === 0) {
        listaUl.innerHTML = "<li>No se encontraron usuarios</li>";
        return;
    }

    listaDeUsuariosFiltrados.forEach((userFiltrado) => {
        let itemHTML = `
            <li>
                <span>                 
                    <strong>${userFiltrado.name}</strong><br>
                    <small>${userFiltrado.email}</small>
                </span>
            </li>
        `;
        listaUl.innerHTML += itemHTML;
    });
};