const express = require('express');
const recibos = require('../components/recibos/network');
const contratos = require('../components/contratos/network');

const routes = function(server) {
    server.use('/recibos', recibos);
    server.use('/contratos', contratos);
}

module.exports = routes;