const Model = require('./model');

function getContrato(searchParam){
    return new Promise((resolve,reject)=>{
        let filter = {idContrato:searchParam};
        const contrato = Model.find(filter);
        resolve(contrato);
    })
}

function addContrato(nuevoContrato){
    const contrato = new Model(nuevoContrato);
    contrato.save();
    // return new Promise((resolve,reject)=>{
    //     const contrato = new Model(nuevoContrato);
    //     contrato.save();
    //     resolve(contrato);
    // })
}

async function editContrato(searchParam,change){
    console.log("change: ", change)
    let filter = {idContrato: searchParam};
    const contratoEncontrado = await Model.find(filter)
    var id = contratoEncontrado[0]._id
    const contrato = await Model.findOne({_id:id})
    //console.log('cont1',contrato)


    // for(var elem in change){
    //     if(contrato.hasOwnProperty(elem)){
    //         contrato[elem] = change[elem]
    //         console.log(`${elem}: ${contrato[elem]}`)
    //     }
    // }

    if(change.idContrato){
        contrato.idContrato = change.idContrato
    }
    if(change.nombrePropietario){
        contrato.nombrePropietario = change.nombrePropietario
    }
    if(change.apellidoPropietario){
        contrato.apellidoPropietario = change.apellidoPropietario
    }
    if(change.dniPropietario){
        contrato.dniPropietario = change.dniPropietario
    }
    if(change.cbuPropietario){
        contrato.cbuPropietario = change.cbuPropietario
    }
    if(change.celularPropietario){
        contrato.celularPropietario = change.celularPropietario
    }
    if(change.emailPropietario){
        contrato.emailPropietario = change.emailPropietario
    }
    if(change.direccionPropietario){
        contrato.direccionPropietario = change.direccionPropietario
    }
    if(change.nombreInquilino){
        contrato.nombreInquilino = change.nombreInquilino
    }
    if(change.apellidoInquilino){
        contrato.apellidoInquilino = change.apellidoInquilino
    }
    if(change.dniInquilino){
        contrato.dniInquilino = change.dniInquilino
    }
    if(change.cbuInquilino){
        contrato.cbuInquilino = change.cbuInquilino
    }
    if(change.celularInquilino){
        contrato.celularInquilino = change.celularInquilino
    }
    if(change.emailInquilino){
        contrato.emailInquilino = change.emailInquilino
    }
    if(change.garantiaInquilino){
        contrato.garantiaInquilino = change.garantiaInquilino
    }
    if(change.direccion){
        contrato.direccion = change.direccion
    }
    if(change.propietario){
        contrato.propietario = change.propietario
    }
    if(change.inquilino){
        contrato.inquilino = change.inquilino
    }
    if(change.inicioContrato){
        contrato.inicioContrato = change.inicioContrato
    }
    if(change.inicioContratoHISP){
        contrato.inicioContratoHISP = change.inicioContratoHISP
    }
    if(change.valor1){
        contrato.valor1 = change.valor1
    }
    if(change.valor2){
        contrato.valor2 = change.valor2
    }
    if(change.valor3){
        contrato.valor3 = change.valor3
    }
    if(change.inicioP2){
        contrato.inicioP2 = change.inicioP2
    }
    if(change.inicioP3){
        contrato.inicioP3 = change.inicioP3
    }
    if(change.renovacion){
        contrato.renovacion = change.renovacion
    }
    if(change.descripcion){
        contrato.descripcion = change.descripcion
    }
    if(change.imagenes){
        contrato.imagenes = change.imagenes
    }
    if(change.observaciones){
        contrato.observaciones = change.observaciones
    }
    if(change.hasOwnProperty('edesur')){
        contrato.edesur = change.edesur;
    }
    if(change.hasOwnProperty('aysa')){
        contrato.aysa = change.aysa;
    }
    if(change.hasOwnProperty('metrogas')){
        contrato.metrogas = change.metrogas;
    }
    if(change.hasOwnProperty('abl')){
        contrato.abl = change.abl;
    }
    if(change.hasOwnProperty('expensas')){
        contrato.expensas = change.expensas;
    }
    if(change.hasOwnProperty('seguro')){
        contrato.seguro = change.seguro;
    }
    if(change.hasOwnProperty('aux1')){
        contrato.aux1 = change.aux1;
    }
    if(change.hasOwnProperty('aux2')){
        contrato.aux2 = change.aux2
    }

    console.log('cont2',contrato);
    const savedContrato = await contrato.save()
    return savedContrato;
}

async function deleteContrato(searchParam){
    var contratoEncontrado = await getContrato(searchParam);
    var id = contratoEncontrado[0]._id;
    console.log(id)
    var contrato = await Model.findOneAndDelete({_id:id})
    return 'contrato con id '+contrato.idContrato+' Eliminado';
}

module.exports = {
    get: getContrato,
    add: addContrato,
    edit: editContrato,
    delete: deleteContrato,
}