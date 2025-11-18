const Model = require('./model');

async function getRecibo(searchParam) {
    if (!searchParam) throw "Invalid search parameter";

    console.log("[store] searchParam:", searchParam);
    const filter = { numeroRecibo: Number(searchParam) };

    const recibo = await Model.find(filter);
    console.log("[store] result:", recibo);

    return recibo;
}

function getRecibosContrato(searchParam) {
    return new Promise((resolve,reject)=>{
        let filter = {idContrato: searchParam};
        const recibos = Model.find(filter);
        resolve(recibos);
    })
}

function addRecibo(nuevoRecibo){
    const recibo = new Model(nuevoRecibo);
    recibo.save();
}

async function editRecibo(searchParam,change){
    let filter = {numeroRecibo:searchParam}
    var reciboEncontrado = await Model.find(filter)
    var id = reciboEncontrado[0]._id
    console.log(id)
    var recibo = await Model.findOne({_id:id})
    console.log(recibo)

    if(change.fechaRecibo){
        recibo.fechaRecibo = change.fechaRecibo;
    }
    if(change.propietario){
        recibo.propietario = change.propietario;
    }
    if(change.inquilino){
        recibo.inquilino = change.inquilino;
    }
    if(change.montoAlquiler){
        recibo.montoAlquiler = change.montoAlquiler;
    }
    if(change.fechaVencimiento){
        recibo.fechaVencimiento = change.fechaVencimiento;
    }
    if(change.textoTotal){
        recibo.textoTotal = change.textoTotal;
    }
    if(change.detalles){
        recibo.detalles = change.detalles;
    }
    if(change.detallesOnlyProp){
        recibo.detallesOnlyProp = change.detallesOnlyProp;
    }
    if(change.observaciones){
        recibo.observaciones = change.observaciones;
    }
    if(change.tipoHonorarios){
        recibo.tipoHonorarios = change.tipoHonorarios;
    }
    if(change.idContrato){
        recibo.idContrato = change.idContrato;
    }
    await recibo.save()
    //await reciboEncontrado.save()
    return recibo;
    // reciboEncontrado.save()
    // return reciboEncontrado
}

module.exports = {
    add: addRecibo,
    get: getRecibo,
    getRecibosContrato: getRecibosContrato,
    update: editRecibo
}