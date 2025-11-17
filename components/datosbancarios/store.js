const Model = require('./model');

async function getAllDataBancaria () {
  const allData = await Model.find();
  return allData;
}

async function getOneDataBancaria (idContrato) {
  const filter = {idContrato: idContrato};
  const dataBancaria = Model.findOne(filter);
  return dataBancaria
}

async function addDataBancaria (dataBancaria) {
  const dataBancariaModel = new Model(dataBancaria);
  try {
    const saved = await dataBancariaModel.save();
    console.log('[store] saved data bancaria:', saved);
    return saved;
  } catch (err) {
    console.error('[store] Error al agregar data bancaria:', err);
    throw err;
  }
}

async function editDataBancaria (idContrato, dataBancaria) {
  const filter = {idContrato: idContrato};
  try {
    const edited = await Model.findOneAndUpdate(filter, { $set: dataBancaria }, { new: true });
    console.log('[store] Edited data bancaria:', edited);
    return edited;
  } catch (err) {
    console.error('[store] Error al editar data bancaria:', err);
    throw err;
  }
}

module.exports = {
  getAllDataBancaria,
  getOneDataBancaria,
  addDataBancaria,
  editDataBancaria
}