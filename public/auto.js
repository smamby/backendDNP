var NUMERACION;
var hoy = new Date().toLocaleDateString('sp-us',{day:"numeric",month:"numeric",year:"numeric"});
const localDateFormat = ['sp-us',{day:"numeric",month:"numeric",year:"numeric"}]
var sumarParaTotal = 0;
//sumarParaTotal = new Intl.NumberFormat('de-DE').format(sumarParaTotal)
var sumarParaTotalProp = 0;
//sumarParaTotalProp = new Intl.NumberFormat('de-DE').format(sumarParaTotalProp)
var valAlq = 0;
//valAlq = new Intl.NumberFormat('de-DE').format(valAlq)
var comi = 0;
//comi = new Intl.NumberFormat('de-DE').format(comi)

function vaciarRecibo() {
    reciboLevantado = [];
    numRecibo = undefined;
    document.getElementById('num').value = NUMERACION;
    document.getElementById('numProp').value = NUMERACION;
    document.getElementById("vence").value = '';
    //document.getElementById("pesos").value = '';
    document.getElementById("observacionesInput").value = '';
    document.getElementById("cont-input-serv").innerHTML = '';
    deleteDetalle();
    deleteDetalleOnlyProp();
    desplegarServiciosYImpuestos(contratoLevantado); //solo despliega los inputs, no carga los datos guardados
};

function chkReciboVacio(){
    var chkVence = document.getElementById("vence").value === '';
    //var chkPesos = document.getElementById("pesos").value === '';
    if (chkVence){
        return true
    } else {
        return false
    }
};

function tocaActualizarAlquiler(contratoLevantado) {
    //debugger
    if (!Array.isArray(contratoLevantado) || contratoLevantado.length === 0) {
        return false;
    }
    let inicioContrato = new Date(contratoLevantado[0].inicioContrato);
    let act = contratoLevantado[0].periodoActualizacion;
    if (contratoLevantado[0].lastDateActualizacion !== null && contratoLevantado[0].lastDateActualizacion !== undefined) {
        let lastDateActualiz = new Date(contratoLevantado[0].lastDateActualizacion);
        let lastActMonth =lastDateActualiz.getMonth();
        let lastActYear = lastDateActualiz.getFullYear();
        let todayMonth = new Date(Date.now()).getMonth();
        let todayYear = new Date(Date.now()).getFullYear();
        if (lastActMonth === todayMonth && lastActYear === todayYear) {
            return false;
        }
    }
    let startMonth = inicioContrato.getMonth();
    let multip = 12 / act;
    let monthAct = [];
    for (let i = 0; i < multip; i++) {
        let m = i * act;
        // El operador % 12 asegura que si da 12 sea 0 (Enero), 13 sea 1 (Febrero), etc.
        let mesActualizacion = (startMonth + m) % 12;
        monthAct.push(mesActualizacion);
    }
    console.log('meses de actualizacion de alquiler:', monthAct);
    //console.log(multip, startMonth);
    let today = new Date();
    return monthAct.includes(today.getMonth());
};

function actualizarAlquiler(newValorAlquiler) {
    let today = new Date();
    let year = today.getFullYear();
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let day = String(today.getDate()).padStart(2, '0');
    let fechaFormateada = `${year}-${month}-${day}`;

    let body = {
        "valor1":newValorAlquiler,
        "lastDateActualizacion":fechaFormateada
    };

    editContrato(body)
        .then(()=>{
            let chkId = document.getElementById("idContrato").value
            return buscar( chkId || itemEncontrado.idContrato )
        })
        .then(()=>{
            levantarContrato(contratoLevantado[0])
            impInq()
        })
        .catch(error => {
            console.error("Algo falló al editar o levantar el contrato:", error);
        });
};

