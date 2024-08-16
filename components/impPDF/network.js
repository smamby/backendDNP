const { Router } = require('express');
const router = Router();
const fs = require('fs')
const path = require('path');
const htmlPdf  = require('html-pdf')
const PDFDocument = require('pdfkit');
const jsPDF = require('jspdf');
const puppeteer = require('puppeteer')


const pathPDFs = 'pdfs' //path donde se guarda los PDF


router.post('/', (req,res)=>{
  console.log(`[[router.post]] ${JSON.stringify(req.body)}`);
  const { html, filename } = req.body;

  if (!html || !filename) {
    return res.status(400).send('HTML content and filename are required.');
  }
  
  const options = {
    format: 'A4',
    orientation: 'portrait'
  }
  const filePath = path.join(__dirname, pathPDFs, filename)
  const filePathProduccion = path.join('file:///C:/Users/User/Documents/INMOBILIARIA/RECIBOS_Y_LIQUIDACIONES/mesEnCurso/',filename)
  const cssPath = path.join(__dirname, '../../public/styles', 'impPDFincrustado.css');
  console.log(`[[csspath]] ${cssPath}`)
  
  let cssContent;
  try {
    cssContent = fs.readFileSync(cssPath, 'utf8');

  } catch (err) {
    console.error('Error reading CSS file:', err);
    return res.status(500).send('Error reading CSS file');
  }

  var fichaInn = html.outerHTML; //.replace(/(?:\r\n|\r|\n)/g, '').outerHTML;
  console.log(`[[router.post]] ${html}`)

   var fichaPDFBACK = `
  <!doctype html>
  <html>
  <head>
    <title>Print it to PDF</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,500;0,700;1,200;1,600&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet">
    <style>${cssContent}</style>
  </head>
  <body style="width: 628px">
    
    ${html}
    
  </body>
  </html>`;

  console.log(`[[[network fichaPDFback]]]   ${fichaPDFBACK}`)

  //let file = { url: "http://127.0.0.1:5500/public/popimp.html" };
  htmlPdf.create(fichaPDFBACK, options).toFile(filePath, (err, result) => { //fichaPDFBACK => file
    if (err) {
      console.error('Error generating PDF:', err);
      return res.status(500).send('Error generating PDF');
    }
    res.status(200).send({ message: 'PDF generado y guardado correctamente', filePath: result.filename });
  })

  fs.writeFileSync('./public/prueba.html', fichaPDFBACK, 'utf8', (err) => {
    if (err) {
        console.error('Error al guardar el archivo:', err);
        return res.status(500).send('Error al guardar el archivo');;
    }
    console.log('Archivo guardado exitosamente en la carpeta public como prueba.html');
    res.status(200).send({ message: 'Archivo guardado exitosamente' });
  });

  /////////////////////////////////////////////////////////////////

  // const pdf = new jsPDF();
  // const element = fichaPDFBACK;
  // pdf.html(element, {
  //     callback: function (pdf) {
  //     // Save the PDF to a file or display it
  //     pdf.save(filePath);
  //     },
  // });

  ///////////////////////////////////////////////////////////////
  // async function convPDF(){
  //   const browser = await puppeteer.launch();
  //   const page = await browser.newPage();
  //   await page.setContent(fichaPDFBACK, {waitUntil: 'domcontentloaded'})
  //   const pdfBuffer = await page.pdf({
  //     format: 'A4',
  //     path: filePath,
  //     printBackground: true
  //   })
  // }  
  // convPDF();  

  
/////////////////////////////////////////


  ///////////////////////////////////////
  // function generatePDF(html) {
  //   const pdfContent = html// ... (generated PDF content as a string or buffer)

  //   const writeStream = fs.createWriteStream(filePath);
  //   writeStream.write(pdfContent); // Write the PDF content to the file

  //   // Handle potential errors (optional)
  //   writeStream.on('error', (err) => {
  //     console.error('Error writing PDF:', err);
  //   });

  //   writeStream.on('finish', () => {
  //     console.log('PDF generated successfully!');
  //   });

  //   writeStream.close(); 
  // };
  // generatePDF(fichaPDFBACK, filename) 
})

module.exports = router;
