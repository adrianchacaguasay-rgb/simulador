//AQUI EL JAVASCRIPT PARA MANIPULAR EL HTML
function calcular() {
    if (!validar()) {
        return; // ⛔ detiene el cálculo si hay errores
    }
    let ingresos = extraer("txtIngresos");
    let egresos = extraer("txtEgresos");

    let disponible = calcularDisponible(ingresos, egresos);
    texto("spnDisponible", disponible);

    // calculo de la capadida de pago 
    let capacidadPago = capacidadDePago(disponible);
    texto("spnCapacidadPago", capacidadPago);

    //calculo del interes
    let monto = extraer("txtMonto");
    let plazoAnios = extraer("txtPlazo");
    let tasa = extraer("txtTasaInteres");

    let valorInteres = calcularInteresSimple(monto, tasa, plazoAnios);
    texto("spnInteresPagar", valorInteres)

    // calcular valor total a pagar
    let totalPagar = calcularTotalPagar(monto, valorInteres);
    texto("spnTotalPrestamo", totalPagar);

    //calcular cuota mensual
    let cuotaM = calcularCuotaMensual(totalPagar, plazoAnios);
    texto("spnCuotaMensual", cuotaM);

    //Estado de credito
    let aprobado = aprobarCredito(capacidadPago, cuotaM);
    if (aprobado) {
        document.getElementById("spnEstadoCredito").innerText = "CREDITO APROBADO";
    } else {
        document.getElementById("spnEstadoCredito").innerText = "CREDITO RECHAZADO";
    }


}

function reiniciar() {
    // Limpiar inputs
    document.getElementById("txtIngresos").value = "";
    document.getElementById("txtEgresos").value = "";
    document.getElementById("txtMonto").value = "";
    document.getElementById("txtPlazo").value = "";
    document.getElementById("txtTasaInteres").value = "";

    // Reiniciar resultados
    document.getElementById("spnDisponible").innerText = "0";
    document.getElementById("spnCapacidadPago").innerText = "0";
    document.getElementById("spnInteresPagar").innerText = "0";
    document.getElementById("spnTotalPrestamo").innerText = "0";
    document.getElementById("spnCuotaMensual").innerText = "0";

    // Estado del crédito
    document.getElementById("spnEstadoCredito").innerText = "ANALIZANDO...";
}

function validar() {
    let valido = true;

    // Limpiar errores previos
    limpiarErrores();

    let ingresos = extraer("txtIngresos");
    let egresos = extraer("txtEgresos");
    let monto = extraer("txtMonto");
    let plazo = extraer("txtPlazo");
    let tasa = extraer("txtTasaInteres");

    // INGRESOS
    if (isNaN(ingresos)) {
        mostrarError("txtIngresos", "errIngresos", "Campo obligatorio y numérico");
        valido = false;
    } else if (ingresos < 100) {
        mostrarError("txtIngresos", "errIngresos", "Mínimo: 100 USD");
        valido = false;
    } else if (ingresos > 50000) {
        mostrarError("txtIngresos", "errIngresos", "Máximo: 50,000 USD");
        valido = false;
    }

    // EGRESOS
    if (isNaN(egresos)) {
        mostrarError("txtEgresos", "errEgresos", "Campo obligatorio y numérico");
        valido = false;
    } else if (egresos < 0) {
        mostrarError("txtEgresos", "errEgresos", "No puede ser negativo");
        valido = false;
    } else if (egresos > ingresos) {
        mostrarError("txtEgresos", "errEgresos", "No puede ser mayor que ingresos");
        valido = false;
    }

    // MONTO
    if (isNaN(monto)) {
        mostrarError("txtMonto", "errMonto", "Campo obligatorio y numérico");
        valido = false;
    } else if (monto < 500) {
        mostrarError("txtMonto", "errMonto", "Mínimo: 500 USD");
        valido = false;
    } else if (monto > 100000) {
        mostrarError("txtMonto", "errMonto", "Máximo: 100,000 USD");
        valido = false;
    }

    // PLAZO
    if (isNaN(plazo)) {
        mostrarError("txtPlazo", "errPlazo", "Campo obligatorio y numérico");
        valido = false;
    } else if (plazo < 1) {
        mostrarError("txtPlazo", "errPlazo", "Mínimo: 1 año");
        valido = false;
    } else if (plazo > 30) {
        mostrarError("txtPlazo", "errPlazo", "Máximo: 30 años");
        valido = false;
    }

    // TASA
    if (isNaN(tasa)) {
        mostrarError("txtTasaInteres", "errTasa", "Campo obligatorio y numérico");
        valido = false;
    } else if (tasa < 1) {
        mostrarError("txtTasaInteres", "errTasa", "Mínimo: 1%");
        valido = false;
    } else if (tasa > 25) {
        mostrarError("txtTasaInteres", "errTasa", "Máximo: 25%");
        valido = false;
    }

    return valido;
}