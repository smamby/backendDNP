const Model = require('./model');

async function getServiceData (idContrato, servicioName) {
  const filter = {idContrato: idContrato, servicioName: servicioName}
  const data = await Model.findOne(filter);
  return data;
}
async function getAllServicesDataById (idContrato) {
  const filter = {idContrato: idContrato};
  const data = await Model.find(filter);
  return data;
}
async function getAllServicesData () {
  const data = await Model.find({});
  return data;
}

async function addServiceData (dataToAdd) {
   const serviceDataModel = new Model (dataToAdd);
   const data = await serviceDataModel.save();
   return data;
}

async function editServiceData (idContrato, servicioName, data) {
  const filter = {idContrato: idContrato, servicioName: servicioName}
  const edited = await Model.findOneAndUpdate(filter, { $set: data }, { new: true });
  return edited;
}

async function deleteServiceData (idContrato, servicioName) {
  const filter = {idContrato: idContrato, servicioName: servicioName}
  const deleted = await Model.deleteOne(filter);
  return deleted;
}

module.exports = {
  getServiceData,
  getAllServicesDataById,
  getAllServicesData,
  addServiceData,
  editServiceData,
  deleteServiceData
}