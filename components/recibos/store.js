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

async function editRecibo(searchParam, change){
    let filter = {numeroRecibo:searchParam}
    
    const reciboActualizado = await Model.findOneAndUpdate(
        filter,
        { $set: change },
        { new: true }
    );

    if (!reciboActualizado) {
        throw new Error("No se encontró el recibo para actualizar");
    }

    console.log("Recibo actualizado con éxito:", reciboActualizado._id);
    return reciboActualizado;
}

module.exports = {
    add: addRecibo,
    get: getRecibo,
    getRecibosContrato: getRecibosContrato,
    update: editRecibo
}