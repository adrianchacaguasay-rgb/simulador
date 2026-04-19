//AQUI EL JAVASCRIPT PARA MANIPULAR EL HTML
function calcular() {
    let ingresos = parseFloat(document.getElementById("txtIngresos").value);
    let egresos = parseFloat(document.getElementById("txtEgresos").value);

    let disponible = calcularDisponible(ingresos, egresos);
    texto("spnDisponible", disponible);

    let capacidadPago= capacidadDePago(disponible);
    texto("spnCapacidadPago",capacidadPago);
}