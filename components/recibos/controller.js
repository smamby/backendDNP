const store = require('./store');
//const toPDF = require('pdfmake');
//const { jsPDF } = require('jspdf');
const fs = require('fs');

// function getRecibo(searchParam){
//     return new Promise((resolve,reject)=>{
//         if(!searchParam){
//             reject('invalid search Parameter');
//             console.log('invalid search Parameter', searchParam);
//             return false
//         }
//         resolve(store.get(searchParam));
//     })
// }
async function getRecibo(searchParam){
    if(!searchParam){
        throw new Error('invalid search Parameter'); // Lanza un error estándar si falta el parámetro
    }
    return await store.get(searchParam);
}

function getRecibosContrato (searchParam) {
    return new Promise((resolve,reject)=>{
        if(!searchParam){
            reject('invalid search Parameter');
            return false
        }
        resolve(store.getRecibosContrato(searchParam));
    })
}
async function getRecibosForLiquidaciones(fechaVencimiento) {
    try {
        const recibosReducidos = await store.getRecibosForLiquidaciones(fechaVencimiento);
        return recibosReducidos;
    } catch (error) {
        throw new Error('Error al obtener los recibos para liquidaciones: ' + error.message);
    }
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

// function editRecibo(searchParam,change){
//     return new Promise(async(resolve,reject)=>{
//         if(!searchParam){
//             reject('invalid search Parameter');
//             return false
//         }
//         const reciboCambiado = await store.update(searchParam,change);
//         console.log('[controller] change: ', reciboCambiado);
//         resolve(reciboCambiado);
//     })
// }
async function editRecibo(searchParams, change) {
    let filter = {
        idContrato: searchParams.idContrato,
        numeroRecibo: searchParams.numeroRecibo
    };

    const reciboActualizado = await store.update( filter, change );

    if (!reciboActualizado) {
        throw new Error("No se encontró el recibo para actualizar con esos parámetros");
    }

    console.log("Recibo actualizado con éxito en BD:", reciboActualizado._id);
    return reciboActualizado;
}



module.exports = {
    getRecibo,
    getRecibosContrato,
    getRecibosForLiquidaciones,
    addRecibo,
    editRecibo
    //imprimirPDF,
}