function finalizaContrato(contratoLevantado) {
    if (!Array.isArray(contratoLevantado) || contratoLevantado[0].length === 0) {
        return;
    }

    let contrato = contratoLevantado[0];
    let inicioContrato = new Date(contrato.inicioContrato);
    let duracionContrato = Number(contrato.duracionContrato); // Nos aseguramos de que sea un número

    // 1. Calcular fecha de finalización (Forma nativa de JavaScript)
    let fechaFinalizacion = new Date(inicioContrato);
    fechaFinalizacion.setMonth(fechaFinalizacion.getMonth() + duracionContrato);

    // 2. Obtener la fecha actual (hoy)
    let hoy = new Date();

    // 3. Calcular la diferencia en milisegundos y pasarla a días
    // Usamos Math.ceil para redondear los días de forma lógica
    let diferenciaMilisegundos = fechaFinalizacion - hoy;
    let diasFaltantes = Math.ceil(diferenciaMilisegundos / (1000 * 60 * 60 * 24));

    // 4. Evaluar la condición (Faltan 30 días o menos, pero el contrato NO venció todavía)
    if (diasFaltantes <= 30 && diasFaltantes > 0) {
        alert(`¡Atención! El contrato de ${contratoLevantado[0].idContrato} finaliza en ${diasFaltantes} días (Fecha: ${fechaFinalizacion.toLocaleDateString()}).`);
    } else if (diasFaltantes === 0) {
        alert(`¡Atención! El contrato finaliza HOY.`);
    } else if (diasFaltantes < 0) {
        alert(`¡Atención! El contrato de ${contratoLevantado[0].idContrato} ya finalizó (Fecha: ${fechaFinalizacion.toLocaleDateString()}).`);
    }
    console.log('diasFaltantes', diasFaltantes);
};

