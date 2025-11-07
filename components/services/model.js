const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    nombreServicio: String,
    numeroRecibo: Number,
    numeroContrato: Number,
    vencimiento: Date,
    pagado: Boolean
})

serviceSchema.index({ numeroRecibo: 1, nombreServicio: 1 }, { unique: true });

const Model = mongoose.model('Service', serviceSchema);

module.exports = Model;