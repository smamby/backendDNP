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

async function impPdfInq(){
    var fichaInq = div.outerHTML;
    var fileNameInq =  `${re.numeroRecibo} ${co.direccion} inq.pdf`;
    window.isFetching = false;
    await imprimirReciboPDFBack(fichaInq,fileNameInq)
};
async function impPdfProp(){
    divHTML.innerHTML = '';
    divHTML.innerHTML = fichaImpP;
    div.appendChild(divHTML);

    var fichaProp = div.outerHTML;
    //console.log("[[[POPIMP 2]]]   "+fichaProp)
    var fileNameProp =  `${re.numeroRecibo} ${co.direccion} prop.pdf`;
    window.isFetching = false;
    await imprimirReciboPDFBack(fichaProp,fileNameProp)

};

async function impPDF() {
    mostrarSpinner(); // Activa el spinner al inicio de todo el proceso
    try {
        await impPdfInq();
        await impPdfProp();

        // Un pequeño retraso opcional para asegurar que el servidor respondió todo
        setTimeout(() => {
            window.close();
        }, 500);
    } catch (error) {
        console.error('Error in PDF generation process:', error);
        alert('Ocurrió un error al generar los archivos PDF.');
    } finally {
        ocultarSpinner(); // Se oculta en caso de error o finalización
    }
}

impPDF();