//RECIBO inputs and prints
var dateShort;
async function impInq(){

    if (itemEncontrado === ''){
        alert('Cargá algun contrato, no cargaste ninguno. Dale despabilate!');
        document.getElementById("buscarInput").focus();
    } else {
        //var numeracionInput = document.getElementById('numInput');
        var numeracionPrint = document.getElementById('num');
        var numeracionPrintProp = document.getElementById('numProp');
        //var fechaInput = document.getElementById('dateInput');
        var fechaPrint = document.getElementById('date');
        var fechaPrintProp = document.getElementById('dateProp');
        var seniorPrint = document.getElementById('senior');
        var domicilioInqPrint = document.getElementById('domicilio');
        //var pesosLetrasInput = document.getElementById("pesos").value;
        var pesosLetraPrint = document.getElementById("pesosLetra")
        var venceInput = document.getElementById("vence").value;
        var vencePrint = document.getElementById("vencePrint");
        var nuevoGastoInput = document.getElementById("nuevoGasto").value;
        var nuevoMontoInput = document.getElementById("nuevoMonto").value;
        var mesAlquilerPrint = document.getElementById("mes-alq");
        //var mesAlquilerInput = document.getElementById("mesAlq").value;
        var mesAlquilerPropPrint = document.getElementById("mesAlqProp");
        var montoAlquilerPrint = document.getElementById("monto-alq");
        var montoAlquilerPrintProp = document.getElementById("montoAlqProp")
        var contenedorDetalle = document.createElement('div');
        contenedorDetalle.id = ("cont-detalle");
        var contCuerpoDetalle = document.createElement("div");
        contCuerpoDetalle.id = ("cuerpo-det");
        var contMontoDet = document.createElement("div");
        contMontoDet.id = ("monto");
        var totalDet = document.createElement("div");
        totalDet.id = ("total");
        var montoComision = document.getElementById("montoComision");
        var totalDetalle = document.getElementById("total");
        var observacionesPrint = document.getElementById("observacionesPrint");
        var observacionesPrintProp = document.getElementById("obsProp");

        // await guardarServiciosNuevos();
        //
        let num = reciboLevantado.length > 0
            ? reciboLevantado[0].numeroRecibo
            : NUMERACION;
        const servicesLevantados = await getServices(num);
        if (servicesLevantados.length === 0) {
            await guardarServiciosNuevos();
        }
        console.log('servicesLevantados', servicesLevantados);
        let serviciosStrinficados = servicesLevantados.length === 0
            ? '' //servicesAndTaxes(contratoLevantado)
            : stringifyServices(servicesLevantados);
        if (reciboLevantado.length === 0) {
            serviciosStrinficados = '';
        }
        console.log('base de services:', serviciosStrinficados);
        let definedObservationsInput = document.getElementById("observacionesInput").value === ''
            ? serviciosStrinficados
            : document.getElementById("observacionesInput").value;
        observacionesInput = definedObservationsInput
        document.getElementById("observacionesInput").value = definedObservationsInput;
        if(reciboLevantado.length === 0){
            desplegarServiciosYImpuestos(contratoLevantado);
        }
        //var observacionesInput = document.getElementById("observacionesInput").value;
        //var observacionesInputProp = document.getElementById("observacionesInputProp").value;
        var locadorPrint = document.getElementById("locadorPrint")
        var totalDetProp = document.getElementById("totalDetProp");
        var totalFinal = document.getElementById("total-final");
        var totalFinalProp = document.getElementById("total-finalProp");
        var domicilioAlq = document.getElementById("dirDeptoAlq");
        //asignaciones
        numeracionPrint.innerHTML = numRecibo? numRecibo: NUMERACION;
        numeracionPrintProp.innerHTML = numRecibo? numRecibo: NUMERACION;

        fechaPrint.innerHTML = fechaRecibo? fechaRecibo: hoy;
        fechaPrintProp.innerHTML = fechaRecibo? fechaRecibo: hoy;
        seniorPrint.innerHTML = itemEncontrado.nombreInquilino.toUpperCase()+' '+itemEncontrado.apellidoInquilino.toUpperCase();
        domicilioInqPrint.innerHTML = itemEncontrado.direccion.toUpperCase();
        domicilioAlq.innerHTML = itemEncontrado.direccion.toUpperCase();
        //pesosLetraPrint.innerHTML = pesosLetrasInput.toUpperCase();
        const opDate = {year:'numeric',month:'numeric',day:'numeric'};
        const opDate2 = {year:'numeric',month:'short'};
        var v=vencedateParse = Date.parse(venceInput)+86400000
        var dateInv = new Date(v).toLocaleDateString("sp-IN", opDate)
        dateShort = new Date(v).toLocaleDateString("sp-IN", opDate2)
        console.log('Input',venceInput);
        console.log(vencedateParse);
        console.log(vencedateParse+86400000);
        console.log('Invertida',dateInv);
        console.log('InvertidaSort',dateShort);
        vencePrint.innerHTML = dateInv;
        mesAlquilerPrint.innerHTML = dateShort.toUpperCase();
        mesAlquilerPropPrint.innerHTML = dateShort.toUpperCase();
        //debugger
        //let valActual = valorAlquiler()
        valAlq = reciboLevantado.length > 0 ? reciboLevantado[0].montoAlquiler : contratoLevantado[0].valor1;
        comi = valorComision(valAlq);
        console.log('val alq para imp', valAlq)
        var valAlqImp = new Intl.NumberFormat('de-DE').format(valAlq)
        var comiImp = new Intl.NumberFormat('de-DE').format(comi)
        console.log('valAlq,comi', valAlq,comi);
        montoAlquilerPrint.innerHTML = "$ "+valAlqImp+'.-';
        montoAlquilerPrintProp.innerHTML = "$ "+valAlqImp+'.-';
        montoComision.innerHTML = "$ -"+comiImp+'.-';
        //observacionesPrint.innerHTML = observacionesInput;
        locadorPrint.innerHTML = itemEncontrado.nombrePropietario.toUpperCase()+' '+itemEncontrado.apellidoPropietario.toUpperCase();
        //observaciones()
        console.log(dateShort)
        //const obsSugeridas = observaciones(dateShort)
        observacionesPrint.innerHTML = observacionesInput;
        observacionesPrintProp.innerHTML = observacionesInput;

        sumarParaTotal = parseInt(valAlq) - detalleTotal;
        sumarParaTotalProp = parseInt(valAlq) - comi - detalleTotalProp - detalleTotalOnlyProp;
        var sumarParaTotalImp = new Intl.NumberFormat('de-DE').format(sumarParaTotal)
        totalDetalle.innerHTML = "$ "+sumarParaTotalImp+'.-';
        totalFinal.innerHTML = "$ "+sumarParaTotalImp+'.-';
        var sumarParaTotalPropImp = new Intl.NumberFormat('de-DE').format(sumarParaTotalProp);
        totalDetProp.innerHTML = sumarParaTotalPropImp+'.-';
        totalFinalProp.innerHTML = sumarParaTotalPropImp+'.-';
        console.log('totales',sumarParaTotalImp,sumarParaTotalPropImp)
        console.log(valAlqImp,comiImp)

        // aca insertar numToText

        //total
        var numToText = init(sumarParaTotal)
        //pesosLetrasInput.value = numToText;
        pesosLetraPrint.innerHTML = numToText.toUpperCase();

        if(chkReciboVacio()){
            console.log('no se guarda el recibo');
            return false
        }
        console.log('Recibo guardados')
        await cargarServicios();
        await guardarRecibo();
    }
}
var detalleTotal = 0;
var detalleTotalProp = 0;
var detalleTotalOnlyProp = 0;
var detalleTotalImp = new Intl.NumberFormat('de-DE').format(detalleTotal)
var detalleTotalPropImp = new Intl.NumberFormat('de-DE').format(detalleTotalProp)
var detalleTotalOnlyPropImp = new Intl.NumberFormat('de-DE').format(detalleTotalOnlyProp)
// sumarParaTotal = parseInt(valAlq) - detalleTotal;
// sumarParaTotalProp = parseInt(valAlq) - comi - detalleTotalProp;
function sumarDetalleInq(nuevoMonto){
    //nuevoMonto = new Intl.NumberFormat('de-DE').format(nuevoMonto)
    detalleTotal -= nuevoMonto;
    console.log('detalleTotal',detalleTotal)
}
function sumarDetalleProp(nuevoMonto){
    //nuevoMonto = new Intl.NumberFormat('de-DE').format(nuevoMonto)
    detalleTotalProp -= nuevoMonto;
}
function sumarDetalleOnlyProp(nuevoMonto){
    //nuevoMonto = new Intl.NumberFormat('de-DE').format(nuevoMonto)
    detalleTotalOnlyProp -= nuevoMonto;
}

