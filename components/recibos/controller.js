const store = require('./store');

function getRecibo(searchParam){
    return new Promise((resolve,reject)=>{
        if(!searchParam){
            reject('invalid search Parameter');
            return false
        }
        resolve(store.get(searchParam));
    })
}

function addRecibo(dataRecibo){
    return new Promise((resolve,reject)=>{
        if(!dataRecibo){
            console.error('[controller] faltan datos de recibo');
            reject('Faltan datos para confeccionar el recibo');
            return false;
        };
        const datosDeRecibo = dataRecibo;
        console.log(datosDeRecibo)
        store.add(datosDeRecibo);
        resolve(datosDeRecibo);
    })
}

function editRecibo(searchParam,change){
    return new Promise(async(resolve,reject)=>{
        if(!searchParam){
            reject('invalid search Parameter');
            return false
        }
        const reciboCambiado = await store.update(searchParam,change);
        console.log('[controller] change: ', reciboCambiado);
        resolve(reciboCambiado);
    })
}

module.exports = {
    getRecibo,
    addRecibo,
    editRecibo,
}