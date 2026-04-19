//AQUI EL JAVASCRIPT PARA MANIPULAR EL HTML
function calcular() {
    let ingresos = extraer("txtIngresos");
    let egresos = extraer("txtEgresos");

    let disponible = calcularDisponible(ingresos, egresos);
    texto("spnDisponible", disponible);

    let capacidadPago = capacidadDePago(disponible);
    texto("spnCapacidadPago", capacidadPago);

    //calculo del interes
    let monto = extraer("txtMonto");
    let plazoAnios = extraer("txtPlazo");
    let tasa = extraer("txtTasaInteres");

    let valorInteres = calcularInteresSimple(monto, tasa, plazoAnios);
    texto("spnInteresPagar", valorInteres)
}