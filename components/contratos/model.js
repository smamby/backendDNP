const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contratoSchema = new Schema({
    idContrato:Number,
    nombrePropietario:String,
    apellidoPropietario:String,
    dniPropietario:String,
    cbuPropietario:String,
    celularPropietario:String,
    emailPropietario:String,
    direccionPropietario:String,
    nombreInquilino:String,
    apellidoInquilino:String,
    dniInquilino:String,
    cbuInquilino:String,
    celularInquilino:String,
    emailInquilino:String,
    garantiaInquilino:String,
    direccion:String,
    propietario:String,
    inquilino:String,
    inicioContrato:String,
    inicioContratoHISP: String,
    valor1:Number,
    valor2:Number,
    valor3:Number,
    inicioP2: String,
    inicioP3: String,
    renovacion: String,
    descripcion:String,
    imagenes: Array,
    observaciones:String,
})

const Model = mongoose.model('Contrato', contratoSchema);

module.exports = Model;