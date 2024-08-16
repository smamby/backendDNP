

const u = 'http://localhost:5500';

const c = '/contratos/'
const r = '/recibos/'
const p = '/printPDF/'


const header = {
    headers: {
        'Access-Control-Allow-Origin': 'http://127.0.0.1:5500'
    }
}
var reciboLevantado = [];
var contratoLevantado = [];

async function getContrato(searchParam){
    const res = await fetch(u+c+searchParam, {
      method: 'GET',
      mode: 'cors'
    })
    const data = await res.json()
    console.log('url: ',u+c+searchParam)
    console.log('contrato[api]',data)
    contratoLevantado = data;
}
async function getRecibos(searchParam){
    const res = await fetch(u+r+searchParam, {
      method: 'GET',
      mode: 'cors'
    })
    const data = await res.json()
    console.log('url: ',u+r+searchParam)
    console.log('recibo', data)
    reciboLevantado = data;
    //await getContrato(parseInt(reciboLevantado[0]["idContrato"]))
}
//getContrato(435)
//getRecibos(13)

const r17 = {
  "numeroRecibo": 17,
  "fechaRecibo": "2021-10-04T03:00:00.000Z",
  "propietario": "Fernanda Ramirez",
  "inquilino": "Juana Colleman",
  "montoAlquiler": 57000,
  "fechaVencimiento": "2023-10-30T03:00:00.000Z",
  "textoTotal": "Cincuenta y siete mil",
  "detalles": [
    [
      "gas",
      -3000
    ],
    [
      "abl",
      -500
    ]
  ],
  "observaciones": "Adjunto recibo expensas mar 2023, luz mar 2023",
  "tipoHonorarios": "administracion",
  "idContrato": 435
}

async function addRecibo(recibo){
  var numRecibo = recibo["numeroRecibo"]
  console.log(numRecibo)
  var chkRecibo = await getRecibos(numRecibo);
  console.log(reciboLevantado)
  console.log(reciboLevantado.length)
  if (reciboLevantado.length == 0) {
    const nuevoRecibo = await fetch(u+r, {
      method: 'POST',
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(recibo)
  })
    //const data = await nuevoRecibo.json();
    console.log(nuevoRecibo)
  } else {
    editRecibo(recibo)
    //console.log('Ya existe un recibo con ese numero, corregi la info')
  }    
}
  
async function addContrato(contrato){
  // var numContrato = parseInt(contrato["idContrato"])
  // console.log(numContrato)
  // var chkContrato = await getContrato(numContrato);
  // console.log(contratoLevantado)
  // //console.log(chkContrato.length)
  // if (contratoLevantado.length == 0) {
    const nuevoContrato = await fetch(u+c, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contrato),
    })
    console.log(nuevoContrato);
    alert(`Creaste un nuevo contrato en calle ${contrato.direccion} con el ID: ${contrato.idContrato}`)
  // } else {
  //   console.log('el idContrato ya exite, verificá la informacion')
  // }
}

async function editRecibo(dataNueva){
  searchParam = reciboLevantado[0]["numeroRecibo"];
  const recibo = await fetch(u+r+searchParam, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataNueva)
  })
  console.log(recibo)
  console.log('Recibo n°'+searchParam+' editado')
}

async function editContrato(dataNueva){
  searchParam = contratoLevantado[0]["idContrato"];
  const contrato = await fetch(u+c+searchParam, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataNueva)
  })
  console.log('ContEdit: ',contrato);
  console.log('Contrato n°'+searchParam+' editado')
  // .then((savedContrato)=>{
  //   return savedContrato
  // })
  return contrato
}

async function deleteContrato(searchParam){
  if(confirm('Vas a eliminar definitivamente el contrato N° '+contratoLevantado[0]["idContrato"])){
    const deleted = await fetch(u+c+searchParam, {
      method: 'DELETE'
    })
    console.log('Contrato n°'+contratoLevantado["idContrato"]+' eliminado')
  }  
}




async function imprimirReciboPDFBack(inbody,filename){
  if (typeof inbody !== 'string') {
    throw new Error('inbody must be a string');
  }
  
  console.log(`[[[API INBODY.outerHTML]]]   ${inbody}`)
  
  if (window.isFetching) return;
  window.isFetching = true;
  try {
    const response = await fetch(u+p, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ html: inbody, filename }),
    });

    if (!response.ok) {
      throw new Error(`Error generating PDF: ${await response.text()}`);
    }

    const result = await response.json();
    console.log('PDF generated successfully:', result);
    return result;
  } catch (error) {
    console.error('Error during PDF generation:', error);
    throw error;
  } finally {
    window.isFetching = false;
  }
}

window.imprimirReciboPDFBack = imprimirReciboPDFBack;

//window.onbeforeunload = null;

window.onbeforeunload = ()=>{
  return 'ACEPTAR para cerrar la aplicacion. CANCELAR para refrescar la pagina' 
}


// window.addEventListener('unload', ()=>{
//   fetch(u+'/close',{
//     method: 'POST',
//     headers: {
//       'Access-Control-Allow-Private-Network': 'true'
//     }
//   })
// })
  
