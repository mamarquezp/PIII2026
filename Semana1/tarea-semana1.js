document.getElementById("btnSaludar").addEventListener('click', function(){
  let nombre = document.getElementById('nombre').value;
  let resultado = document.getElementById('resultado');
  resultado.innerHTML = "¡Hola " + nombre + "!";
  resultado.style.color = "blue";
})

document.getElementById("btnCambiarColor").addEventListener('click', function(){
  let resultado = document.getElementById('resultado');
  resultado.style.color = "green";
})