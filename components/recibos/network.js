const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/:num', (req,res)=>{
    controller.getRecibo(req.params.num)
        .then((reciboEncontrado)=>{
           res.send(reciboEncontrado) 
        })
        .catch(error => {
            res.send(error)
        })
})

// const body = {
//     "numeroRecibo": 14,
//     "fechaRecibo": "2023/10/04",
//     "propietario": "Alejandra Gonzalez",
//     "inquilino": "Nicanor Federico",
//     "montoAlquiler": 51500,
//     "fechaVencimiento": "2023/10/30",
//     "textoTotal": "Cuarenta y cinco mil",
//     "detalles": [["luz",-3000]],
//     "observaciones": "Adjunto recibo expensas mar 2023, luz mar 2023",
//     "tipoHonorarios": "administracion",
//     "idContrato":444
// }

router.post('/', (req,res)=>{
    var b = req.body
    console.log(b)
    controller.addRecibo(b)
    //console.log('req.body',req.body,req.method,req.url)
        .then((dataRecibo)=>{
            res.json()
        })
        .then(()=>{
            console.log('req.body',req.body,req.method,req.url)
        })
        .catch((error) => {
            res.send(error)
        })
})
// const patchRecibo = {
//     "propietario": "Maria Scurra",
//     "inquilino": "Martina Rodriguez",
//     "montoAlquiler": 46500
// }

router.patch('/:num', (req,res)=>{
    console.log('[network]',req.body);
    controller.editRecibo(req.params.num, req.body)
        .then((change)=>{
            res.json(change) 
        })
        .catch(error => {
            res.send(error)
        })
})


// router.delete('/:id', (res,req)=>{

// })

module.exports = router;