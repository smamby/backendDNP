const store = require('./store');

async function getServiceData (idContrato, servicioName) {
  if (!idContrato || !servicioName) {
    console.error('[controller] invalid search parameter');
    return false;
  }
  const data = await store.getServiceData(idContrato, servicioName);
  return data;
}

async function getAllServicesDataById (idContrato) {
  if (!idContrato) {
    console.error('[controller] invalid search parameter');
    return false;
  }
  const data = await store.getAllServicesDataById(idContrato);
  return data;
}

async function getAllServicesData () {
  const data = await store.getAllServicesData();
  return data;
}

async function addServiceData (data) {
  if (!data || !(data.idContrato && data.servicioName) || (!data.numeroCliente && !data.numeroMedidor && !data.numeroPartida)) {
    console.error('[controller] invalid data to add');
    return false;
  }
  const dataAdded = await store.addServiceData(data);
  return dataAdded;
}

async function editServiceData (idContrato, servicioName, data) {
   if (!idContrato || !servicioName) {
    console.error('[controller] invalid edit parameter');
    return false;
  }
  if (!data || Object.keys(data).length === 0) {
    console.error('[controller] no data provided to update');
    return false;
  }
  const dataEdited = await store.editServiceData(idContrato, servicioName, data);
  return dataEdited;
}

async function deleteServiceData (idContrato, servicioName) {
  if (!idContrato || !servicioName) {
    console.error('[controller] invalid delete parameter');
    return false;
  }
  const dataDeleted = await store.deleteServiceData(idContrato, servicioName);
  return dataDeleted;
}

module.exports = {
  getServiceData,
  getAllServicesDataById,
  getAllServicesData,
  addServiceData,
  editServiceData,
  deleteServiceData
};