let cuenta = 0;

document.addEventListener('DOMContentLoaded', () => {
    let datosGuardados = localStorage.getItem('contadorGuardado');
    if (datosGuardados) {
        cuenta = datosGuardados;
    }
    actualizarVista();
});

document.getElementById("btnContadorAumenta").addEventListener('click', () => {
    cuenta++;    
    guardarEnStorage();
    actualizarVista();
});

document.getElementById("btnContadorDisminuye").addEventListener('click', () => {
    cuenta--;    
    guardarEnStorage();
    actualizarVista();
});

document.getElementById("btnContadorResetea").addEventListener('click', () => {
    cuenta=0;    
    guardarEnStorage();
    actualizarVista();
});

function actualizarVista(){
    let resultado = document.getElementById('resultado');
    resultado.innerHTML = cuenta;
}

function guardarEnStorage() {
    localStorage.setItem('contadorGuardado', cuenta);
};