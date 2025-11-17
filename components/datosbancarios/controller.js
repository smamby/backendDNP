const store = require('./store');

async function getAllDataBancaria () {
  try {
    const allData = await store.getAllDataBancaria();
    return allData;
  } catch (error) {
    throw new Error('[controller] Error al obtener los datos bancarios', error);
  }
}

async function getOneDataBancaria (idContrato) {
  if (!idContrato || isNaN(Number(idContrato)) || idContrato < 1 || idContrato === '') {
    const error = new Error('El ID de Contrato es inválido o falta.');
    error.statusCode = 400;
    throw error;
  }
  const dataBancaria = await store.getOneDataBancaria(idContrato);
  return dataBancaria;
}

async function addDataBancaria (dataBancaria) {
  if (!dataBancaria || Object.keys(dataBancaria).length === 0) {
    const error = new Error('No se proporcionaron datos bancarios.');
    error.statusCode = 400;
    throw error;
  }

  const newDataBancaria = await store.addDataBancaria(dataBancaria);
  return newDataBancaria;
}

async function editDataBancaria (idContrato, dataBancaria) {
  if (!idContrato || isNaN(Number(idContrato)) || idContrato < 1 || idContrato === '') {
    const error = new Error('El ID de Contrato es inválido o falta.');
    error.statusCode = 400;
    throw error;
  }
  if (!dataBancaria || Object.keys(dataBancaria).length === 0) {
    const error = new Error('No se proporcionaron datos bancarios.');
    error.statusCode = 400;
    throw error;
  }
  const editedDataBancaria = await store.editDataBancaria(idContrato, dataBancaria);
  return editedDataBancaria;
}

module.exports = {
  getAllDataBancaria,
  getOneDataBancaria,
  addDataBancaria,
  editDataBancaria
};