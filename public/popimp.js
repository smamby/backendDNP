var fichaImpI = localStorage.getItem('fichaI');
var fichaImpP = localStorage.getItem('fichaP');
//console.log(`[[POPIM 1]], ${fichaImpI}`);
var re = JSON.parse(localStorage.getItem('recibo'));
var co = JSON.parse(localStorage.getItem('contrato'));
var div = document.getElementById('bodyInt');
var divHTML = document.createElement('div');
divHTML.id = 'divHTML';
divHTML.innerHTML = fichaImpI;
div.appendChild(divHTML)

function impPdfInq(){
    var fichaInq = div.outerHTML;
    var fileNameInq =  `${re.numeroRecibo} ${co.direccion} inq.pdf`;
    window.isFetching = false;
    imprimirReciboPDFBack(fichaInq,fileNameInq)
};
function impPdfProp(){
    divHTML.innerHTML = '';
    divHTML.innerHTML = fichaImpP;
    div.appendChild(divHTML);

    var fichaProp = div.outerHTML;
    //console.log("[[[POPIMP 2]]]   "+fichaProp)
    var fileNameProp =  `${re.numeroRecibo} ${co.direccion} prop.pdf`;
    window.isFetching = false;
    imprimirReciboPDFBack(fichaProp,fileNameProp)

};

function impPDF() {
    try {
        impPdfInq();
        impPdfProp();
        //setTimeout(() => {window.close()}, 1000);
    } catch (error) {
        console.error('Error in PDF generation process:', error);
    }
}
impPDF();

// var res = impPDF();
// if (res.ok) {
//     windows.close()
// }
