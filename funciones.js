//AQUI TODA LA LOGICA DE LAS FUNCIONES DEL NEGOCIO
function calcularDisponible(ingresos, egresos) {
    let disponible;
    disponible = ingresos - egresos;
    if (disponible<0){  
        return 0;
    }
    return disponible;
}