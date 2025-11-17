const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bancoSchema = new Schema({
  idContrato: Number,
  banco: String,
  cbu: String,
  alias: String,
  tipoCta: {
    type: String,
    enu: ['Caja_Ahorro', 'Cta_Corriente'],
    default: 'Caja_Ahorro',
    required: true
  },
  numeroCta: String,
  titular: String,
  dni: String
})

bancoSchema.index({idContrato: 1}, {unique: true});

const Model = mongoose.model('DataBancaria', bancoSchema);

module.exports = Model;