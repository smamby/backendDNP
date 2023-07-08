// import { Deptos } from "./proto.mjs"
// import { calculoFecha } from "./proto.mjs";
// import { propietarioOb } from "./proto.mjs";
// import { inquilinoOb } from "./proto.mjs";
//import { calculoRenovacion } from "./proto.mjs";
// require('./styles/style.css');
// require('./proto').default;



//const { on } = require("../../backend/CRUDServerDB2/src/models/contrato");

// import ContratoService from './services/contratoService';
// import { FormData } from 'node-fetch';
// import { webpack } from 'webpack';
// import { fromByteArray } from 'ipaddr.js';
//const { jsPDF } = window.jspdf;

// THEME
function styleDark(){
   document.body.classList.toggle('dark')
   if(document.body.classList=='dark'){
      document.getElementById("img").src = "./assets/btnTheme dark.png";
      document.documentElement.style.backgroundColor = "rgb(0,10,10)";
   } else {
      document.getElementById("img").src = "./assets/btnThemeRandom.png";
      document.documentElement.style.backgroundColor = "rgb(231, 231, 230)";      
   }
};
function randomColor(){
   document.body.style.background = `#${Math.floor(Math.random() * 0xffffff).toString(16)}`
}

var divImp = document.getElementById("imprimir");
divImp.style.display="none"
// //capturar eventos
// document.getElementById("operaciones")
//    .addEventListener('submit',e =>{
//       nombrePInput = document.getElementById("nombreP").value;
//       apellidoPInput = document.getElementById("apellidoP").value;
//       dniPInput = document.getElementById("dniP").value;
//       cbuPInput = document.getElementById("cbuP").value;
//       celularPInput = document.getElementById("celularP").value;
//       emailPInput = document.getElementById("emailP").value;   
//       direccionPInput = document.getElementById("direccionP").value;
//       nombreIInput = document.getElementById("nombreI").value;
//       apellidoIInput = document.getElementById("apellidoI").value;
//       dniIInput = document.getElementById("dniI").value;
//       cbuIInput = document.getElementById("cbuI").value;
//       celularIInput = document.getElementById("celularI").value;
//       emailIInput = document.getElementById("emailI").value;   
//       garantiaIInput = document.getElementById("garantiaI").value;
//       idInput = document.getElementById("id").value;
//       direccionInput = document.getElementById("direccion").value   ;
//       inicioContratoInput = document.getElementById("inicioContrato").value;
//       valor1Input = document.getElementById("valor1").value;
//       valor2Input = document.getElementById("valor2").value;
//       valor3Input = document.getElementById("valor3").value;
//       obligacionesInqInput = document.getElementById("obligacionesInq").value;
//       observacionesInput = document.getElementById("observaciones").value;
//       descripcionInput = document.getElementById("descripcion").value;
//       imagenesInput = document.getElementById("imagenesFile").files;;
//       contratoInput = document.getElementById("contratoFile").files;;
//       e.preventDefault(); 
//       console.log("emailIInput",emailIInput)
//       console.log("garantiaIInput",garantiaIInput)
//       console.log("idInput",idInput)
//       console.log("direccionInput",direccionInput)
//       console.log("inicioContratoInput",inicioContratoInput)
      
//       crear();
      
      
// })

//Levantar inputs
//var contratos = []
//var indices = []
cargarInfo();
console.log('indices',indices);
console.log('NUMERACION: ', NUMERACION);
var nombrePInput = '';
var apellidoPInput = '';
var celularPInput = '';
var emailPInput = '';
var dniPInput = '';
var cbuPInput = '';
var direccionPInput = '';

var nombreIInput = '';
var apellidoIInput = '';
var celularIInput = '';
var emailIInput = '';
var dniIInput = '';
var cbuIInput = '';
var garantiaIInput = '';

var idInput = '';
var direccionInput = '';
//var propietarioInput = '';
//var inquilinoInput = '';
var inicioContratoInput = '';
var valor1Input = '';
var descripcionInput = '';
//var obligacionesInqIn = [];
var valor2Input = 0;
var valor3Input = 0;
var imagenesInput = [];
var contratoInput = [];
var observacionesInput = "";
var obligacionesInqInput = '';

var bodyContrato = {};
//document.querySelector('#btn').addEventListener('click',ejecutar);

function calculoFecha(date,y) {
   console.log(date)
   let parseDate = Date.parse(date)
   console.log(parseDate);
   let objDate = new Date(parseDate)
   var newDate = objDate.setFullYear(objDate.getFullYear() + y);
   var fechaFinal = new Date(newDate);
   console.log(fechaFinal)
   const optionDate = {year:'numeric',month:'numeric',day:'numeric'};
   var stringFecha = fechaFinal.toLocaleDateString("hi-IN",optionDate);
   console.log(stringFecha);
   return stringFecha;
};

