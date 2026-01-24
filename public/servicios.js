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
    impInq();
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

function crearInputsServicioInModal(service, idContenedor) {
    const contServTaxex = document.getElementById(idContenedor); // ID de tu contenedor

    // 1. Crear el contenedor principal
    const divItem = document.createElement('div');
    divItem.className = 'service-tax-item';

    // 2. Crear la etiqueta (Label)
    const opDate2 = {year:'numeric',month:'short'};
    let sv =  new Date(service.mesAlquiler) //Date.parse(service.vencimiento)+86400000
    let dateShortServ = new Date(sv).toLocaleDateString("sp-IN", opDate2)
    const label = document.createElement('label');
    label.htmlFor = `${service.nombreServicio}-${service.numeroRecibo}`;
    label.textContent = `${service.nombreServicio}-${service.numeroRecibo} (${dateShortServ})`;

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