var items = [];
function insertarDetalles(){
    //debugger
    // inputs
    var nuevoGastoInput = document.getElementById("nuevoGasto").value;
    var nuevoMontoInput = document.getElementById("nuevoMonto").value;
    // contenedores y visualizacion
    var contDet = document.getElementById("cont-det")
    var contDetProp = document.getElementById("cont-det-prop")
    contDet.style.display="flex";
    contDetProp.style.display="flex";
    // var contNewDet = document.getElementById("cont-detalle");
    // contNewDet.style.display="block";
    // var contNewMonto = document.getElementById("cont-montos");
    // contNewMonto.style.display="flex";
    let contNewLine = document.createElement("div");
    contNewLine.classList.add("line-detalle");
    contNewLine.id = `${items.length-1}`;
    let contNewLineProp = document.createElement("div");
    contNewLineProp.classList.add("line-detalle-prop");

    let contNewDet = document.createElement("div");
    contNewDet.classList.add("cont-detalle");
    let contNewMonto = document.createElement("div");
    contNewMonto.classList.add("cont-montos");

    let contNewDetProp = document.createElement("div");
    contNewDetProp.classList.add("cont-detalle-prop");
    let contNewMontoProp = document.createElement("div");
    contNewMontoProp.classList.add("cont-montos-prop");

    // refactorizar parte de prop
    // var contNewDetProp = document.getElementById("cont-detalleProp");
    // contNewDetProp.style.display="block";
    // var contNewMontoProp = document.getElementById("cont-montosProp");
    // contNewMontoProp.style.display="flex";
    //var nuevoMontoInputImp = new Intl.NumberFormat('de-DE').format(nuevoMontoInput)

    // Estructura de datos
    var newItem = [nuevoGastoInput,nuevoMontoInput]
    sumarDetalleInq (newItem[1]);
    sumarDetalleProp (newItem[1]);
    items.push(newItem);

    // Formato de detalle nuevo
    let delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.classList.add("del-det");
    delBtn.dataset.index = items.length-1;
    delBtn.innerHTML = "🗑";
    delBtn.onclick = async function() {
        const indiceABorrar = parseInt(delBtn.dataset.index);
        items.splice(indiceABorrar, 1);
        contDet.textContent = '';
        contDetProp.textContent = '';
        document.getElementById("cont-new-det-only-prop").textContent = '';
        reciboLevantado[0].detalles = items;
        detalleTotal = 0;
        detalleTotalProp = 0;
        detalleTotalOnlyProp = 0;
        await impInq();
        await cargarRecibo();
        document.getElementById("nuevoGasto").focus();
    }
    contNewDet.textContent = '';
    contNewMonto.textContent = '';
    contNewDetProp.textContent = '';
    contNewMontoProp.textContent = '';
    // document.getElementById("cont-detalle").value = '';
    // document.getElementById("cont-montos").value = '';
    // contNewDet.innerHTML += "- "+newItem[0]+delBtn+"<br>";
    // var newItemImp1 = new Intl.NumberFormat('de-DE').format(newItem[1])
    // contNewMonto.innerHTML += "$ "+newItemImp1+'.-'+"<br>";
    contNewDet.textContent = "- "+newItem[0]+" ";
    contNewDet.appendChild(delBtn);
    let newItemImp1 = new Intl.NumberFormat('de-DE').format(newItem[1])
    contNewMonto.textContent = "$ "+newItemImp1+'.-';
    contNewLine.appendChild(contNewDet);
    contNewLine.appendChild(contNewMonto);
    contDet.appendChild(contNewLine);

    contNewDetProp.textContent = "- "+newItem[0]+" ";
    contNewMontoProp.textContent = "$ "+newItemImp1+'.-';
    contNewLineProp.appendChild(contNewDetProp);
    contNewLineProp.appendChild(contNewMontoProp);
    contDetProp.appendChild(contNewLineProp);


    // contNewDetProp.innerHTML += "- "+newItem[0]+"<br>";
    // contNewMontoProp.innerHTML += "$ "+newItemImp1+'.-'+"<br>";

    // limpieza y focus en imputs
    document.getElementById("nuevoGasto").value = '';
    document.getElementById("nuevoMonto").value = '';
    document.getElementById("nuevoGasto").focus();

    // Imprimir datos
    impInq();
}