function calculoRenovacion(date){
   return calculoFecha(date,3)
}
function calculoValor2(date){
   return calculoFecha(date,1)
}
function calculoValor3(date){
   return calculoFecha(date,2)        
}


function ejecutar(){
   //propietario  
   var nombrePropietario = document.getElementById("nombreP").value;
   var apellidoPropietario = document.getElementById("apellidoP").value;
   var dniPropietario = document.getElementById("dniP").value;
   var cbuPropietario = document.getElementById("cbuP").value;
   var celularPropietario = document.getElementById("celularP").value;
   var emailPropietario = document.getElementById("emailP").value;
   var direccionPropietario = document.getElementById("direccionP").value;
   //inquili
   var nombreInquilino = document.getElementById("nombreI").value;
   var apellidoInquilino = document.getElementById("apellidoI").value;
   var dniInquilino = document.getElementById("dniI").value;
   var cbuInquilino = document.getElementById("cbuI").value;
   var celularInquilino = document.getElementById("celularI").value;
   var emailInquilino = document.getElementById("emailI").value;
   var garantiaInquilino = document.getElementById("garantiaI").value;
   //dep
   var idContrato = parseInt(document.getElementById("idContrato").value);
   var direccion = document.getElementById("direccion").value;
   var propietario =  `${nombrePropietario} ${apellidoPropietario}`;
   var inquilino =  `${nombreInquilino} ${apellidoInquilino}`;
   var inicioContrato = document.getElementById("inicioContrato").value;

   var fechaEspaniolInput = calculoFecha(inicioContrato,0);
   var inicioP2input = calculoValor2(inicioContrato);      
   var inicioP3input = calculoValor3(inicioContrato);      
   var renovacioninput = calculoRenovacion(inicioContrato);
   var inicioContratoHISP =  fechaEspaniolInput;
   var valor1 = parseInt(document.getElementById("valor1").value);
   var valor2 = parseInt(document.getElementById("valor2").value);
   var valor3 = parseInt(document.getElementById("valor3").value);
   var inicioP2 =  inicioP2input;
   var inicioP3 =  inicioP3input;
   var renovacion =  renovacioninput;
   var obligacionesInq = document.getElementById("obligacionesInq").value;
   var observaciones = document.getElementById("observaciones").value;
   var descripcion = document.getElementById("descripcion").value;
   var imagenes =  [];
   //"imagenes":document.getElementById("imagenesFile").value,
   // contrato:document.getElementById("contratoFile").value,
   bodyContrato = { 
      "nombrePropietario":nombrePropietario,
      "apellidoPropietario":apellidoPropietario,
      "dniPropietario":dniPropietario,
      "cbuPropietario":cbuPropietario,
      "celularPropietario":celularPropietario,
      "emailPropietario":emailPropietario,
      "direccionPropietario":direccionPropietario,
      
      "nombreInquilino":nombreInquilino,
      "apellidoInquilino":apellidoInquilino,
      "dniInquilino":dniInquilino,
      "cbuInquilino":cbuInquilino,
      "celularInquilino":celularInquilino,
      "emailInquilino":emailInquilino,
      "garantiaInquilino":garantiaInquilino,
      
      "idContrato":idContrato,
      "direccion":direccion,
      "propietario":propietario,
      "inquilino":inquilino,
      "inicioContrato":inicioContrato,
      "inicioContratoHISP":inicioContratoHISP,
      "valor1":valor1,
      "valor2":valor2,
      "valor3":valor3,
      "inicioP2":inicioP2,
      "inicioP3":inicioP3,
      "renovacion":renovacion,
      "obligacionesInq":obligacionesInq,
      "observaciones":observaciones,
      "descripcion":descripcion,
      "imagenes":imagenes
   };   
}

var propietarioOb = {};
var inquilinoOb = {};
var depto = {};

function check(){
   inicioContratoInput = document.getElementById("inicioContrato").value;
   nombreIInput = document.getElementById("nombreI").value;
   apellidoIInput = document.getElementById("apellidoI").value;
   valor1Input = document.getElementById("valor1").value;
   valor2Input = document.getElementById("valor2").value;
   valor3Input = document.getElementById("valor3").value;
   idInput = document.getElementById("idContrato").value;
   direccionInput = document.getElementById("direccion").value;
   if(inicioContratoInput==''){
      alert('Colocá la fecha de inicio de contrato')      
      return false
   } else if (valor1Input == '' && valor2Input == '' && valor3Input == '') {
      alert('No colocaste ningun valor de alquiler')
      return false
   } else if (nombreIInput == '' || apellidoIInput == '') {
      alert('No colocaste nombre o apellido del inquilino, es un dato necesario para el recibo, completalo')
      return false
   } else if (idInput == '' || direccionInput == '') {
      alert('No colocaste la direccion del departamento ni el ID')      
      return false
   } else {
      ejecutar();
      console.log(bodyContrato["idContrato"],' - ', bodyContrato["direccion"]);
      crearIndices();
      addContrato(bodyContrato);
      return true 
}}

