const Model = require('./model');

async function getServices(searchParam) {
  const filter = { numeroRecibo: searchParam };
  const servicios = await Model.find(filter);
  return servicios;
}
async function getContratoServices(searchParam) {
  const filter = { numeroContrato: searchParam };
  const servicios = await Model.find(filter);
  return servicios;
}

async function addService(service) {
  try {
    const serviceModel = new Model(service);
    const saved = await serviceModel.save();
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

    const update = {};
    for (const key in changes){
      let val = changes[key];
      if (val === '') {
        val = null;
      }
      if (key === 'numeroRecibo' || key === 'numeroContrato') {
        val = val != null ? Number(val) : val;
      }
      if (key === 'vencimiento' && val) {
        const d = new Date(val);
        val = isNaN(d.getTime()) ? null : d;
      }
      update[key] = val;
    }


    const result = await Model.findOneAndUpdate(filter, { $set: update }, { new: true });
    console.log('[store] Update doc:', result);

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
  getContratoServices,
  addService,
  editService
}