var itemsOnlyProp= [];
function insertDetOnlyProp(){
    var inputDetOP= document.getElementById("nuevoGastoOnlyProp").value;
    var inputMontOP=document.getElementById("nuevoMontoOnlyProp").value;
    var contDetOnlyProp=document.getElementById("cont-new-det-only-prop");
    // var contDetOP = document.getElementById("cont-detalleOnlyProp");
    // var contMontOP = document.getElementById("cont-montosOnlyProp");
    contDetOnlyProp.style.display="flex";
    // contDetOP.style.display="block";
    // contMontOP.style.display="flex";
    let contNewLineProp = document.createElement("div");
    contNewLineProp.classList.add("line-detalle-prop-only");
    contNewLineProp.id = `${itemsOnlyProp.length-1}`;

    let contDetOP = document.createElement("div");
    contDetOP.classList.add("cont-detalleOP");
    let contMontOP = document.createElement("div");
    contMontOP.classList.add("cont-montosOP");

    var newItemOP = [inputDetOP,inputMontOP]
    sumarDetalleOnlyProp (newItemOP[1]);
    itemsOnlyProp.push(newItemOP)

    // Formato de detalle nuevo
    let delBtnOP = document.createElement("button");
    delBtnOP.type = "button";
    delBtnOP.classList.add("del-detOP");
    delBtnOP.dataset.index = itemsOnlyProp.length - 1;
    delBtnOP.innerHTML = "🗑";
    delBtnOP.onclick = async function() {
        //event.preventDefault();
        const indiceABorrar = parseInt(delBtnOP.dataset.index);
        itemsOnlyProp.splice(indiceABorrar, 1);
        contDetOnlyProp.textContent = '';

        reciboLevantado[0].detallesOnlyProp = itemsOnlyProp;
        detalleTotal = 0;
        detalleTotalProp = 0;
        detalleTotalOnlyProp = 0;
        await impInq();
        await cargarRecibo();
        document.getElementById("nuevoGastoOnlyProp").focus();
    }
    contDetOP.textContent = '';
    contMontOP.textContent = '';

    contDetOP.textContent = "- "+newItemOP[0]+" ";
    contDetOP.appendChild(delBtnOP);
    var newItemImp1OP = new Intl.NumberFormat('de-DE').format(newItemOP[1])
    contMontOP.textContent = "$ "+newItemImp1OP+'.-';
    contNewLineProp.appendChild(contDetOP);
    contNewLineProp.appendChild(contMontOP);
    contDetOnlyProp.appendChild(contNewLineProp);

    document.getElementById("nuevoGastoOnlyProp").value = '';
    document.getElementById("nuevoMontoOnlyProp").value = '';
    document.getElementById("nuevoGastoOnlyProp").focus();
    impInq();
}

