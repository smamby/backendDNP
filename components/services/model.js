const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    nombreServicio: String,
    numeroRecibo: Number,
    numeroContrato: Number,
    vencimiento: Date,
    pagado: Boolean
})

const Model = mongoose.model('Service', serviceSchema);

module.exports = Model;