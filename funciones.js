//AQUI TODA LA LOGICA DE LAS FUNCIONES DEL NEGOCIO
function texto(id, vari) {
    let texto1 = document.getElementById(id);
    texto1.innerText = "USD " + vari.toFixed(2);
}

function extraer(id) {
    let text = parseFloat(document.getElementById(id).value);
    return text;
}

function calcularDisponible(ingresos, egresos) {
    let disponible;
    disponible = ingresos - egresos;
    if (disponible < 0) {
        return 0;
    }
    return disponible;
}

function capacidadDePago(montoDisponible) {
    let capacidad;
    capacidad = montoDisponible * 0.5;
    return capacidad;
}

function calcularInteresSimple(monto, tasa, plazoAnios) {
    let interes = plazoAnios * monto * (tasa / 100);
    return interes;
}

function calcularTotalPagar(monto, interes) {
    let total = monto + interes + 100;
    return total;
}









