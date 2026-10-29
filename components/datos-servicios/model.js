const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataServiceSchema = new Schema({
  idContrato: Number,
  nombreTitular: String,
  servicioName: String,
  numeroCliente: String,
  numeroMedidor: String,
  numeroPartida: String
})

dataServiceSchema.index({idContrato: 1, servicioName: 1}, {unique: true});

const Model = mongoose.model('DataService', dataServiceSchema);

module.exports = Model;