const store = require('./store');

async function getServices(searchParam) {
  if (!searchParam) {
    console.error('[controller] invalid search Parameter');
    return false;
  }
  const servicios = await store.getServices(searchParam);
  return servicios;
}
async function getContratoServices(searchParam) {
  if (!searchParam) {
    console.error('[controller] invalid search Parameter');
    return false;
  }
  console.log('[controller] nmumeroContrato', searchParam);
  const servicios = await store.getContratoServices(searchParam);
  return servicios;
}

async function addService(dataService) {
  console.log('[controller] dataService', dataService);
  if (!dataService) {
    console.error('[controller] faltan datos de servicio');
    return false;
  }
  try {
    const res = await store.addService(dataService);
    console.log('[controller] store.addService returned:', res);
    return res; // devolver lo que retorne el store
  } catch (err) {
    console.error('[controller] error saving service:', err);
    throw err; // propaga para que network.js devuelva 500 y lo veas
  }
}

async function editService(searchParam, changes) {
  if (!searchParam.numeroRecibo || !searchParam.nombreServicio) {
    throw new Error('Missing required search parameters');
  }
  if (!changes || Object.keys(changes).length === 0) {
    throw new Error('No changes provided');
  }
  console.log('[controller] Updating service:', { searchParam, changes });
  const result = await store.editService(searchParam, changes);
  return result;
}

module.exports = {
  getServices,
  getContratoServices,
  addService,
  editService
}