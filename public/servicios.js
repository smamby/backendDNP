function formatUTCDateToDDMMYYYY(value) {
  if (!value) return '';
  const d = value instanceof Date ? value : new Date(value);
  if (isNaN(d.getTime())) return '';
  const dd = String(d.getUTCDate()).padStart(2, '0');
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  const yyyy = d.getUTCFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function stringifyServices (servicios) {
    // debugger
    let textObservaciones = 'Recibí los comprobantes de pago de ';

    let hayServiciosPagadosPendientes = servicioPagadoEnModalAIncorporarEnRecibo.some(
        svc => svc.pagado === true && svc.numeroContrato === contratoLevantado[0].idContrato
    )

    if ((!Array.isArray(servicios)
        || servicios.length === 0)
        && !hayServiciosPagadosPendientes) {
          textObservaciones = ''
          return textObservaciones;
        };

    let serviciosPertinentesAIncorporarEnRecibo = [];
    if (hayServiciosPagadosPendientes) {
        serviciosPertinentesAIncorporarEnRecibo = servicioPagadoEnModalAIncorporarEnRecibo.filter(
            svc => svc.pagado === true && svc.numeroContrato === contratoLevantado[0].idContrato
        );
    }
    let serviciosYServiciosPendientes = servicios.concat(serviciosPertinentesAIncorporarEnRecibo);
    console.log('serviciosYServiciosPendientes', serviciosYServiciosPendientes);

    for (const svc of serviciosYServiciosPendientes) {
        if (!svc) continue;
        if (svc.pagado === true) {
            const dateFormated = formatUTCDateToDDMMYYYY(svc.vencimiento);
            const nombre = (svc.nombreServicio || '').toString().toUpperCase();
            textObservaciones += `${nombre} vto. ${dateFormated}, `;
        }
    }
    // debugger
    if (textObservaciones === 'Recibí los comprobantes de pago de ') {
        textObservaciones = '';
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
            const observacionesText = stringifyServices(data);

            console.log('observaciones: ', observacionesText);
            if (
                textareaObservaciones.value === ''
                || textareaObservaciones.value === 'Recibí los comprobantes de pago de '
                //|| textareaObservaciones.textContent === 'Recibí los comprobantes de pago de '
            ) {
                //textareaObservaciones.textContent = observacionesText;
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
    await impInq();
}
///////////////////////////////////////////////////////
async function guardarServiciosNuevos() {

  const venceDate = document.getElementById('vence').value;
    if (venceDate === '') return;
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


    if (reciboLevantado.length === 0 && contratoLevantado.length !== 0 && venceDate !== '') {
        const serviciosInDB = await getServices(NUMERACION);
        let services = [];
        if (serviciosInDB.length > 0) {

            for (let service in serviciosInDB) {
                console.log(`Servicio ${serviciosInDB[service].nombreServicio} ya existe - actualizando...`);
                await editService({
                    numeroRecibo: NUMERACION,
                    nombreServicio: serviciosInDB[service].nombreServicio
                },{
                    // numeroContrato: contratoLevantado[0].idContrato,
                    // numeroRecibo: NUMERACION,
                    // nombreServicio: serviciosInDB[service].nombreServicio,
                    mesAlquiler: new Date(venceDate + 'T00:00:00-03:00'),
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
                    mesAlquiler: new Date(venceDate + 'T00:00:00-03:00'),
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
                    mesAlquiler: new Date(venceDate + 'T00:00:00-03:00'),
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
                        // numeroContrato: contratoLevantado[0].idContrato,
                        // numeroRecibo: reciboLevantado[0].numeroRecibo,
                        // nombreServicio: serviciosExistentes[service].nombreServicio,
                        mesAlquiler: new Date(venceDate + 'T00:00:00-03:00'),
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

function buscarServiciosDeudaConId() {
    //debugger
    var idContrato = contratoLevantado.length > 0
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
    buscarServiciosDeudaConId();
});

async function buscarDeudaServicios (idContrato)  {
    let data = [];
    data = await getContratoServices(idContrato);
    let hayDeuda = data.some( service => service.pagado === false );
    //debugger
    if (!data || !Array.isArray(data) || data.length === 0) {
        console.log('No hay servicios cargados para este contrato', idContrato);
        return;
    }
    if (llamadaBtnServiciosImpagos === true && !hayDeuda) {
        alert('No hay servicios impagos para este contrato');
        llamadaBtnServiciosImpagos = false;
        return;
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
    const btnRefresh = document.getElementById('refresh-modal');
    btnRefresh.style.display = 'block';
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
        data.mesAlquiler = serviciosConDeuda[servicio].mesAlquiler;
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

// function crearInputsServicioInModal(service, idContenedor) {
//     const contServTaxex = document.getElementById(idContenedor); // ID de tu contenedor

//     // 1. Crear el contenedor principal
//     const divItem = document.createElement('div');
//     divItem.className = 'service-tax-item';
//     divItem.dataset.numRecibo = service.numeroRecibo;

//     // 2. Crear la etiqueta (Label)
//     const opDate2 = {year:'numeric',month:'short'};
//     let sv =  new Date(service.mesAlquiler) //Date.parse(service.vencimiento)+86400000
//     let dateShortServ = new Date(sv).toLocaleDateString("sp-IN", opDate2)
//     const label = document.createElement('label');
//     label.htmlFor = `${service.nombreServicio}-${service.numeroRecibo}`;
//     label.textContent = `${service.nombreServicio}-${service.numeroRecibo} (${dateShortServ})`;

//     //Evento click en el label
//     label.addEventListener('click', function(e) {
//         e.preventDefault();
//         verRecivoSeleccionadoEnModal(service.numeroRecibo);
//     });


//     // 3. Crear el Input de Fecha (Vencimiento)
//     const inputDate = document.createElement('input');
//     inputDate.type = 'date';
//     inputDate.name = `vencimiento-${service.nombreServicio}-${service.numeroRecibo}`;
//     inputDate.id = `vto-${service.nombreServicio}-${service.numeroRecibo}`;
//     if (service.vencimiento) {
//         inputDate.value = (service.vencimiento).slice(0, 10);
//     }

//     // 4. VINCULAR el evento correctamente usando addEventListener
//     inputDate.addEventListener('change', marcarModificacionServicios(inputDate.id));

//     // 5. Crear el Input Checkbox (Pagado)
//     const inputCheckbox = document.createElement('input');
//     inputCheckbox.type = 'checkbox';
//     inputCheckbox.name = `pagado-${service.nombreServicio}-${service.numeroRecibo}`;
//     inputCheckbox.id = `pagado-${service.nombreServicio}-${service.numeroRecibo}`;

//     // 6. VINCULAR el evento correctamente
//     inputCheckbox.addEventListener('change', marcarModificacionServicios(inputCheckbox.id));

//     // 7. Ensamblar la estructura
//     divItem.appendChild(label);
//     divItem.appendChild(inputDate);
//     divItem.appendChild(inputCheckbox);

//     // 8. Añadir al contenedor padre
//     contServTaxex.appendChild(divItem);
// }

function crearInputsServicioInModal(service, idContenedor) {
    const contenedor = document.getElementById(idContenedor);

    const dateShortServ = new Date(service.mesAlquiler)
        .toLocaleDateString('es-AR', {
            year: 'numeric',
            month: 'short'
        });

    const idServicio = `${service.nombreServicio}-${service.numeroRecibo}`;

    const html = `
        <div class="service-tax-item" data-num-recibo="${service.numeroRecibo}">
            <label
                class="service-label"
                for="vto-${idServicio}"
                data-num-recibo="${service.numeroRecibo}">
                ${service.nombreServicio}-${service.numeroRecibo} (${dateShortServ})
            </label>

            <input
                type="date"
                name="vencimiento-${idServicio}"
                id="vto-${idServicio}"
                value="${service.vencimiento?.slice(0, 10) ?? ''}">

            <input
                type="checkbox"
                name="pagado-${idServicio}"
                id="pagado-${idServicio}">
        </div>
    `;

    contenedor.insertAdjacentHTML('beforeend', html);

    const item = contenedor.lastElementChild;

    item.querySelector('.service-label').addEventListener('click', e => {
        e.preventDefault();
        verRecivoSeleccionadoEnModal(service.numeroRecibo);
    });

    item.querySelector('input[type="date"]').addEventListener('change', e => {
        marcarModificacionServicios(e.target.id);
    });

    item.querySelector('input[type="checkbox"]').addEventListener('change', e => {
        marcarModificacionServicios(e.target.id);
    });
}


let servicioPagadoEnModalAIncorporarEnRecibo = [];

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
            console.log('servicio a actualizar modificad?', datosServiciosDeuda[servicio].modificado);
            if (datosServiciosDeuda[servicio].modificado) {
                let bodyEditServicio = {
                    numeroContrato: datosServiciosDeuda[servicio].numeroContrato,
                    numeroRecibo: datosServiciosDeuda[servicio].numeroRecibo,
                    nombreServicio: datosServiciosDeuda[servicio].nombreServicio,
                    vencimiento: document.getElementById(`vto-${datosServiciosDeuda[servicio].nombreServicio}-${datosServiciosDeuda[servicio].numeroRecibo}`).value,
                    pagado: document.getElementById(`pagado-${datosServiciosDeuda[servicio].nombreServicio}-${datosServiciosDeuda[servicio].numeroRecibo}`).checked
                };
                await editService({
                    numeroRecibo:datosServiciosDeuda[servicio].numeroRecibo,
                    nombreServicio:datosServiciosDeuda[servicio].nombreServicio
                },
                    bodyEditServicio
                );
                if (bodyEditServicio.pagado === true) {
                    servicioPagadoEnModalAIncorporarEnRecibo.push(bodyEditServicio);
                }
            }
        }
        cerrarModal();
        buscar(contratoLevantado[0].idContrato);
    }
}

document.getElementById('grid-services').addEventListener('click', buscarAllServicesByContrato);
document.getElementById('grid-services2').addEventListener('click', buscarAllServicesByContrato);



// buscar todos los servicios paa armar historial en tabla
async function buscarAllServicesByContrato () {

    let idContrato = contratoLevantado.length > 0 ?
        contratoLevantado[0].idContrato :
        prompt('ingrese un id de contrato');

    await buscar(idContrato);

    if (!idContrato || idContrato == null || idContrato === '') {
        console.log('No se pudo cargar los servicios historicos');
        return;
    }

    cerrarModal();
    cerrarModal2();
    //debugger
    let allServicios = await getAllServicesById(idContrato);

    if (!allServicios) {
        console.log('No se consiguieron los servicios', allServicios)
        return
    }
    console.log('allServicios', allServicios)
    sGlobal = allServicios;
    allServicios = allServicios.filter(servicio => servicio.mesAlquiler !== null)
    allServicios.forEach( servicio => {
        if(!servicio.mesAlquiler) {
            return
        } else {
            servicio.mesAlquiler = servicio.mesAlquiler.split('T')[0] ;
        }
    })

    allServicios.sort((a,b) => b.mesAlquiler.localeCompare(a.mesAlquiler));

    if (!allServicios || !Array.isArray(allServicios) || allServicios.length === 0) {
        console.log('No hay servicios cargados para este contrato', idContrato);
        return;
    }


    let nombresServicios = Object.keys(contratoLevantado[0]).filter( key =>  contratoLevantado[0][key]=== true);

    var tHead = '<th>Mes</th>';

    for (let nombre of nombresServicios) {
        tHead += `<th>${nombre}</th>`;
    }

    let html = `<table class="tabla-servicios"><thead>${tHead}</thead><tbody>`;
    let mesesSet = new Set (allServicios.map( servicio => servicio.mesAlquiler.split('T')[0] ));
    let meses = (Array.from(mesesSet)).sort((a,b) => b.localeCompare(a));
    //debugger
    for (let mes of meses) {
        html += `<tr><td>${mes.slice(0,7)}</td>`;
        for (let servicio of allServicios) {
            if (!servicio.vencimiento && servicio.mesAlquiler === mes) {
                html += `
                <td style="color:red"><b>&#10007</b></td>
                `;
            }
            if (servicio.vencimiento && servicio.mesAlquiler === mes) {
                html += `
                <td>${servicio.vencimiento.split('T')[0]}</td>
                `;
            }

        }

        html += '</tr>';

    }
    html += '</tbody></table>';
    // console.log(allServicios);
    // console.log(meses);
    // console.log(html);
    h = html;
    desplegarHistorialServicios(html);
}

function desplegarHistorialServicios(allServices) {
    const modalSection3 = document.getElementById('modal3-background');
    // const modal3 = document.getElementById('modal3');
    const btnClose = document.getElementById('cerrar-modal3')
    modalSection3.classList.add('is-visible');
    btnClose.focus();
    const btnRefresh = document.getElementById('refresh-modal3');
    btnRefresh.style.display = 'none';

    document.getElementById('title-modal-h3').innerHTML = '';
    document.getElementById('title-modal-h3').innerHTML = 'Datos de recibos';
    const addressTitle = document.getElementById('serv-impagos-direccion3');
    addressTitle.innerHTML = '';
    addressTitle.innerHTML = `${contratoLevantado[0].direccion}`
    document.getElementById('content-services3').innerHTML = '';

    document.getElementById('content-services3').innerHTML = allServices;

    ajustarTamanoCeldas();
}

function cerrarModal3 () {
    const modal3 = document.getElementById('modal3-background');
    const btnRefresh = document.getElementById('refresh-modal3');
    btnRefresh.style.display = 'block';
    modal3.classList.remove('is-visible');
};

function ajustarTamanoCeldas() {
  // 1. Contamos cuántas columnas (th) tiene la tabla en este momento
  const cantidadColumnas = document.querySelectorAll('.tabla-servicios thead th').length;

  // 2. Seleccionamos todas las celdas de datos
  const celdas = document.querySelectorAll('.tabla-servicios td');

  // 3. Definimos un tamaño base que se achique a medida que aumentan las columnas
  // Si hay 3 columnas -> 24px. Si hay 7 columnas -> 16px.
  let nuevoFontSize = 16;

  if (cantidadColumnas > 4) {
    // Restamos 2 píxeles por cada columna extra por encima de 3
    nuevoFontSize = nuevoFontSize - ((cantidadColumnas - 4) * 2);
  }

  // Aseguramos un límite mínimo para que nunca sea ilegible
  if (nuevoFontSize < 10) nuevoFontSize = 10;

  // 4. Aplicamos el tamaño calculado a cada celda
  celdas.forEach(celda => {
    celda.style.fontSize = nuevoFontSize + 'px';
  });
}


// Datos de clientes servicios
const btnsServicios = document.querySelectorAll('.serv-modal-btn');
btnsServicios.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        let nameService = e.currentTarget.dataset.name;
        openDataService(nameService);
    })
})

async function openDataService(nameService) {

    if (contratoLevantado.length === 0) {
        alert('No hay un contrato seleccionado,  busca uno');
        return
    }
    let serviciosActivos = Object.keys(contratoLevantado[0]).filter(key => contratoLevantado[0][key] === true);
    if (serviciosActivos.length === 0) {
        alert('No hay servicios activos en este contrato');
        return
    }
    if (!serviciosActivos.includes(nameService)) {
        alert('Este servicio no esta activo para este contrato');
        return
    }
    const modalSection4 = document.getElementById('modal4-background');
    const modal4 = document.getElementById('modal4');
    const btnClose = document.getElementById('cerrar-modal4')
    const goToPageService = document.getElementById('link-ir-pagina-servicio');
    modalSection4.classList.add('is-visible');
    btnClose.focus();

    desplegarServiceData(nameService);
}

async function desplegarServiceData(nameService) {
    if (document.getElementById('aceptar-data-modal4')) {
        document.getElementById('aceptar-data-modal4').remove();
    }
    const direccion = document.getElementById('serv-data-direccion');
    const containerData = document.getElementById('content-services4');
    const accessPage = document.getElementById('link-ir-pagina-servicio');
    document.getElementById('ir-pagina-servicio').style.display = 'block';
    document.getElementById('edit-servicedata').style.display = 'block';
    direccion.textContent = '';
    let idContrato = Number(contratoLevantado[0].idContrato);
    let nombreServicio = nameService;
    const dataServicio = await getServiceData(idContrato, nombreServicio);
    console.log(dataServicio);
    const vacio = !dataServicio ? true : false;
    console.log('esta vacio el data service?',vacio);



    direccion.textContent = contratoLevantado[0].direccion;
    accessPage.href = SERVICE_LINKS[nameService].url;
    accessPage.target = '_blank';
    accessPage.rel = 'noopener noreferrer';
    console.log('accessPage.href', accessPage.href);

    let html = '';
    //debugger
    if (vacio) {
        let nombreServicioText = nombreServicio[0].toUpperCase() + nombreServicio.slice(1);
        html += `
        <p>Aun no hay datos de ${nombreServicioText}</p>
        <div class="cont-data-serv">
            <p class="title-data">Titular: </p><input type="text" id="input-serv-titular" />
        </div>
        <div class="cont-data-serv">
            <p class="title-data">Numero de cliente: </p><input type="text" id="input-serv-num-cliente" />
        </div>
        <div class="cont-data-serv">
            <p class="title-data">Numero de medidor: </p><input type="text" id="input-serv-num-medidor" />
        </div>
        <div class="cont-data-serv">
            <p class="title-data">Numero de partida: </p><input type="text" id="input-serv-num-partida" />
        </div>
        `
        document.getElementById('link-ir-pagina-servicio').style.display = 'none';
        document.getElementById('edit-servicedata').style.display = 'none';
        let btnAceptar = document.createElement('button');
        btnAceptar.id = 'aceptar-data-modal4';
        btnAceptar.textContent = 'Aceptar';
        let btnCerrar = document.getElementById('cerrar-modal4');
        document.getElementById('cerrar-modal4').remove();

        document.getElementById('cont-btn-modal4').appendChild(btnAceptar);
        document.getElementById('cont-btn-modal4').appendChild(btnCerrar);
        btnAceptar.style.marginLeft = 0;
        btnCerrar.style.marginLeft = 0;



        btnAceptar.addEventListener('click', async () => {
            const nombreTitular = document.getElementById('input-serv-titular').value;
            const numeroCliente = document.getElementById('input-serv-num-cliente').value;
            const numeroMedidor = document.getElementById('input-serv-num-medidor').value;
            const numeroPartida = document.getElementById('input-serv-num-partida').value;
            const data = {idContrato, servicioName:nombreServicio, nombreTitular, numeroCliente, numeroMedidor, numeroPartida}
            await addServiceData(data);
            document.getElementById('aceptar-data-modal4').remove();
            desplegarServiceData(String(nombreServicio));
        })
    }

    if (!vacio && dataServicio.numeroCliente !== '') {
        html += `
        <p>${dataServicio.servicioName}</p>
        <div class="cont-data-serv">
            <p class="title-data">Titular: </p><p class="data-serv-titular" id="data-serv-titular">${dataServicio.nombreTitular}</p>
        </div>
        <div class="cont-data-serv">
            <p class="title-data">Número de cliente: </p><p id="num-cliente">${dataServicio.numeroCliente}</p>
            <svg class="btn-copy-data-serv" data-num=${dataServicio.numeroCliente} id="copy-num-cliente">
                <use href="#copy-data" />
            </svg>
        </div>
        `;
    }
    if (!vacio && dataServicio.numeroMedidor !== '') {
        html += `
        <div class="cont-data-serv">
            <p class="title-data">Número de medidior: </p><p id="num-medidor">${dataServicio.numeroMedidor}</p>
            <svg class="btn-copy-data-serv" data-num=${dataServicio.numeroMedidor} id="copy-num-medidor">
                <use href="#copy-data" />
            </svg>
        </div>
        `;
    }
    if (!vacio && dataServicio.numeroPartida !== '') {
        html += `
        <div class="cont-data-serv">
            <p class="title-data">Número de partida: </p><p id="partida">${dataServicio.numeroPartida}</p>
            <svg class="btn-copy-data-serv" data-num=${dataServicio.numeroPartida} id="copy-num-partida">
                <use href="#copy-data" />
            </svg>
        </div>
        `;
    }

    containerData.innerHTML = html;

    let btnsCopy = document.querySelectorAll('.btn-copy-data-serv');
    btnsCopy.forEach(btn => {
        btn.addEventListener('click', () => {
            navigator.clipboard.writeText(btn.dataset.num);
            console.log(btn.dataset.num);
        })
    })

    document.getElementById('edit-servicedata').addEventListener('click', (e) => {
        e.preventDefault();
        editarServiceData(dataServicio.servicioName);
    })
}

async function editarServiceData (nameService) {
    //debugger
    const nombreServicio = nameService;
    console.log('editando servicio', nameService.idContrato, nameService.servicioName);
    const idContrato = contratoLevantado[0].idContrato;
    console.log(`parametros de busqueda:  idContrato = ${idContrato}, nombreServicio = ${nombreServicio.servicioName}`);
    const dataServicio = await getServiceData(idContrato, servicioName = nombreServicio);
    console.log('dataServicio edit servicio', dataServicio);

    if (!dataServicio) {
        alert(`Error al querer editar datos de servicio ${nombreServicio}`);
        return;
    }

    const contDataServices = document.getElementById('content-services4');

    let html = `
    <p>Edicion de datos de servicio ${nombreServicio}</p>
    <div class="cont-data-serv">
    <p class="title-data">Titular: </p><input type="text" id="input-serv-titular" />
        </div>
        <div class="cont-data-serv">
        <p class="title-data">Numero de cliente: </p><input type="text" id="input-serv-num-cliente" />
        </div>
        <div class="cont-data-serv">
        <p class="title-data">Numero de medidor: </p><input type="text" id="input-serv-num-medidor" />
        </div>
        <div class="cont-data-serv">
        <p class="title-data">Numero de partida: </p><input type="text" id="input-serv-num-partida" />
        </div>
        `
    contDataServices.innerHTML = html;

    document.getElementById('input-serv-titular').value = dataServicio.nombreTitular;
    document.getElementById('input-serv-num-cliente').value = dataServicio.numeroCliente;
    document.getElementById('input-serv-num-medidor').value = dataServicio.numeroMedidor;
    document.getElementById('input-serv-num-partida').value = dataServicio.numeroPartida;

    if (document.getElementById('aceptar-data-modal4')) {
        document.getElementById('aceptar-data-modal4').remove();
    }

    document.getElementById('link-ir-pagina-servicio').style.display = 'none';
    document.getElementById('edit-servicedata').style.display = 'none';
    let btnAceptar = document.createElement('button');
    btnAceptar.id = 'aceptar-data-modal4';
    btnAceptar.textContent = 'Aceptar';
    let btnCerrar = document.getElementById('cerrar-modal4');
    document.getElementById('cerrar-modal4').remove();

    document.getElementById('cont-btn-modal4').appendChild(btnAceptar);
    document.getElementById('cont-btn-modal4').appendChild(btnCerrar);
    btnAceptar.style.marginLeft = 0;
    btnCerrar.style.marginLeft = 0;

    btnAceptar.addEventListener('click', async () => {
        const nombreTitular = document.getElementById('input-serv-titular').value;
        const numeroCliente = document.getElementById('input-serv-num-cliente').value;
        const numeroMedidor = document.getElementById('input-serv-num-medidor').value;
        const numeroPartida = document.getElementById('input-serv-num-partida').value;
        const data = {idContrato, servicioName:nombreServicio, nombreTitular, numeroCliente, numeroMedidor, numeroPartida}
        const searchParams = {idContrato, servicioName:nombreServicio};
        await editServiceData(searchParams, data);
        document.getElementById('aceptar-data-modal4').remove();
        desplegarServiceData(String(nombreServicio));
    })

}



function cerrarModal4 () {
    const modal4 = document.getElementById('modal4-background');
    //const goToPageService = document.getElementById('link-ir-pagina-servicio');
    modal4.classList.remove('is-visible');
    //goToPageService.classList.remove('is-visible');
}
