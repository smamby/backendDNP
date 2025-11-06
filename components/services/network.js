const router = require('express').Router();
const controller =  require('./controller');


router.get('/', (req, res) => {
  const numeroRecibo = req.query.numeroRecibo;
  console.log('query.numeroRecibo', numeroRecibo);

  controller.getServices(numeroRecibo)
    .then(servicios => {
      if (!servicios) return res.json([]);
      return res.json(servicios)
    })
    .catch(err => res.status(500).send(err))
})

router.post('/', (req,res) => {
  console.log('[network] req.body', req.body);
  controller.addService(req.body)
    .then(() => { return res.status(201).json('Servicio agregado') })
    .catch(err => { return res.status(500).json(err) })
})

router.patch('/', (req, res) => {
  const numeroRecibo = req.query.numeroRecibo;
  const nombreServicio = req.query.nombreServicio;
  const changes = req.body;

  console.log('[network] editService req.query', req.query);
  console.log('[network] editService req.body', req.body);

  controller.editService({ numeroRecibo, nombreServicio }, changes)
    .then(result => {
      res.json({
        message: 'Servicio editado',
        service: { numeroRecibo, nombreServicio },
        result
      });
    })
    .catch(err => {
      console.error('[network] Update error:', err);
      res.status(500).json({
        error: err.message || 'Error updating service',
        details: err
      });
    });
})

module.exports = router;