function deleteDetalle(){
    // document.getElementById("cont-detalle").innerHTML = '';
    // document.getElementById("cont-montos").innerHTML = '';
    // document.getElementById("cont-detalleProp").innerHTML = '';
    // document.getElementById("cont-montosProp").innerHTML = '';
    document.getElementById("cont-det").innerHTML = '';
    document.getElementById("cont-det-prop").innerHTML = '';
    items = [];
    detalleTotal = 0;
    detalleTotalProp = 0;
    //document.getElementById("pesos").value = '';
    document.getElementById("pesosLetra").innerHTML = '';
    impInq();
}

function deleteDetalleOnlyProp(){
    document.getElementById("cont-new-det-only-prop").innerHTML = '';
    itemsOnlyProp = [];
    detalleTotalOnlyProp = 0;
    impInq();
}

function valorAlquiler(){
    let today = new Date(Date.now());
    let d2 = itemEncontrado.inicioP2;
    let d3 = itemEncontrado.inicioP3;
    let [day3,month3,year3] = d3.split('/');
    let dateTemp3 = new Date(+year3,+month3-1,+day3);
    let [day2,month2,year2] = d2.split('/');
    let dateTemp2 = new Date(+year2,+month2-1,+day2);
    console.log(today);
    console.log(dateTemp2);
    console.log(dateTemp3);
    if (today > dateTemp3){
        //comi = valorComision(itemEncontrado.valor3)
        console.log('3er año',comi);
        return itemEncontrado.valor3

    } else if (today > dateTemp2) {
        //comi = valorComision(itemEncontrado.valor2)
        console.log('2do año',comi)
        return itemEncontrado.valor2

    } else if (today < dateTemp2) {
        //comi = valorComision(itemEncontrado.valor1)
        return itemEncontrado.valor1
    }
}

