const store = require('./store');
//const toPDF = require('pdfmake');
//const { jsPDF } = require('jspdf');
const fs = require('fs');

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

// async function imprimirPDF(fichaImpI){
//     var ficha = fichaImpI
//     console.log(ficha)
//     //console.log(JSON.stringify(fichaImpI))
//     //var fichaImpI = localStorage.getItem('fichaI');
//     //var fichaImpP = localStorage.getItem('fichaP');
//     //var re = JSON.parse(localStorage.getItem('recibo'));
//     //var co = JSON.parse(localStorage.getItem('contrato'));
//     //var fileNameInq =  `${re.numeroRecibo} ${co.direccion} inq.pdf`;
//     //toPDF.create(ficha).toFile('./fileNameInq.pdf', function (err, res){
//         // if(err){
//         //     console.log(err)
//         // } else {
//         //     console.log('file created', res)
//         // }
//                     // const pdf = new toPDF();
//                     // const docDef = {
//                     //     content: ficha,
//                     // }
//                     // let doc = pdf.createPdfKitDocument(docDef);
//                     // doc.pipe(fs.createWriteStream('./boleta.pdf'));
//                     // doc.end();
//     const doc = new jsPDF();
//     //var divHTML = document.getElementById('divHTML')
//     await doc.html(ficha,{
//         callback: async function(doc) {
//             doc.save('fileNameInq.pdf');
//         },
//         margin: [10, 10, 10, 10],
//         autoPaging: 'html',
//         addFont: 'Roboto',
//         setFont: 'Roboto',
//         x: 0,
//         y: 0,
//         width: 190,
//         windowWidth: 620,
//         output: 'C:/users/seba/documents/prueba/'
//     });
// }

//imprimirPDF();

module.exports = {
    getRecibo,
    addRecibo,
    editRecibo,
    //imprimirPDF,
}