function crearIndices(){
   var empujar = [bodyContrato["idContrato"], bodyContrato["direccion"]]
   indices.push(empujar)
   guardarInfo()
}

// function crear(){   
//    propietarioOb = new Propietario({
//       nombre: nombrePInput,
//       apellido:apellidoPInput,
//       celular:celularPInput,
//       email:emailPInput,
//       dni:dniPInput,
//       cbu: cbuPInput,
//       direccionP:direccionPInput,
//    });
//    inquilinoOb = new Inquilino({
//       nombre:nombreIInput,
//       apellido:apellidoIInput,
//       celular:celularIInput,
//       email:emailIInput,
//       dni:dniIInput,
//       cbu: cbuIInput,
//       garantia:garantiaIInput,
//    });
//    depto = new Deptos({
//       id:idInput,
//       direccion:direccionInput,
//       inicioContrato: inicioContratoInput,
//       valor1: parseInt(valor1Input),
//       valor2: parseInt(valor2Input),
//       valor3: parseInt(valor3Input),
//       obligacionesInq: obligacionesInqInput,
//       observaciones: observacionesInput,
//       descripcion: descripcionInput,
//       imagenes: imagenesInput,
//       contrato: contratoInput,
//    });
//    console.log('depto',depto)
//    console.log('propietarioOb',propietarioOb)
//    console.log('inquilinoOb',inquilinoOb)
//    var nuevoContrato = {
//       id: depto._id,
//       propietario: propietarioOb,
//       inquilino: inquilinoOb,
//       departamento: depto,
//    };
//    Object.seal(nuevoContrato);
//    for (var item in nuevoContrato){
//       Object.seal(nuevoContrato[item]);
//    };
//    console.log(Object.getOwnPropertyDescriptors(nuevoContrato))
//    cargarInfo();
//    for(var item of contratos){
//       Object.seal(item)
//    };
//    console.log('contratos',contratos);
//    contratos.push(nuevoContrato);
//    console.log('contratos',contratos);
//    console.log('nuevoContrato',nuevoContrato);
   
   
//    var empujar = [contratos[contratos.length-1].id,contratos[contratos.length-1].departamento._direccion]
   
//    console.log('indice',empujar)
//    indices.push(empujar)
//    console.log('indices',indices)
   
//    console.log('contratos',contratos);
   
//    guardarInfo();
//    //imprimirContrato(nuevoContrato)
//    alert(`Creaste un nuevo contrato en calle ${nuevoContrato.departamento._direccion} con el ID: ${nuevoContrato.id}`)
// }


//Guardar y cargar datos
var indicesGuardados = [];
//var contratosGuardados = [];
var NUM = 0;

function guardar(variable, savedItemName){
   localStorage.setItem(savedItemName,JSON.stringify(variable))
}
function guardarInfo(){
   guardar(indices,"indices");
   //guardar(contratos,"contratos");
   guardar(NUMERACION,"NUMERACION");
   console.log('Datos guardados');   
};
function cargarInfo(){
   // if (indicesGuardados==null || contratosGuardados ==null){
   //    console.log(indicesGuardados,contratosGuardados)
   // } else {
      indicesGuardados = JSON.parse(localStorage.getItem("indices"));
      indices = [...indicesGuardados];
   //    contratosGuardados = JSON.parse(localStorage.getItem("contratos"));
   //    contratos = [...contratosGuardados];
      NUM = JSON.parse(localStorage.getItem("NUMERACION"));
      NUMERACION = NUM;

      // console.log('Datos cargados');
      // console.log('indices',indices);
      // console.log('contratos',contratos);
      //console.log('NUMERACION',NUMERACION);
   }
//}

function indiceContratos(){
   var div = document.getElementById("imprimir");
   div.innerHTML = '';   
   for(var item of indices){      
      div.innerHTML += `Id: [<strong>${item[0]}</strong>] | direccion: <span>${item[1]}</span><br>`;      
   }   
   div.style.display="block"
}
//imprimir booletas


