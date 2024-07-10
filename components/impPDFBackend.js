const toPDF = require("html-pdf")
const { Router } = require('express');
const router = Router();

var conversorToPDF = toPDF()

var fichaImpI = localStorage.getItem('fichaI');
var fichaImpP = localStorage.getItem('fichaP');
var re = JSON.parse(localStorage.getItem('recibo'));
var co = JSON.parse(localStorage.getItem('contrato'));

function crearHTML(){

    var divHTML = document.createElement('div');
    divHTML.id = 'divHTML';
    divHTML.innerHTML = fichaImpI;
    

    var fileNameInq =  `${re.numeroRecibo} ${co.direccion} inq.pdf`;
    conversorToPDF.create(divHTML).toFile(fileNameInq, (err, res) => {
        if (err) {
          console.error(err);
          return;
        }
      
        console.log('PDF generado correctamente!');
      });

    divHTML.innerHTML = '';
    divHTML.innerHTML = fichaImpP;
    var fileNameProp =  `${re.numeroRecibo} ${co.direccion} prop.pdf`;
    conversorToPDF.create(divHTML).toFile(fileNameProp, (err, res) => {
        if (err) {
          console.error(err);
          return;
        }
      
        console.log('PDF generado correctamente!');
      });
}