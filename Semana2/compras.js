let productos = [];

document.addEventListener('DOMContentLoaded', () => {
    let datosGuardados = localStorage.getItem('misCompras');
    if (datosGuardados) {
        post = JSON.parse(datosGuardados);
    }
    actualizarVista();
});

document.getElementById("btnAgregar").addEventListener('click', () => {
    let nombre = document.getElementById('txtNombre').value;
    let categoria = document.getElementById('selCategoria').value;

    if (nombre === "") {
        alert("Por favor escribe un nombre");
        return;
    }

    let nuevoProducto = {
        id: Date.now(), // ID único y automático
        titulo: nombre,
        categoria: categoria,
        comprado: false
    };

    post.push(nuevoProducto);
    
    guardarEnStorage();
    actualizarVista();
    
    document.getElementById('txtNombre').value = ""; // Limpia campos
});

document.getElementById("btnFiltrar").addEventListener('click', actualizarVista);

function actualizarVista() {
    let categoriaFiltro = document.getElementById('selFiltro').value;

    if (categoriaFiltro === "Todos") {
        renderizarLista(post);
    } else {
        let filtrados = post.filter(prod => prod.categoria === categoriaFiltro);
        renderizarLista(filtrados);
    }
};

function renderizarLista(arrayDeProductos) {
    let listaUl = document.getElementById('listaProductos');
    listaUl.innerHTML = ""; // Limpiamos la lista

    arrayDeProductos.forEach(producto => {
        
        let claseCss = producto.comprado ? "comprado" : "";

        let itemHTML = `
            <li class="${claseCss}">
                <span>
                    <strong>${producto.titulo}</strong> 
                    <small>(${producto.categoria})</small>
                </span>
                <div>
                    <button class="btn-small" onclick="marcarComprado(${producto.id})">✔</button>
                    <button class="btn-small btn-danger" onclick="eliminarProducto(${producto.id})">X</button>
                </div>
            </li>
        `;
        
        listaUl.innerHTML += itemHTML;
    });
}

function guardarEnStorage() {
    localStorage.setItem('misCompras', JSON.stringify(post));
}

window.marcarComprado = (id) => {
    let encontrado = post.find(p => p.id === id);
    if (encontrado) {
        encontrado.comprado = !encontrado.comprado; // Invierte true/false
        guardarEnStorage();
        actualizarVista();
    }
};

window.eliminarProducto = (id) => {
    if(confirm("¿Seguro que deseas eliminarlo?")) {
        post = post.filter(p => p.id !== id);
        guardarEnStorage();
        actualizarVista();
    }
};