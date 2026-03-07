let posts = [];

document.getElementById("btnFetch").addEventListener('click', () => {
    obtenerUsers();
});

async function obtenerUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');

        if (!response.ok) {
            throw new Error('Error al obtener datos');
        }

        const posts = await response.json();
        
        console.log('Datos recibidos:', posts);

        renderizarLista(posts);

    } catch (error) {
        console.error('Error:', error);
        alert('No se pudieron descargar los posts.');
    }
}

function renderizarLista(listaDePosts) {
    let listaUl = document.getElementById('listaPosts');
    listaUl.innerHTML = ""; 

    listaDePosts.forEach((post) => {
        let itemHTML = `
            <li>
                <span>                 
                    <strong>${post.title}</strong><br>
                    <small>${post.body}</small>
                </span>
            </li>
        `;
        listaUl.innerHTML += itemHTML;
    });
};