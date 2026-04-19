//AQUI TODA LA LOGICA DE LAS FUNCIONES DEL NEGOCIO
function calcularDisponible(ingresos, egresos) {
    let disponible;
    disponible = ingresos - egresos;
    if (disponible<0){  
        return 0;
    }
    return disponible;
}
function capacidadDePago(montoDisponible){
    let capacidad;
    capacidad=montoDisponible/2;
    return capacidad;
}

function texto (id,vari){
    let texto1 = document.getElementById(id);
    texto1.innerText= "USD " + vari.toFixed(2);    
}