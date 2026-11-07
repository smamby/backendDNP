const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/:num', async (req, res) => {
    try {
        const recibo = await controller.getRecibo(req.params.num);
        console.log('[network] params', req.params.num)
        res.send(recibo);
    } catch (err) {
        res.status(400).send({ error: err , param: req.params.num});
    }
});

router.get('/contrato/:num', (req,res)=>{
    controller.getRecibosContrato(req.params.num)
        .then((recibosEncontrados)=>{
            console.log(recibosEncontrados)
           res.send(recibosEncontrados)
        })
        .catch(error => {
            res.send(error)
        })
})

router.get('/liquidaciones/:fechaVencimiento', (req, res) => {
    const fechaVencimiento = req.params.fechaVencimiento;

    controller.getRecibosForLiquidaciones(fechaVencimiento)
        .then((recibosReducidos)=>{
            console.log('[network] recibos reducidos: ', recibosReducidos)
           res.send(recibosReducidos)
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

// router.patch('/:num', (req,res)=>{
//     console.log('[network]',req.body);
//     controller.editRecibo(req.params.num, req.body)
//         .then((change)=>{
//             res.json(change)
//         })
//         .catch(error => {
//             res.send(error)
//         })
// })
router.patch('/:idContrato/:numeroRecibo', async (req, res) => {
  try {
    const idContrato = Number(req.params.idContrato);
    const numeroRecibo = Number(req.params.numeroRecibo);
    const data = req.body;

    // Pasamos un objeto con ambos criterios al controlador
    const searchParams = { idContrato, numeroRecibo };
    const recibo = await controller.editRecibo(searchParams, data);

    res.status(200).json(recibo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// router.delete('/:id', (res,req)=>{

// })

router.post('/printPDF', (req,res)=>{
    console.log(req.body)
    controller.imprimirPDF(req.body)
        // .then((change)=>{
        //     res.json(change)
        // })
        // .catch(error => {
        //     res.send(error)
        // })
})

module.exports = router;