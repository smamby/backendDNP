const express = require('express');
const recibos = require('../components/recibos/network');
const contratos = require('../components/contratos/network');
const printPDF = require ( '../components/impPDF/network');

const routes = function(server) {
    server.use('/recibos', recibos);
    server.use('/contratos', contratos);
    server.use('/printPDF', printPDF);
}

module.exports = routes;