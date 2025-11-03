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
    document.getElementById("observacionesInput").value = 'Recibí los comprobantes de pago de ';
    document.getElementById("cont-input-serv").innerHTML = '';
    deleteDetalle();
    deleteDetalleOnlyProp();
    desplegarServiciosYImpuestos(); //solo despliega los inputs, no carga los datos guardados
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
function impInq(){
    if (itemEncontrado==''){
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
        var observacionesInput = document.getElementById("observacionesInput").value;
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

        valorAlquiler()
        var valAlqImp = new Intl.NumberFormat('de-DE').format(valAlq)
        var comiImp = new Intl.NumberFormat('de-DE').format(comi)
        console.log(valAlq,comi)
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
        //console.log(obsSugeridas);
        //observacionesinputProp
        // createObs();
        // console.log(observacionesInput)
        // //observacionesPrint.innerHTML = createObs();
        // function createObs() {
        //     if (observacionesInput==""){
        //             observacionesPrint.innerHTML = obsSugeridas;
        //             observacionesPrintProp.innerHTML = obsSugeridas;
        //         } else {
        //             observacionesPrint.innerHTML =  observacionesInput;
        //             observacionesPrintProp.innerHTML = observacionesInput;
        //         }
        //     }
        // sumarDetalleInq()
        // sumarDetalleProp()
        //detalleTotalImp = new Intl.NumberFormat('de-DE').format(detalleTotal)
        //detalleTotalPropImp = new Intl.NumberFormat('de-DE').format(detalleTotalProp)
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
        guardarRecibo();
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
        comi = valorComision(itemEncontrado.valor3)
        console.log('3er año',comi);
        valAlq = itemEncontrado.valor3

    } else if (today > dateTemp2) {
        comi = valorComision(itemEncontrado.valor2)
        console.log('2do año',comi)
        valAlq = itemEncontrado.valor2

    } else if (today < dateTemp2) {
        comi = valorComision(itemEncontrado.valor1)
        valAlq = itemEncontrado.valor1
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