//Buscar e imprimir
var itemEncontrado = '';
var indiceItemEncontrado;
var idBuscar;

async function buscar(id){
   idBuscar = document.getElementById('buscarInput').value;
   await getContrato(idBuscar || id)
   if(idBuscar == ''){
      idBuscar = contratoLevantado[0]["idContrato"];
   } else {
      idBuscar = document.getElementById('buscarInput').value;
   }
   //indiceItemEncontrado = contratos.findIndex(el=> el.id === idBuscar);
   if(contratoLevantado.length == 0){
      alert('contrato inexistente');
      document.getElementById('buscarInput').value = '';   
   } else {
      var dataImprimir = contratoLevantado[0];
      console.log('buscarId: ',dataImprimir);
      //imprimirContrato(dataImprimir);
      levantarContrato(dataImprimir);
      document.getElementById('buscarInput').value = '';
      itemEncontrado = dataImprimir;
   }
   indiceItemEncontrado = indices.findIndex(el=> el[0] == idBuscar); 
   //console.log('contrato inexistente');
   vaciarRecibo();
   impInq() //YA ES DENTRO DE VACIARRECIBO.DELETEDETALLE
}


async function buscarRecibo(){
   document.getElementById("cont-detalle").innerHTML = '';
   document.getElementById("cont-montos").innerHTML = '';
   document.getElementById("cont-detalleProp").innerHTML = '';
   document.getElementById("cont-montosProp").innerHTML = '';
   document.getElementById("cont-detalleOnlyProp").innerHTML = '';
   document.getElementById("cont-montosOnlyProp").innerHTML = '';
   items = [];
   itemsOnlyProp = [];
   detalleTotal = 0;
   detalleTotalProp = 0;
   var nameBuscar = '';
   nameBuscar = document.getElementById('buscarRecibo').value;
   await getRecibos(nameBuscar);
   if(reciboLevantado.length == 0){
      alert('Recibo inexistente');   
      document.getElementById('buscarRecibo').value = '';
      return false;
   } else {   
      //imprimirContrato(dataImprimir);
      await getContrato(reciboLevantado[0]["idContrato"])
      levantarContrato(contratoLevantado[0]);
      document.getElementById('buscarRecibo').value = '';
      itemEncontrado = contratoLevantado[0];
      cargarRecibo()
      impInq();
   }
}
var numRecibo;
function cargarRecibo(){
   items = [];
   var recibo = reciboLevantado[0];
   numRecibo = recibo["numeroRecibo"];
   //document.getElementById('date').innerHTML = recibo["fechaRecibo"];
   //document.getElementById('dateProp').innerHTML = recibo["fechaRecibo"];
   document.getElementById("num").innerHTML = '';
   document.getElementById('numProp').innerHTML = '';
   document.getElementById("num").innerHTML = recibo["numeroRecibo"];
   document.getElementById('numProp').innerHTML = recibo["numeroRecibo"];
   document.getElementById("vence").value = recibo["fechaVencimiento"];
   //document.getElementById("pesos").value = recibo["textoTotal"];
   document.getElementById("observacionesInput").value = recibo["observaciones"];
   document.getElementById("comisionSelect").value = recibo["tipoHonorarios"]
   var detallesRecibo = recibo.detalles;
   for (var detalle of detallesRecibo){
      document.getElementById("nuevoGasto").value = detalle[0];
      document.getElementById("nuevoMonto").value = detalle[1];
      insertarDetalles()
   }
   var detallesReciboOnlyProp = recibo.detallesOnlyProp;
   for (var detalle of detallesReciboOnlyProp){
      document.getElementById("nuevoGastoOnlyProp").value = detalle[0];
      document.getElementById("nuevoMontoOnlyProp").value = detalle[1];
      insertDetOnlyProp();
   }
}

