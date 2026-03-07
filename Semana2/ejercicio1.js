let tareas = [{id:"1", titulo:"Lavar", completada:"No"}];
tareas.push({ id: "2", titulo: "Barrer", completada: "Si" });
tareas.push({ id: "3", titulo: "Pasear al perro", completada: "Si" });

let tareasMayus = tareas.map(tarea => tarea.titulo.toUpperCase());
console.log("Títulos en mayúsculas:", tareasMayus);

let tareasCompletas = tareas.filter(tarea => tarea.completada == "Si");
console.log("Objetos completados:", tareasCompletas);

let tareasCompletasTotal = tareas.reduce((contador, tarea) => {
    return tarea.completada === "Si" ? contador + 1 : contador;
},0);
console.log("Total completadas:", tareasCompletasTotal);