require('dotenv').config();
const express = require('express');
const recibos = require('../components/recibos/network');
const contratos = require('../components/contratos/network');
const printPDF = require ( '../components/impPDF/network');
const sendMail = require('../components/sendMail/sendMail.js');

const routes = function(server) {
    server.use('/recibos', recibos);
    server.use('/contratos', contratos);
    server.use('/printPDF', printPDF);
    server.use('/sendMail', sendMail);
}

module.exports = routes;