async function guardarRecibo(){
   valorAlquiler();
   var recibo = reciboLevantado[0];
   var contrato = contratoLevantado[0];
   var num = numRecibo? numRecibo: NUMERACION;
   var numContrato = contratoLevantado[0]["idContrato"]
   var dateVence = document.getElementById("vence").value
   //var textoTotal = document.getElementById("pesos").value
   var observaciones = document.getElementById("observacionesInput").value;
   var propietario = `${contrato.nombrePropietario} ${contrato.apellidoPropietario}`;
   var inquilino = `${contrato.nombreInquilino} ${contrato.apellidoInquilino}`;
   var montoAlquiler = valAlq;
   var tipoHonorario = document.getElementById("comisionSelect").value;
   var detallesRecibo = reciboLevantado.length!=0? items: [];
   var detallesReciboOnlyProp = reciboLevantado.length!=0? itemsOnlyProp: [];

   console.log('detalles: ', detallesRecibo);
   console.log('detallesOnlyProp: ', detallesReciboOnlyProp);

   var bodyRecibo = {
      "numeroRecibo": num,
      "fechaRecibo": hoy,
      "propietario": propietario,
      "inquilino": inquilino,
      "montoAlquiler": montoAlquiler,
      "fechaVencimiento": dateVence,
      //"textoTotal": textoTotal,
      "detalles": detallesRecibo,
      "detallesOnlyProp": detallesReciboOnlyProp,
      "observaciones": observaciones,
      "tipoHonorarios": tipoHonorario,
      "idContrato": parseInt(numContrato)
    }
    await getRecibos(num)
    if(reciboLevantado.length == 0){
      console.log('addRecibo')
      addRecibo(bodyRecibo)
    } else {
      console.log('editRecibo')
      editRecibo(bodyRecibo)
      getRecibos(num)
    }
}
// DEPRECATE
// function imprimirContrato(contrato){
//    var div = document.getElementById("imprimir");
//    div.innerHTML = '';
//    var deptoObject = Object.entries(contrato.departamento);
//    var propietarioObject = Object.entries(contrato.propietario);
//    var inquilinoObject = Object.entries(contrato.inquilino);
//    var array = []
//    array.push(deptoObject)
//    array.push(propietarioObject)
//    array.push(inquilinoObject)
//    for(var item of array){
//       for (var el of item){
//          div.innerHTML += `<strong>${el[0]}:</strong>  <span>${el[1]}</span><br>`
//       }
//    }   
// }

