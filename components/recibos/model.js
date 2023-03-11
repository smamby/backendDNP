const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reciboSchema = new Schema({
    numeroRecibo: Number,
    fechaRecibo: Date,
    propietario: String,
    inquilino: String,
    montoAlquiler: Number,
    fechaVencimiento: Date,
    textoTotal: String,
    detalles: Array,
    observaciones: String,
    tipoHonorarios: String,
    idContrato:String
})

const Model = mongoose.model('Recibo', reciboSchema);

module.exports = Model;