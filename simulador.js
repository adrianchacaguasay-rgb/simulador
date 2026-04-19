//AQUI EL JAVASCRIPT PARA MANIPULAR EL HTML
function calcular() {
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
    let cuotaM=calcularCuotaMensual(totalPagar,plazoAnios);
    texto("spnCuotaMensual",cuotaM);
    
    //Estado de credito
    let aprobado = aprobarCredito(capacidadPago,cuotaM);
    if(aprobado){
        document.getElementById("spnEstadoCredito").innerText= "CREDITO APROBADO";
    }else{
        document.getElementById("spnEstadoCredito").innerText= "CREDITO RECHAZADO";
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