//Editar Contrato
function levantarContrato(itemEncontrado){
   document.getElementById("nombreP").value = itemEncontrado.nombrePropietario;
   document.getElementById("apellidoP").value = itemEncontrado.apellidoPropietario;
   document.getElementById("dniP").value = itemEncontrado.dniPropietario;
   document.getElementById("cbuP").value = itemEncontrado.cbuPropietario;
   document.getElementById("celularP").value = itemEncontrado.celularPropietario;
   document.getElementById("emailP").value = itemEncontrado.emailPropietario;
   document.getElementById("direccionP").value = itemEncontrado.direccionPropietario;
    
   document.getElementById("nombreI").value = itemEncontrado.nombreInquilino;
   document.getElementById("apellidoI").value = itemEncontrado.apellidoInquilino;
   document.getElementById("dniI").value = itemEncontrado.dniInquilino;
   document.getElementById("cbuI").value = itemEncontrado.cbuInquilino;
   document.getElementById("celularI").value = itemEncontrado.celularInquilino;
   document.getElementById("emailI").value = itemEncontrado.emailInquilino;
   document.getElementById("garantiaI").value = itemEncontrado.garantiaInquilino;
   
   document.getElementById("idContrato").value = itemEncontrado.idContrato;   
   document.getElementById("direccion").value = itemEncontrado.direccion;
   document.getElementById("inicioContrato").value = itemEncontrado.inicioContrato;
   document.getElementById("valor1").value = itemEncontrado.valor1;
   document.getElementById("valor2").value = itemEncontrado.valor2;
   document.getElementById("valor3").value = itemEncontrado.valor3;
   document.getElementById("obligacionesInq").value = itemEncontrado.obligacionesInq;
   document.getElementById("observaciones").value = itemEncontrado.observaciones;
   document.getElementById("descripcion").value = itemEncontrado.descripcion;
   // document.getElementById("imagenesFile").value = itemEncontrado.imagenes;
   // document.getElementById("contratoFile").value = itemEncontrado.contrato;
}
var AJUSTARINDICE = false
function editarContrato(){
   if(verificarIDEdited()){
      editCont(contratoLevantado)
   }
}
function editCont(contratoLevantado){
   //verificarIDEdited()
   if(confirm("Vas a sobre escribir todos los datos de este contrato estas segura, chequeaste todos los campos?")){
      console.log(contratoLevantado)
      let inicio = contratoLevantado[0].inicioContrato;
      console.log(inicio)
      function calculoRenovacion(date){
         return calculoFecha(date,3)
      }
      function calculoValor2(date){
         return calculoFecha(date,1)
      }
      function calculoValor3(date){
         return calculoFecha(date,2)        
      }
      //contrato.idContrato = document.getElementById("idContrato").value;
      var nombrePropietario = document.getElementById("nombreP").value;
      var apellidoPropietario = document.getElementById("apellidoP").value;
      var celularPropietario = document.getElementById("celularP").value;
      var emailPropietario = document.getElementById("emailP").value;
      var dniPropietario = document.getElementById("dniP").value;
      var cbuPropietario = document.getElementById("cbuP").value;
      var direccionPropietario = document.getElementById("direccionP").value;
      var nombreInquilino = document.getElementById("nombreI").value;
      var apellidoInquilino = document.getElementById("apellidoI").value;
      var celularInquilino = document.getElementById("celularI").value;
      var emailInquilino = document.getElementById("emailI").value;
      var dniInquilino = document.getElementById("dniI").value;
      var cbuInquilino = document.getElementById("cbuI").value;
      var garantiaInquilino = document.getElementById("garantiaI").value;
      var idContrato = document.getElementById("idContrato").value;
      var direccion = document.getElementById("direccion").value 
      var inicioContrato = document.getElementById("inicioContrato").value;
      var valor1 = document.getElementById("valor1").value;
      var propietario = `${nombrePropietario} ${apellidoPropietario}`;
      var inquilino = `${nombreInquilino} ${apellidoInquilino}`;
      var observaciones = document.getElementById('observaciones').value;
      var descripcion = document.getElementById('descripcion').value;
      var obligacionesInq = document.getElementById('obligacionesInq').value;
      var valor2 = document.getElementById('valor2').value;
      var valor3 = document.getElementById('valor3').value;
      var inicioContratoHISP = calculoFecha(inicioContrato,0);
      var inicioP2 = calculoValor2(inicioContrato);      
      var inicioP3 = calculoValor3(inicioContrato);      
      var renovacion = calculoRenovacion(inicioContrato);
      // contrato.departamento.imagenes = document.getElementById('imagenesFile').value;
      // contrato.departamento.contrato = document.getElementById('contratoFile').value;
      
      bodyContrato = { 
         "nombrePropietario":nombrePropietario,
         "apellidoPropietario":apellidoPropietario,
         "dniPropietario":dniPropietario,
         "cbuPropietario":cbuPropietario,
         "celularPropietario":celularPropietario,
         "emailPropietario":emailPropietario,
         "direccionPropietario":direccionPropietario,
         
         "nombreInquilino":nombreInquilino,
         "apellidoInquilino":apellidoInquilino,
         "dniInquilino":dniInquilino,
         "cbuInquilino":cbuInquilino,
         "celularInquilino":celularInquilino,
         "emailInquilino":emailInquilino,
         "garantiaInquilino":garantiaInquilino,
         
         "idContrato":idContrato,
         "direccion":direccion,
         "propietario":propietario,
         "inquilino":inquilino,
         "inicioContrato":inicioContrato,
         "inicioContratoHISP":inicioContratoHISP,
         "valor1":valor1,
         "valor2":valor2,
         "valor3":valor3,
         "inicioP2":inicioP2,
         "inicioP3":inicioP3,
         "renovacion":renovacion,
         "obligacionesInq":obligacionesInq,
         "observaciones":observaciones,
         "descripcion":descripcion,
         "imagenes":[]
      };   
      console.log(idContrato)
      if(AJUSTARINDICE) {ajustarIndices()}

      new Promise((resolve,reject)=>{
         resolve( editContrato(bodyContrato) )
      })
      .then(()=>{          
         let chkId = document.getElementById("idContrato").value
         buscar( chkId || itemEncontrado.idContrato ) 
      })
      .then(()=>{ 
         levantarContrato(contratoLevantado[0])
         impInq()
      })      
   };   
};

function verificarIDEdited(){
   var chkId = document.getElementById("idContrato").value;
   var chkDireccion = document.getElementById("direccion").value;
   var direccionNoEditada = contratoLevantado[0].direccion;
   var idNoEditado = (contratoLevantado[0].idContrato).toString();
   var direNOTChanged = direccionNoEditada === chkDireccion;
   var idNOTChanged = idNoEditado === chkId;
   var chk = chkDireccion.includes(chkId);
   console.log(chkId,idNoEditado,direccionNoEditada, chkDireccion, chk);
   console.log('direNOTChanged? ', direNOTChanged);
   console.log('idNOTChanged? ', idNOTChanged)
   if(chk===false){
      alert('No coincide el ID con la direccion!! Revisa los datos')
      return false
   } else if (chk===true) {
      if(direNOTChanged===false || idNOTChanged===false){
         console.log('cambio la direccion o el id');
         AJUSTARINDICE = true;
      }
      return true    
   };
}
function ajustarIndices(){
   console.log('indices[ajustarIndices] ', indices )
   var indx = indices.findIndex(el => el[0] === contratoLevantado[0].idContrato)
   console.log('indx: ',indx)
   var chkId = parseInt(document.getElementById("idContrato").value);
   var chkDireccion = document.getElementById("direccion").value;
   console.log(indices[indx], chkId, chkDireccion)
   indices[indx][0] = chkId;
   indices[indx][1] = chkDireccion;
   console.log(indices[indx]);
   guardarInfo()
}

