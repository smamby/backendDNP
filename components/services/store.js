const Model = require('./model');

async function getServices(searchParam) {
  const filter = { numeroRecibo: searchParam };
  const servicios = await Model.find(filter);
  return servicios;
}

async function addService(service) {
  try {
    const model = new Model(service);
    const saved = await model.save();
    console.log('[store] saved service:', saved);
    return saved;
  } catch (err) {
    console.error('[store] addService error:', err);
    throw err;
  }
}

async function editService(searchParam, changes) {
  try {
    const filter = {
      numeroRecibo: Number(searchParam.numeroRecibo),
      nombreServicio: searchParam.nombreServicio
    };
    console.log('[store] Updating with filter:', filter, 'changes:', changes);

    const result = await Model.updateOne(filter, { $set: changes });
    console.log('[store] Update result:', result);

    if (result.matchedCount === 0) {
      throw new Error('Service not found');
    }

    return result;
  } catch (err) {
    console.error('[store] Update error:', err);
    throw err;
  }
}



module.exports = {
  getServices,
  addService,
  editService
}