// =====================
// FUNCION PRINCIPAL
// =====================
function calcular() {

    if (!validar()) {
        return;
    }

    let ingresos = extraer("txtIngresos");

    let arriendo = extraer("txtArriendo");
    let alimentacion = extraer("txtAlimentacion");
    let varios = extraer("txtVarios");

    let egresos = arriendo + alimentacion + varios;
    texto("spnEgresos", egresos);

    let disponible = calcularDisponible(ingresos, egresos);
    texto("spnDisponible", disponible);

    let capacidadPago = capacidadDePago(disponible);
    texto("spnCapacidadPago", capacidadPago);

    let monto = extraer("txtMonto");
    let plazo = extraer("txtPlazo");
    let tasa = extraer("txtTasaInteres");

    let interes = calcularInteresSimple(monto, tasa, plazo);
    texto("spnInteresPagar", interes);

    let total = calcularTotalPagar(monto, interes);
    texto("spnTotalPrestamo", total);

    let cuota = calcularCuotaMensual(total, plazo);
    texto("spnCuotaMensual", cuota);

    let aprobado = aprobarCredito(capacidadPago, cuota);

    document.getElementById("spnEstadoCredito").innerText =
        aprobado ? "CREDITO APROBADO" : "CREDITO RECHAZADO";
}


// =====================
// VALIDACIONES
// =====================
function validar() {

    let valido = true;
    limpiarErrores();

    let ingresos = extraer("txtIngresos");
    let arriendo = extraer("txtArriendo");
    let alimentacion = extraer("txtAlimentacion");
    let varios = extraer("txtVarios");
    let monto = extraer("txtMonto");
    let plazo = extraer("txtPlazo");
    let tasa = extraer("txtTasaInteres");

    // INGRESOS
    if (isNaN(ingresos)) {
        mostrarError("txtIngresos", "errIngresos", "Campo obligatorio");
        valido = false;
    } else if (ingresos < 100 || ingresos > 50000) {
        mostrarError("txtIngresos", "errIngresos", "Entre 100 y 50,000 USD");
        valido = false;
    }

    // ARRIENDO
    if (isNaN(arriendo)) {
        mostrarError("txtArriendo", "errArriendo", "Campo obligatorio");
        valido = false;
    } else if (arriendo < 0) {
        mostrarError("txtArriendo", "errArriendo", "No negativo");
        valido = false;
    }

    // ALIMENTACION
    if (isNaN(alimentacion)) {
        mostrarError("txtAlimentacion", "errAlimentacion", "Campo obligatorio");
        valido = false;
    } else if (alimentacion < 0) {
        mostrarError("txtAlimentacion", "errAlimentacion", "No negativo");
        valido = false;
    }

    // VARIOS
    if (isNaN(varios)) {
        mostrarError("txtVarios", "errVarios", "Campo obligatorio");
        valido = false;
    } else if (varios < 0) {
        mostrarError("txtVarios", "errVarios", "No negativo");
        valido = false;
    }

    // VALIDACIÓN TOTAL EGRESOS
    let totalEgresos = (arriendo || 0) + (alimentacion || 0) + (varios || 0);

    if (!isNaN(ingresos) && totalEgresos > ingresos) {
        mostrarError("txtVarios", "errVarios", "Egresos > Ingresos");
        valido = false;
    }

    // MONTO
    if (isNaN(monto)) {
        mostrarError("txtMonto", "errMonto", "Campo obligatorio");
        valido = false;
    } else if (monto < 500 || monto > 100000) {
        mostrarError("txtMonto", "errMonto", "Entre 500 y 100,000 USD");
        valido = false;
    }

    // PLAZO
    if (isNaN(plazo)) {
        mostrarError("txtPlazo", "errPlazo", "Campo obligatorio");
        valido = false;
    } else if (plazo < 1 || plazo > 30) {
        mostrarError("txtPlazo", "errPlazo", "Entre 1 y 30 años");
        valido = false;
    }

    // TASA
    if (isNaN(tasa)) {
        mostrarError("txtTasaInteres", "errTasa", "Campo obligatorio");
        valido = false;
    } else if (tasa < 1 || tasa > 25) {
        mostrarError("txtTasaInteres", "errTasa", "Entre 1% y 25%");
        valido = false;
    }

    return valido;
}


// =====================
// FUNCIONES AUXILIARES
// =====================
function texto(id, valor) {
    document.getElementById(id).innerText = "USD " + valor.toFixed(2);
}

function extraer(id) {
    return parseFloat(document.getElementById(id).value);
}

function mostrarError(inputId, errorId, mensaje) {
    document.getElementById(inputId).classList.add("error-input");
    document.getElementById(errorId).innerText = mensaje;
}

function limpiarErrores() {
    document.querySelectorAll(".error").forEach(e => e.innerText = "");
    document.querySelectorAll("input").forEach(i => i.classList.remove("error-input"));
}


// =====================
// LÓGICA DEL NEGOCIO
// =====================
function calcularDisponible(ingresos, egresos) {
    return Math.max(0, ingresos - egresos);
}

function capacidadDePago(disponible) {
    return disponible * 0.5;
}

function calcularInteresSimple(monto, tasa, plazo) {
    return monto * (tasa / 100) * plazo;
}

const APORTE_SOLCA = 100;

function calcularTotalPagar(monto, interes) {
    return monto + interes + APORTE_SOLCA;
}

function calcularCuotaMensual(total, plazo) {
    return total / plazo;
}

function aprobarCredito(capacidad, cuota) {
    return capacidad > cuota;
}


// =====================
// REINICIAR
// =====================
function reiniciar() {

    document.querySelectorAll("input").forEach(i => i.value = "");

    document.getElementById("spnDisponible").innerText = "0";
    document.getElementById("spnCapacidadPago").innerText = "0";
    document.getElementById("spnEgresos").innerText = "0";
    document.getElementById("spnInteresPagar").innerText = "0";
    document.getElementById("spnTotalPrestamo").innerText = "0";
    document.getElementById("spnCuotaMensual").innerText = "0";

    document.getElementById("spnEstadoCredito").innerText = "ANALIZANDO...";

    limpiarErrores();
}