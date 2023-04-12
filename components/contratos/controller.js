const store = require('./store');

function getContrato(searchParam){
    return new Promise((resolve,reject)=>{
        if(!searchParam){
            reject('invalid search Parameter');
            return false
        }
        resolve(store.get(searchParam));
    })
}

function addContrato(nuevoContrato){
    return new Promise((resolve,reject)=>{
        if(!nuevoContrato){
            reject('Faltan los datos del contrato')
            return false
        }
        resolve(store.add(nuevoContrato))
    })
}

function editContrato(searchParam,change){
    return new Promise((resolve,reject)=>{
        if(!searchParam){
            reject('El contrato no existe')
            return false
        }
        if(!change){
            reject('Error en los datos a ingresados')
            return false
        }
        resolve(store.edit(searchParam,change))
    })
    .then((savedContrato)=>{
        return savedContrato
    })
}

function deleteContrato(searchParam){
    return new Promise((resolve,reject)=>{
        if(!searchParam){
            reject('El contrato no existe')
            return false
        }
        resolve(store.delete(searchParam))
    })
}

module.exports = {
    get: getContrato,
    add: addContrato,
    edit: editContrato,
    delete: deleteContrato,
}