//Borrar Contrato
function borrarContrato(){   
   deleteContrato(contratoLevantado[0]["idContrato"])
   indices.splice(indiceItemEncontrado,1);
   guardarInfo();
   document.getElementById("nombreP").value = '';
   document.getElementById("apellidoP").value = '';
   document.getElementById("dniP").value = '';
   document.getElementById("cbuP").value = '';
   document.getElementById("celularP").value = '';
   document.getElementById("emailP").value = '';
   document.getElementById("direccionP").value = '';

   document.getElementById("nombreI").value = '';
   document.getElementById("apellidoI").value = '';
   document.getElementById("dniI").value = '';
   document.getElementById("cbuI").value = '';
   document.getElementById("celularI").value = '';
   document.getElementById("emailI").value = '';
   document.getElementById("garantiaI").value = '';

   document.getElementById("idContrato").value = '';
   document.getElementById("direccion").value = '';
   document.getElementById("inicioContrato").value = '';
   document.getElementById("valor1").value = '';
   document.getElementById("valor2").value = '';
   document.getElementById("valor3").value = '';
   document.getElementById("obligacionesInq").value = '';
   document.getElementById("observaciones").value = '';
   document.getElementById("descripcion").value = '';
   indiceContratos();
}

//FREZZAR CONTRATO.PROPERTIES ==> NOS SE PUEDE DESFREEZAR PARA EDITARLOS
// function cargarInfoFreezada(){
//    cargarInfo()
//    for(var item of contratos){
//       Object.freeze(item)
//    }
//    for(var contrato of contratos){
//       Object.keys(contrato).forEach(key=> {
//          Object.freeze(contrato[key])
//       })
//    }
// }
// //cargarInfo();

// function isObject(subject){
//    return typeof subject == 'object'
// }
// function isArreglo(subject){
//    return Array.isArray(subject)
// }

// // DEEPcOPY
// function deepCopy(subject){
//    let copySubject;
//    const subjectIsObject = isObject(subject);
//    const subjectIsArray = isArreglo(subject);

//    if(subjectIsArray){
//       copySubject = [];
//    } else if (subjectIsObject) {
//       copySubject = {};
//    } else {
//       return subject;
//    }

//    for (key in subject){
//       const keyIsObject = isObject(subject[key]);
//       if (keyIsObject) {
//          copySubject[key] = deepCopy(subject[key])
//       } else {
//          if (subjectIsArray) {
//             copySubject.push(subject[key]);
//          } else {
//             copySubject[key] = subject[key];
//          }
//       }
//    }

//    return copySubject;
// };

function imprimir(){
   window.print()
}

function imprimirBoleta(div){
   if (itemEncontrado!=''){
      impInq();

      var ficha = document.getElementById(div);
      var wImp = window.open('','popimp');
      wImp.document.write(`<html><head><title>Print it!</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,500;0,700;1,200;1,600&display=swap" rel="stylesheet"><link rel="stylesheet" type="text/css" href="./styles/imp.css"></head><body><div class="bodyInt">${ficha.innerHTML}</div></body></html>`);
         
     //document.appendChild(divEmail);
      
     setTimeout(async() => {
         wImp.print()         
      }, 500);
      //wImp.document.close();
      //wImp.close();
        
   } else {
      alert('Cargá algun contrato, no cargaste ninguno.');
      document.getElementById("buscarInput").focus();
   }   
}