function valorComision(valor){
    var comSel = document.getElementById("comisionSelect").value;
    let comAdmin = Math.round(parseInt(valor)*0.05);
    let comRenov = Math.round(parseInt(itemEncontrado.valor1)*36*0.0415);
    if(comSel === 'administracion'){
        return comAdmin;
    } else if (comSel === 'firma') {
        return comRenov;
    } else {
        alert('ocurrio algun error')
    }
}

// function stringifyServices (servicios) {
//     let textObservaciones = 'Recibí los comprobantes de pago de ';
//     const optDate = {day:'numeric', month:'numeric', year:'numeric'};

//     for (let service in servicios) {
//         if (servicios[service].pagado === true) {
//             let datePlusOne = new Date(servicios[service].vencimiento.getTime() + 86400000)
//             let dateFormated = datePlusOne.toLocaleDateString("sp-IN", optDate)

//             let text =  `${servicios[service].nombreServicio.toUpperCase()} vto. ${dateFormated}, `
//             textObservaciones += text;
//         }
//     }
//     if (textObservaciones.endsWith(', ')) {
//         textObservaciones = textObservaciones.slice(0, -2);
//         textObservaciones += '.';
//     }
//     return textObservaciones;
// }



function cerrarModal2 () {
    const modal2 = document.getElementById('modal2-background');
    modal2.classList.remove('is-visible');
    bancoForm.classList.remove('actualizar');
}
function limpiarFormDatosBancarios() {
    document.getElementById('bancoForm').reset();
    // Restablecer valor por defecto de tipoCta
    document.getElementById('tipoCta').value = 'Caja_Ahorro';
}

let datosBancariosLevantados = {};

async function desplegarDatosBancarios () {

    if (contratoLevantado.length === 0) {
        alert('No hay ningun contrato seleccionado');
        return false;
    }
    const modal2 = document.getElementById('modal2-background');
    modal2.classList.add('is-visible');
    const datosBancarios = await getOneDataBancaria(contratoLevantado[0].idContrato);
    let existe = false;
    if (datosBancarios === null ) {
        console.log('no hay datos bancarios cargados');
        alert('No hay datos bancarios cargados');
        let bancoForm = document.getElementById('bancoForm');
        bancoForm.classList.add('actualizar');
        document.getElementById('db-banco').value = '';
        document.getElementById('db-cbu').value = '';
        document.getElementById('db-alias').value = '';
        document.getElementById('db-tipoCta').value = '';
        document.getElementById('db-numeroCta').value = '';
        document.getElementById('db-titular').value = '';
        document.getElementById('db-dni').value = '';
    } else {
        if (Object.keys(datosBancarios).length !== 0) {
            datosBancariosLevantados = datosBancarios;
            existe = true;
        }
    }

    document.getElementById('data-bancaria-direccion').textContent = '';
    document.getElementById('db-idContrato-span').textContent = '';
    document.getElementById('data-bancaria-direccion').textContent = contratoLevantado[0].direccion;
    document.getElementById('db-idContrato-span').textContent = contratoLevantado[0].idContrato;
    document.getElementById('db-banco-value').textContent = existe ? datosBancarios.banco : '';
    document.getElementById('db-cbu-value').textContent = existe ? datosBancarios.cbu : '';
    document.getElementById('db-alias-value').textContent = existe ? datosBancarios.alias : '';
    document.getElementById('db-tipoCta-value').textContent = existe ? datosBancarios.tipoCta : '';
    document.getElementById('db-numeroCta-value').textContent = existe ? datosBancarios.numeroCta : '';
    document.getElementById('db-titular-value').textContent = existe ? datosBancarios.titular : ''
    document.getElementById('db-dni-value').textContent = existe ? datosBancarios.dni : '';


}
function actualizarDatosBancarios() {
    let bancoForm = document.getElementById('bancoForm');
    bancoForm.classList.add('actualizar');
    if (Object.keys(datosBancariosLevantados).length !== 0) {
        document.getElementById('db-banco').value = datosBancariosLevantados.banco;
        document.getElementById('db-cbu').value = datosBancariosLevantados.cbu;
        document.getElementById('db-alias').value = datosBancariosLevantados.alias;
        document.getElementById('db-tipoCta').value = datosBancariosLevantados.tipoCta;
        document.getElementById('db-numeroCta').value = datosBancariosLevantados.numeroCta;
        document.getElementById('db-titular').value = datosBancariosLevantados.titular;
        document.getElementById('db-dni').value = datosBancariosLevantados.dni;
    }
}

