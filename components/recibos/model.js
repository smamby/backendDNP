const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reciboSchema = new Schema({
    numeroRecibo: Number,
    fechaRecibo: String,
    propietario: String,
    inquilino: String,
    montoAlquiler: Number,
    fechaVencimiento: String,
    textoTotal: String,
    detalles: Array,
    detallesOnlyProp: Array,
    observaciones: String,
    tipoHonorarios: String,
    idContrato: Number
})

reciboSchema.index({ numeroRecibo: 1, idContrato: 1 }, { unique: true });

const Model = mongoose.model('Recibo', reciboSchema);

module.exports = Model;