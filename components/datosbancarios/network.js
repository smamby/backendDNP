const router = require('express').Router();
const controller = require('./controller');

router.get('/', (req,res) => {
  controller.getAllDataBancaria()
    .then(data => {
      return res.status(200).json(data)
    })
    .catch(error => {
      console.error('[network] Error en GET /:', error.message);
      const statusCode = error.statusCode || 500;
      return res.status(statusCode).json({ error: error.message });
    })
})

router.get('/:idContrato', (req, res) => {
  const idContrato = req.params.idContrato;
  controller.getOneDataBancaria(idContrato)
    .then(data => {
      return res.status(200).json(data)
    })
    .catch(error => {
      console.error('[network] Error en GET /:idContrato:', error.message);
      const statusCode = error.statusCode || 500;
            return res.status(statusCode).json({ error: error.message });
    })
})

router.post('/', (req, res) => {
  const data = req.body;
  controller.addDataBancaria(data)
    .then(data => {
      return res.status(200).json(data)
    })
    .catch(error => {
      console.error('[network] Error en POST /:', error.message);
      const statusCode = error.statusCode || 500;
      return res.status(statusCode).json({ error: error.message });
    })
})

router.patch('/:idContrato', (req, res) =>{
  const idcontrato = req.params.idContrato;
  const data = req.body;
  controller.editDataBancaria(idcontrato, data)
    .then(data => {
      return res.status(200).json(data)
    })
    .catch(error => {
      console.error('[network] Error en PATCH /:idContrato:', error.message);
      const statusCode = error.statusCode || 500;
      return res.status(statusCode).json({ error: error.message });
    })
})

module.exports = router;