async function updateDatosBancarios(e) {
    if (e) {
        e.preventDefault();
    }
    try {
        let dataParaGuardar = {};
        dataParaGuardar.idContrato = Number(contratoLevantado[0].idContrato)
        dataParaGuardar.banco = document.getElementById('db-banco').value
        dataParaGuardar.cbu = document.getElementById('db-cbu').value
        dataParaGuardar.alias = document.getElementById('db-alias').value
        dataParaGuardar.tipoCta = document.getElementById('db-tipoCta').value
        dataParaGuardar.numeroCta = document.getElementById('db-numeroCta').value
        dataParaGuardar.titular = document.getElementById('db-titular').value
        dataParaGuardar.dni = document.getElementById('db-dni').value
        let dataGuardada = await getOneDataBancaria(contratoLevantado[0].idContrato);
        console.log('data guardada', dataGuardada);
        if (dataGuardada !== null && Object.keys(dataGuardada).length !== 0) {
            let dataEditada = await editDataBancaria(contratoLevantado[0].idContrato, dataParaGuardar)
            console.log('data editada', dataEditada);
            return dataEditada;
        }
        if (dataParaGuardar.idContrato !== null
            && dataParaGuardar.idContrato !== ''
            && dataParaGuardar.idContrato !== undefined
            && dataParaGuardar.idContrato > 0) {
            console.log('idContrato', dataParaGuardar.idContrato);
            console.log('dataParaGuardar', dataParaGuardar);

            let nuevaData = await addDataBancaria(dataParaGuardar);
            console.log('nuevaData', nuevaData);
            return nuevaData;
        }

    } catch (error) {
        console.error('Error al guardar los datos', error);
        alert(`Fallo en la operación. Motivo: ${error.message || 'Error desconocido'}`);
    }
}


function setNum(num){
    NUMERACION=num;
    guardarInfo();
}



async function nuevo(){
    var numCheck = await getRecibos(NUMERACION)
    console.log(numCheck)
    if(reciboLevantado.length == 0){
        alert(`No existe ningun recibo con el N° ${NUMERACION}`);
        return false;
    } else {
        location.reload()
        contador();
        document.getElementById("buscarInput").focus();
    }
}

function contador(){
    //if(confirm('Confirma que la impresion es correcta. Si confirmas, se pasara a la proxima boleta')){
        //console.log(NUMERACION);
        NUMERACION = parseInt(NUMERACION);
        console.log(NUMERACION);
        NUMERACION += 1;
        //console.log(NUMERACION);
        guardar(NUMERACION,"NUMERACION");
        //console.log(NUMERACION);
        alert(`Nueva boleta n° ${NUMERACION}`)
    //}
}


function listFunc(){
    console.log({
        'listFunc()' : 'lista algunas funciones para configurar el estado',
        'setNum(numero)' : 'setear numeracion',
        'guardarInfo()' : 'guardar toda la info en LocalStorage',
        'cargarInfo()' : 'Carga toda la info del LocalStorage',
        'addContrato(body)' : 'Guarda manualmente un contrato en la BD',
        'addRecibo(body)' : 'guarda manualmente un recibo en la BD',
    })
}
console.log("funciones basicas: listFunc()");