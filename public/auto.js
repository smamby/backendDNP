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

//RECIBO inputs and prints
var dateShort;
async function impInq(){
    // ;
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
        let serviciosParseados = servicesLevantados.length === 0
            ? '' //servicesAndTaxes(contratoLevantado)
            : parcerServices(servicesLevantados);
        if (reciboLevantado.length === 0) {
            serviciosParseados = '';
        }
        console.log('base de services:', serviciosParseados);
        let definedObservationsInput = document.getElementById("observacionesInput").value === ''
            ? serviciosParseados
            : document.getElementById("observacionesInput").value;
        observacionesInput = definedObservationsInput
        document.getElementById("observacionesInput").value = definedObservationsInput;
        desplegarServiciosYImpuestos(contratoLevantado);
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
        let valActual = valorAlquiler()
        valAlq = reciboLevantado.length > 0 ? reciboLevantado[0].montoAlquiler : valActual;
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
    var nuevoGastoInput = document.getElementById("nuevoGasto").value;
    var nuevoMontoInput = document.getElementById("nuevoMonto").value;
    var contNewDet = document.getElementById("cont-new-det")
    contNewDet.style.display="flex";
    var contNewDet = document.getElementById("cont-detalle");
    contNewDet.style.display="block";
    var contNewMonto = document.getElementById("cont-montos");
    contNewMonto.style.display="flex";
    var contNewDetProp = document.getElementById("cont-detalleProp");
    contNewDetProp.style.display="block";
    var contNewMontoProp = document.getElementById("cont-montosProp");
    contNewMontoProp.style.display="flex";
    //var nuevoMontoInputImp = new Intl.NumberFormat('de-DE').format(nuevoMontoInput)

    var newItem = [nuevoGastoInput,nuevoMontoInput]
    sumarDetalleInq (newItem[1]);
    sumarDetalleProp (newItem[1]);
    items.push(newItem);
    document.getElementById("cont-detalle").value = '';
    document.getElementById("cont-montos").value = '';
    contNewDet.innerHTML += "- "+newItem[0]+"<br>";
    var newItemImp1 = new Intl.NumberFormat('de-DE').format(newItem[1])
    contNewMonto.innerHTML += "$ "+newItemImp1+'.-'+"<br>";
    contNewDetProp.innerHTML += "- "+newItem[0]+"<br>";
    contNewMontoProp.innerHTML += "$ "+newItemImp1+'.-'+"<br>";
    document.getElementById("nuevoGasto").value = '';
    document.getElementById("nuevoMonto").value = '';
    document.getElementById("nuevoGasto").focus();
    impInq();
}

var itemsOnlyProp= [];
function insertDetOnlyProp(){
    var inputDetOP= document.getElementById("nuevoGastoOnlyProp").value;
    var inputMontOP=document.getElementById("nuevoMontoOnlyProp").value;
    var contDetOnlyProp=document.getElementById("cont-new-det-only-prop");
    var contDetOP = document.getElementById("cont-detalleOnlyProp");
    var contMontOP = document.getElementById("cont-montosOnlyProp");
    contDetOnlyProp.style.display="flex";
    contDetOP.style.display="block";
    contMontOP.style.display="flex";
    var newItemOP = [inputDetOP,inputMontOP]
    itemsOnlyProp.push(newItemOP)
    sumarDetalleOnlyProp (newItemOP[1]);
    contDetOP.innerHTML += "- "+newItemOP[0]+"<br>";
    var newItemImp1OP = new Intl.NumberFormat('de-DE').format(newItemOP[1])
    contMontOP.innerHTML += "$ "+newItemImp1OP+'.-'+"<br>";
    document.getElementById("nuevoGastoOnlyProp").value = '';
    document.getElementById("nuevoMontoOnlyProp").value = '';
    document.getElementById("nuevoGastoOnlyProp").focus();
    impInq();
}

