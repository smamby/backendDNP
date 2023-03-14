const { Router } = require('express');
const router = Router();
const controller = require('./controller');

router.get('/:num', (req,res)=>{
    controller.get(req.params.num)
    .then((contratoEncontrado)=>{
      if(contratoEncontrado.length===0){
        res.send('El contrato no existe')
      } else {
        res.send(contratoEncontrado).status(200)
      }
    })
})

router.post('/', (req,res)=>{
  controller.add(body)
    .then((dataContrato)=>{
      res.json(body)
    })
    .catch((error)=>{
      res.send(error)
    })
})

router.patch('/:num', (req,res)=>{
  controller.edit(req.params.num,patchBody)
    .then((contrato)=>{
      res.json(contrato)
    })
    .catch((error)=>{
      res.send(error)
    })
})

router.delete('/:num', (req,res)=>{
  controller.delete(req.params.num)
  .then(()=>{
    res.send(`Se elimino el contrato con id ${req.params.num}`)
  })
  .then((error=>{
    res.send(error)
  }))
})

module.exports = router;

// const ContratoFrontend =
//     {
//       "idContrato": 435,
//       "propietario": {
//         "nombre": "Fernanda",
//         "apellido": "Perez",
//         "dni": "37123654",
//         "cbu": "155-2037123000006544",
//         "celular": "1122223333",
//         "email": "ferperez@gmail.com",
//         "direccionP": "juncal 322 5° B"
//       },
//       "inquilino": {
//         "nombre": "Alicia",
//         "apellido": "Gonzalez",
//         "dni": "24556676",
//         "cbu": "271-112232487000022625",
//         "celular": "1155554444",
//         "email": "Aliciagon@gmail.com",
//         "garantia": "caucion P345f6"
//       },
//       "departamento": {
//         "direccion": "Junin 435",
//         "propietario": "Fernanda Perez",
//         "inquilino": "Alicia Gonzalez",
//         "inicioContrato": "2023-03-01",
//         "inicioContratoHISP": "28/2/2023",
//         "valor1": 44000,
//         "inicioP2": "28/2/2024",
//         "valor2": 49000,
//         "inicioP3": "28/2/2025",
//         "valor3": 56000,
//         "renovacion": "28/2/2026",
//         "obligacionesInq": "",
//         "descripcion": "",
//         "imagenes": [],
//         "observaciones": ""
//       }
//     }

  //   const body = {
  //     idContrato:ContratoFrontend.idContrato,
  //     nombrePropietario:ContratoFrontend.propietario.nombre,
  //     apellidoPropietario:ContratoFrontend.propietario.apellido,
  //     dniPropietario:ContratoFrontend.propietario.dni,
  //     cbuPropietario:ContratoFrontend.propietario.cbu,
  //     celularPropietario:ContratoFrontend.propietario.celular,
  //     emailPropietario:ContratoFrontend.propietario.email,
  //     direccionPropietario:ContratoFrontend.propietario.direccionP,
  //     nombreInquilino:ContratoFrontend.inquilino.nombre,
  //     apellidoInquilino:ContratoFrontend.inquilino.apellido,
  //     dniInquilino:ContratoFrontend.inquilino.dni,
  //     cbuInquilino:ContratoFrontend.inquilino.cbu,
  //     celularInquilino:ContratoFrontend.inquilino.celular,
  //     emailInquilino:ContratoFrontend.inquilino.email,
  //     garantiaInquilino:ContratoFrontend.inquilino.garantia,
  //     direccion:ContratoFrontend.departamento.direccion,
  //     propietario:ContratoFrontend.departamento.propietario,
  //     inquilino:ContratoFrontend.departamento.inquilino,
  //     inicioContrato:ContratoFrontend.departamento.inicioContrato,
  //     inicioContratoHISP: ContratoFrontend.departamento.inicioContratoHISP,
  //     valor1:ContratoFrontend.departamento.valor1,
  //     valor2:ContratoFrontend.departamento.valor2,
  //     valor3:ContratoFrontend.departamento.valor3,
  //     inicioP2: ContratoFrontend.departamento.inicioP2,
  //     inicioP3: ContratoFrontend.departamento.inicioP3,
  //     renovacion: ContratoFrontend.departamento.renovacion,
  //     descripcion:ContratoFrontend.departamento.descripcion,
  //     imagenes: ContratoFrontend.departamento.imagenes,
  //     observaciones:ContratoFrontend.departamento.observaciones
  // }
  const patchBody = {
    nombrePropietario:"Marcela",
    apellidoPropietario: "Puig"
  }