function imprimirBoletaPDF(){
   if (itemEncontrado!=''){
      impInq();
      var carpeta = `c:/users/seba/documents/prueba/${dateShort}/`;
      var fichaI = document.getElementById('inbody-inq');
      var fichaOuterI = fichaI.outerHTML;
      localStorage.setItem('fichaI',(fichaOuterI))
      var fichaP = document.getElementById('inbody-prop');
      var fichaOuterP = fichaP.outerHTML;
      localStorage.setItem('fichaP',(fichaOuterP))
      var re = reciboLevantado[0];
      var co = contratoLevantado[0];
      console.log("re",re);
      console.log("co",co);
      localStorage.setItem('recibo', JSON.stringify(re));
      localStorage.setItem('contrato', JSON.stringify(co));

      var wImp = window.open('http://127.0.0.1:5500/popimp.html','popimp');
      //var wImp = window.open('http://localhost:5500/popimp.html','popimp');
      //var wImp = window.open('https://smamby.github.io/frontendDNP/popimp.html','popimp');
   //    wImp.document.write(`<html><head><title>Print it!</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   //    <link href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,500;0,700;1,200;1,600&display=swap" rel="stylesheet"><link rel="stylesheet" type="text/css" href="./styles/imp.css"></head><body><div class="bodyInt">${ficha.innerHTML}</div></body></html><script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js" integrity="sha512-qZvrmS2ekKPF2mSznTQsxqPgnpkI4DNTlrdUmTzrDgektczlKNRRhy5X5AAOnx5S09ydFYWWNSfcEqDTTHgtNA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
   //  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js" integrity="sha512-BNaRQnYJYiPSqHHDb58B0yaPfCu+Wgds8Gp/gU33kqBtgNS4tSPHuGibyoeqMV/TJlSKda6FXzoEyYGjTe+vXA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script><script>
   //    var docInq = new jsPDF();
   //    var fileNameInq = 'inq.pdf';
   //    docInq.html(wImp,{
   //       callback: function(docInq) {
   //          docInq.save(fileNameInq);
   //      },
   //      margin: [10, 10, 10, 10],
   //      autoPaging: 'text',
   //      x: 0,
   //      y: 0,
   //      width: 190,
   //      windowWidth: 675
   //    });
    
   //  </script>
   //  `)
      

      // var docInq = new jsPDF();
      // var fichaInq = document.getElementById('inbody-inq');
      // var fileNameInq =  `${re.numeroRecibo} ${co.direccion} inq.pdf`;
      // docInq.html(fichaInq,{
      //    callback: function(docInq) {
      //       docInq.save(fileNameInq);
      //   },
      //   margin: [10, 10, 10, 10],
      //   autoPaging: 'text',
      //   x: 0,
      //   y: 0,
      //   width: 190,
      //   windowWidth: 675
      // });
      

      // var docProp = new jsPDF();
      // var fichaProp = document.getElementById('inbody-prop');
      // var fileNameProp =  `${re.numeroRecibo} ${co.direccion} prop.pdf`;
      // docProp.html(fichaProp,{
      //    callback: function(docProp) {
      //       docProp.save(fileNameProp);
      //   },
      //   margin: [10, 10, 10, 10],
      //   autoPaging: 'text',
      //   x: 0,
      //   y: 0,
      //   width: 190,
      //   windowWidth: 675
      // });

   //   setTimeout(async() => {
   //       wImp.print()         
   //    }, 500);
      //wImp.document.close();
      //wImp.close();
        
   } else {
      alert('Cargá algun contrato, no cargaste ninguno.');
      document.getElementById("buscarInput").focus();
   }   
}


   // var mFrom = "propdelnor@gmail.com";
   // var mTo = itemEncontrado;
   // var reciboName = 'NegroDelInca.pdf';
   // var a = document.getElementById("mail");
   // a.href = `mailto:${mTo}
   //     ?subject=Recibo%20alquiler
   //     &body=Adjuntamos%20recibo%20de%20alquiler
   //     &attachment=c:/${reciboName}`;
   
   //var a = document.getElementById("mail")
   //a.addEventListener('click', sendEmail())
   function sendEmail(div){
      const opDate2 = {year:'numeric',month:'short'};
      var dateVence = document.getElementById("vence").value;
      // var yearDateVence = new Date(dateVence).getFullYear();
      // var monthDateVence = parseInt(new Date(dateVence).getMonth())+1;
      var dateVenceShort = new Date(dateVence).toLocaleString("sp-IN", opDate2)
      var mTo = ''
      var a = document.getElementById("mail")
      if(div === 'inbody-prop'){
         mTo =  itemEncontrado.emailPropietario
         a.href = `mailto:${mTo}?subject=Liquidacion%20alquiler%20-%20${dateVenceShort}&body=Adjuntamos%20liquidacion%20de%20alquiler.%0A%0AAtte.%0ADel%20Norte%20Propiedades.%0A%0A%0A`;
      } else if(div === 'inbody-inq') {
         mTo = itemEncontrado.emailInquilino
         a.href = `mailto:${mTo}?subject=Recibo%20de%20alquiler%20-%20${dateVenceShort}&body=Adjuntamos%20recibo%20de%20alquiler.%0A%0AAtte.%0ADel%20Norte%20Propiedades.%0A%0A%0A`;
      }
      console.log(mTo);      
      window.location.href = a.href
      
   }

cargarInfo();
var numeracionPrint = document.getElementById('num');
var numeracionPrintProp = document.getElementById('numProp');
numeracionPrint.innerHTML = numRecibo? numRecibo: NUMERACION;
numeracionPrintProp.innerHTML = numRecibo? numRecibo: NUMERACION;