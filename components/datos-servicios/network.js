const router = require('express').Router();
const controller = require('./controller');


router.get('/:idContrato/:servicioName', async (req, res) => {
  try {
    const { idContrato, servicioName } = req.params;
    const servicio = await controller.getServiceData(idContrato, servicioName);
    res.status(200).json(servicio);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})

router.get('/:idContrato', async (req, res) => {
  try {
    const servicios = await controller.getAllServicesDataById(req.params.idContrato);
    res.status(200).json(servicios);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})

router.get('/', async (req, res) => {
  try {
    const servicios = await controller.getAllServicesData();
    res.status(200).json(servicios);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})

router.post('/', async (req, res) => {
  try {
    const servicio = await controller.addServiceData(req.body);
    res.status(200).json(servicio);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})

router.patch('/:idContrato/:servicioName', async (req, res) => {
  try {
    const idContrato = Number(req.params.idContrato);
    const { servicioName } = req.params;
    const data = req.body;
    const servicio = await controller.editServiceData(idContrato, servicioName , data);
    res.status(200).json(servicio);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})

router.delete('/:idContrato/:servicioName', async (req, res) => {
  try {
    const idContrato = Number(req.params.idContrato);
    const { servicioName } = req.params;
    const servicio = await controller.deleteServiceData( idContrato, servicioName );
    res.status(200).json(servicio);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})

module.exports = router;