function deleteDetalle(){
    document.getElementById("cont-detalle").innerHTML = '';
    document.getElementById("cont-montos").innerHTML = '';
    document.getElementById("cont-detalleProp").innerHTML = '';
    document.getElementById("cont-montosProp").innerHTML = '';
    items = [];
    detalleTotal = 0;
    detalleTotalProp = 0;
    //document.getElementById("pesos").value = '';
    document.getElementById("pesosLetra").innerHTML = '';
    impInq();
}

function deleteDetalleOnlyProp(){
    document.getElementById("cont-detalleOnlyProp").innerHTML = '';
    document.getElementById("cont-montosOnlyProp").innerHTML = '';
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

// function parcerServices (servicios) {
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

function formatUTCDateToDDMMYYYY(value) {
  if (!value) return '';
  const d = value instanceof Date ? value : new Date(value);
  if (isNaN(d.getTime())) return '';
  const dd = String(d.getUTCDate()).padStart(2, '0');
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  const yyyy = d.getUTCFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function parcerServices (servicios) {
    let textObservaciones = 'Recibí los comprobantes de pago de ';

    if (!Array.isArray(servicios) || servicios.length === 0) return textObservaciones;

    for (const svc of servicios) {
        if (!svc) continue;
        if (svc.pagado === true) {
            const dateFormated = formatUTCDateToDDMMYYYY(svc.vencimiento);
            const nombre = (svc.nombreServicio || '').toString().toUpperCase();
            textObservaciones += `${nombre} vto. ${dateFormated}, `;
        }
        if (textObservaciones === 'Recibí los comprobantes de pago de ') {
            textObservaciones = '';
        }
    }
    if (textObservaciones.endsWith(', ')) {
        textObservaciones = textObservaciones.slice(0, -2) + '.';
    }
    return textObservaciones;
}


async function cargarServicios () {
    
    if (reciboLevantado.length !== 0 || NUMERACION) {
        const numReciboLevantado = reciboLevantado[0] ? reciboLevantado[0].numeroRecibo : NUMERACION;
        try {
            const data = await getServices(numReciboLevantado);
            if (!data || !Array.isArray(data) || data.length === 0) {
                console.log('No services for recibo', numReciboLevantado);
                return data;
            }
            for (let service in data) {
                const vtoElement = document.getElementById(`vto-${data[service].nombreServicio}`);
                const pagadoElement = document.getElementById(`pagado-${data[service].nombreServicio}`);

                if (vtoElement && pagadoElement) {
                    vtoElement.value = data[service].vencimiento === null
                        ? ''
                        : new Date(data[service].vencimiento).toISOString().split('T')[0];
                    pagadoElement.checked = data[service].pagado;
                    console.log('servicio cargado: ', service);
                }
            }
            console.log('data cargada', data);
            const textareaObservaciones = document.getElementById('observacionesInput');
            const spanObservaciones = document.getElementById('observacionesPrint');
            const spanObsProp = document.getElementById('obsProp');            
            const observacionesText = parcerServices(data);
            
            console.log('observaciones: ', observacionesText);
            if (textareaObservaciones.value === '' ||
                //textareaObservaciones.textContent === '' ||
                textareaObservaciones.textContent === 'Recibí los comprobantes de pago de ') {
                textareaObservaciones.textContent = observacionesText;
                textareaObservaciones.value = observacionesText;
                spanObservaciones.textContent = observacionesText;
                spanObsProp.textContent = observacionesText;
            }


            return data;
        } catch (err) {
            console.error('Error cargando servicios:', err);
            throw err;
        }
    }
    return Promise.resolve();
}
///////////////////////////////////////////////////
async function desatascarServicesUltimoRecibo () {
    alert('recibo ultimo atascado')
    const serviciosBorradosPorConflicto = await deleteServicesByNumRecibo(NUMERACION);
    console.log('Servicios borrados por conflicto:', serviciosBorradosPorConflicto);
    impInq();
}
///////////////////////////////////////////////////////
async function guardarServiciosNuevos() {
    if (document.getElementById('vence').value === '') return;
    if (reciboLevantado.length > 0 && reciboLevantado[0].numeroRecibo < 6192) return; // filtro retro compatibilidad
    if (reciboLevantado.length === 0 ||
         reciboLevantado[0].numeroRecibo === NUMERACION) {
        const serviciosUltimoRecibo = await getServices(NUMERACION);
        if (serviciosUltimoRecibo.length > 0) {
            if (serviciosUltimoRecibo.find( s => s.numeroContrato !== contratoLevantado[0].idContrato)) {
                const ServiciosBorrados = await desatascarServicesUltimoRecibo ();
                console.log('Servicios borrados por conflicto:', ServiciosBorrados);
                return;
            }
        }
    }


    if (reciboLevantado.length === 0 && contratoLevantado.length !== 0) {
        const serviciosInDB = await getServices(NUMERACION);
        let services = [];
        if (serviciosInDB.length > 0) {

            for (let service in serviciosInDB) {
                console.log(`Servicio ${serviciosInDB[service].nombreServicio} ya existe - actualizando...`);
                await editService({
                    numeroRecibo: NUMERACION,
                    nombreServicio: serviciosInDB[service].nombreServicio
                },{
                    numeroContrato: contratoLevantado[0].idContrato,
                    numeroRecibo: NUMERACION,
                    nombreServicio: serviciosInDB[service].nombreServicio,
                    vencimiento: document.getElementById(`vto-${serviciosInDB[service].nombreServicio}`).value,
                    pagado: document.getElementById(`pagado-${serviciosInDB[service].nombreServicio}`).checked
                });
            }
        } else {
            services = servicesAndTaxes(contratoLevantado);
            console.log('Servicios:', services);
            for (let service in services) {
                console.log('Servicio a guardar:', service);
                // let elVto = document.getElementById(`vto-${service}`);
                // let elPagado = document.getElementById(`pagado-${service}`);

                // let vencimiento = !elVto.value ? null : elVto.value
                // let pagado = !elPagado.checked ? false : elPagado.checked
                await addService({
                    numeroContrato: contratoLevantado[0].idContrato,
                    numeroRecibo: NUMERACION,
                    nombreServicio: service,
                    vencimiento: null,
                    pagado: false
                });
            }
        }
    }
    if (reciboLevantado.length !== 0 && contratoLevantado.length !== 0) {
        const services = servicesAndTaxes(contratoLevantado);
        const serviciosExistentes = await getServices(reciboLevantado[0].numeroRecibo);

        console.log('Servicios del contrato actuales:', services);
        console.log('Servicios existentes en DB del recibo:', serviciosExistentes);

        if (serviciosExistentes.length === 0) {
            let numImpressedInBill = document.getElementById('num').textContent
            let numeroRecibo = numImpressedInBill === NUMERACION.toString() ? NUMERACION : reciboLevantado[0].numeroRecibo;
            for (let service in services) {

                console.log('add from bill: ',{numeroRecibo: numeroRecibo, nombreServicio: service})
                await addService({
                    numeroContrato: contratoLevantado[0].idContrato,
                    numeroRecibo: numeroRecibo,
                    nombreServicio: service,
                    vencimiento: null, //document.getElementById(`vto-${service}`).value,
                    pagado: false //document.getElementById(`pagado-${service}`).checked
                });

            }
            return;
        }
        if (serviciosExistentes.length > 0) {
            for (let service in serviciosExistentes) {
                // const servicioExistente = serviciosExistentes.find(
                //     s => s.nombreServicio === service
                // );
                // if (servicioExistente) {
                    console.log(`Servicio ${serviciosExistentes[service].nombreServicio} ya existe - actualizando...`);
                    await editService({
                        numeroRecibo: reciboLevantado[0].numeroRecibo,
                        nombreServicio: serviciosExistentes[service].nombreServicio
                    },{
                        numeroContrato: contratoLevantado[0].idContrato,
                        numeroRecibo: reciboLevantado[0].numeroRecibo,
                        nombreServicio: serviciosExistentes[service].nombreServicio,
                        vencimiento: document.getElementById(`vto-${serviciosExistentes[service].nombreServicio}`).value,
                        pagado: document.getElementById(`pagado-${serviciosExistentes[service].nombreServicio}`).checked
                    });
                // } else {
                //     console.log(`Servicio ${service} es nuevo - agregando...`);
                //     await addService({
                //         numeroContrato: contratoLevantado[0].idContrato,
                //         numeroRecibo: reciboLevantado[0].numeroRecibo,
                //         nombreServicio: service,
                //         vencimiento: document.getElementById(`vto-${service}`).value,
                //         pagado: document.getElementById(`pagado-${service}`).checked
                //     });
                // }
            }
        }
    }
}

function buscarServiciosDeudaConId () {
    let idContrato = contratoLevantado.length > 0
        ? contratoLevantado[0].idContrato
        : ''

    if (idContrato === '' || idContrato === null) {
        idContrato = prompt('Falta un id de contrato, puedes ingresar uno aca')
        if (idContrato === null) return
    }

    buscarDeudaServicios(idContrato);
};

let llamadaBtnServiciosImpagos = false;
let btnBuscarDeuda = document.getElementById('buscar-deuda-btn');
btnBuscarDeuda.addEventListener('click', () => {
    llamadaBtnServiciosImpagos = true;
});

async function buscarDeudaServicios (idContrato)  {
    let data = [];
    data = await getContratoServices(idContrato);
    // 
    if (!data || !Array.isArray(data) || data.length === 0) {
        console.log('No hay servicios impagos para este contrato', idContrato);
        if (llamadaBtnServiciosImpagos === true) {
            alert('No hay servicios impagos para este contrato');
            llamadaBtnServiciosImpagos = false;
        }
        return data;
    }
    const serviciosConDeuda = data.filter( service => {
        let hoy = new Date();
        let limitDate = new Date(hoy.getFullYear(), hoy.getMonth() - 1, 30);
        return (new Date(service.vencimiento) < limitDate
                    || new Date(service.vencimiento) === null)
                && service.pagado === false
    })
    if (serviciosConDeuda.length > 0) {
        console.log('servicios con deuda', serviciosConDeuda);
        ejecutarProtocoloDeuda(serviciosConDeuda, idContrato)
    }
    return data;
};

function cerrarModal () {
    const modal = document.getElementById('modal-background');
    modal.classList.remove('is-visible');
    reciboLevantado = [];
}

let datosServiciosDeuda = [];

async function ejecutarProtocoloDeuda (serviciosConDeuda, idContrato) {
    const modalSection = document.getElementById('modal-background');
    const modal = document.getElementById('modal');
    const btnClose = document.getElementById('cerrar-modal')
    modalSection.classList.add('is-visible');
    btnClose.focus();
    let contrato = {};
    if (contratoLevantado.length === 0) {
        console.log(idContrato)
        await getContrato(idContrato);
        contrato = contratoLevantado[0];
    } else {
        contrato = contratoLevantado[0];
    }

    document.getElementById('title-modal-h3').innerHTML = '';
    document.getElementById('title-modal-h3').innerHTML = 'Servicios impagos';
    const addressTitle = document.getElementById('serv-impagos-direccion');
    addressTitle.innerHTML = `${contrato.direccion}`
    document.getElementById('content-services').innerHTML = '';
    datosServiciosDeuda = [];
    for (let servicio in serviciosConDeuda) {
        let data = {};
        data.numeroRecibo = serviciosConDeuda[servicio].numeroRecibo;
        data.numeroContrato = serviciosConDeuda[servicio].numeroContrato;
        data.vencimiento = serviciosConDeuda[servicio].vencimiento;
        data.pagado = serviciosConDeuda[servicio].pagado;
        data.nombreServicio = serviciosConDeuda[servicio].nombreServicio;
        data.modificado = false;
        datosServiciosDeuda.push(data);
        crearInputsServicioInModal(serviciosConDeuda[servicio], 'content-services')
    }
}

function marcarModificacionServicios (idInput) {
    let textId = idInput.split('-');
    let nombreServicioT = textId[1];
    let numeroReciboT = textId[2];
    console.log('datosServiciosDeuda', datosServiciosDeuda);
    console.log(datosServiciosDeuda.find(s => s.numeroRecibo == numeroReciboT && s.nombreServicio == nombreServicioT))
    datosServiciosDeuda.find(s => s.numeroRecibo == numeroReciboT && s.nombreServicio == nombreServicioT).modificado = true;
}

function crearInputsServicioInModal(service, idContenedor) {
    const contServTaxex = document.getElementById(idContenedor); // ID de tu contenedor

    // 1. Crear el contenedor principal
    const divItem = document.createElement('div');
    divItem.className = 'service-tax-item';

    // 2. Crear la etiqueta (Label)
    const opDate2 = {year:'numeric',month:'short'};
    var sv = Date.parse(service.vencimiento)+86400000
    dateShort = new Date(sv).toLocaleDateString("sp-IN", opDate2)
    const label = document.createElement('label');
    label.htmlFor = `${service.nombreServicio}-${service.numeroRecibo}`;
    label.textContent = `${service.nombreServicio}-${service.numeroRecibo}`;

    // 3. Crear el Input de Fecha (Vencimiento)
    const inputDate = document.createElement('input');
    inputDate.type = 'date';
    inputDate.name = `vencimiento-${service.nombreServicio}-${service.numeroRecibo}`;
    inputDate.id = `vto-${service.nombreServicio}-${service.numeroRecibo}`;
    if (service.vencimiento) {
        inputDate.value = (service.vencimiento).slice(0, 10);
    }

    // 4. VINCULAR el evento correctamente usando addEventListener
    inputDate.addEventListener('change', marcarModificacionServicios(inputDate.id));

    // 5. Crear el Input Checkbox (Pagado)
    const inputCheckbox = document.createElement('input');
    inputCheckbox.type = 'checkbox';
    inputCheckbox.name = `pagado-${service.nombreServicio}-${service.numeroRecibo}`;
    inputCheckbox.id = `pagado-${service.nombreServicio}-${service.numeroRecibo}`;

    // 6. VINCULAR el evento correctamente
    inputCheckbox.addEventListener('change', marcarModificacionServicios(inputCheckbox.id));

    // 7. Ensamblar la estructura
    divItem.appendChild(label);
    divItem.appendChild(inputDate);
    divItem.appendChild(inputCheckbox);

    // 8. Añadir al contenedor padre
    contServTaxex.appendChild(divItem);
}

async function actualizarDeudaInModal() {
    let precheck = () => {
        for (let servicio in datosServiciosDeuda) {
            if (datosServiciosDeuda[servicio].modificado) {
                let vencimiento = document.getElementById(`vto-${datosServiciosDeuda[servicio].nombreServicio}-${datosServiciosDeuda[servicio].numeroRecibo}`).value;
                let pagado = document.getElementById(`pagado-${datosServiciosDeuda[servicio].nombreServicio}-${datosServiciosDeuda[servicio].numeroRecibo}`).checked;
                if ((vencimiento === '' || vencimiento === null) && pagado === true) {
                    alert('Marcaste como pagado un servicio sin fecha de vencimiento, completa los campos y vuelve a intentarlo.');
                    return false;
                }
            }
        }
        return true;
    }

    if (precheck()) {
        for (let servicio in datosServiciosDeuda) {
            if (datosServiciosDeuda[servicio].modificado) {
                await editService({
                    numeroRecibo:datosServiciosDeuda[servicio].numeroRecibo,
                    nombreServicio:datosServiciosDeuda[servicio].nombreServicio
                },
                {
                    numeroContrato: datosServiciosDeuda[servicio].numeroContrato,
                    numeroRecibo: datosServiciosDeuda[servicio].numeroRecibo,
                    nombreServicio: datosServiciosDeuda[servicio].nombreServicio,
                    vencimiento: document.getElementById(`vto-${datosServiciosDeuda[servicio].nombreServicio}-${datosServiciosDeuda[servicio].numeroRecibo}`).value,
                    pagado: document.getElementById(`pagado-${datosServiciosDeuda[servicio].nombreServicio}-${datosServiciosDeuda[servicio].numeroRecibo}`).checked
                });
            }
        }
        buscar(contratoLevantado[0].idContrato);
    }
}

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