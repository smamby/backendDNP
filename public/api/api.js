

const u = 'http://localhost:5500';

const c = '/contratos/';
const r = '/recibos/';
const p = '/printPDF/';
const sm = '/sendMail/';
const serv = '/services';
const daBa = '/databancaria';


const headers = {
    headers: {
        'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
        'Accept': 'application/json'
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
    return data
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
    return data
}
async function getRecibosContrato(searchParam){
    const res = await fetch(u+r+'contrato/'+searchParam, {
      method: 'GET',
      mode: 'cors'
    })
    const data = await res.json()
    console.log('url: ',u+r+'contrato/'+searchParam)
    console.log('recibo', data)
    reciboLevantado = data;
}

//getContrato(435)
//getRecibos(13)
async function getServices(searchParam) {
  console.log('Requesting services URL:', `${u}${serv}?numeroRecibo=${searchParam}`);
   try {
    const response = await fetch(`${u}${serv}?numeroRecibo=${searchParam}`, {
      method: 'GET',
      mode: 'cors',
      headers
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const services = await response.json();
    console.log('Services received:', services);
    return services;

  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
}

async function getContratoServices (searchParam) {
  console.log('Requesting services URL:', `${u}${serv}/contrato?numeroContrato=${searchParam}`);
  try {
    const response = await fetch(`${u}${serv}/contrato?numeroContrato=${searchParam}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const services = await response.json();
    return services

  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
}

async function getAllDataBancaria () {
  try {
    const response = await fetch(`${u}${daBa}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const datasBancarias = await response.json();
    return datasBancarias

  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
}

async function getOneDataBancaria (idContrato) {
  try {
    if (!idContrato || isNaN(Number(idContrato)) || idContrato < 1 || idContrato === '') {
      const error = new Error('El ID de Contrato es inválido o falta.');
      error.statusCode = 400;
      throw error;
    }
    const response = await fetch(`${u}${daBa}/${idContrato}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const dataBancaria = await response.json();
    console.log(`Data bancaria para ${contratoLevantado[0].direccion}:`, dataBancaria);
    return dataBancaria
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
}

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
  var numContrato = Number(contrato["idContrato"])
  // console.log(numContrato)
  var chkContrato = await getContrato(numContrato);
  // console.log(contratoLevantado)
  // //console.log(chkContrato.length)
  if (contratoLevantado.length == 0) {
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
  } else {
     console.log('el id seleccionado para el Contrato ya exite, verificá la informacion')
  }
}
async function addService(service) {
  const newService = await fetch(u+serv, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(service)
  })
  const text = await newService.text();
  console.log('res status: ', newService.status, newService.ok, text);
  return newService;
}

async function addDataBancaria(dataBancaria) {
  const newDataBancaria = await fetch(u+daBa, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataBancaria)
  })
  const text = await newDataBancaria.text();
  console.log('res status: ', newDataBancaria.status, newDataBancaria.ok, text);
  return newDataBancaria;
}

async function editDataBancaria(idContrato, dataBancaria) {
  const filter = {idContrato: idContrato};
  const edited = await fetch(`${u}${daBa}/${idContrato}`, {
    method: 'PATCH',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataBancaria)
  })
  console.log('[store] Edited data bancaria:', edited);
  return edited;
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

async function editService(searchParams, changes) {
  const numeroRecibo = searchParams.numeroRecibo;
  const nombreServicio = searchParams.nombreServicio;
  console.log(`${u}${serv}?numeroRecibo=${numeroRecibo}&nombreServicio=${nombreServicio}`)
  const serviceEdited = await fetch(`${u}${serv}?numeroRecibo=${numeroRecibo}&nombreServicio=${nombreServicio}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(changes)
  })
  console.log('Service edited: ', await serviceEdited.json());
  return serviceEdited;
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

  //console.log(`[[[API INBODY.outerHTML]]]   ${inbody}`)

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
    } else {
      if (window.opener) {
        const result = await response.json();
        console.log('PDF generated successfully: '+ result.filePathProduccion);
        window.opener.alert('PDF generated successfully in: '+ result.filePathProduccion);
      }
    }
  } catch (error) {
    console.error('Error during PDF generation:', error);
    throw error;
  } finally {
    window.isFetching = false;
    window.close();
  }
}

//window.imprimirReciboPDFBack = imprimirReciboPDFBack;

//window.onbeforeunload = null;


async function sendMailToBackend(filename, destiny, subjectmail, bodymail) {
  const response = await fetch(u+sm, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      filenamePDF: filename,
      mailDestiny: destiny,
      subjectMail: subjectmail,
      bodyMail: bodymail,
    })
  })
  if (!response.ok){
    alert(await response.text());
    throw new Error('Error al intentar mandar el mail '+ await response.text());
  }
  const result = await response.text();
  console.log(result);
  alert(result);
}

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
