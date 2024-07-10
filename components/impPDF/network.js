const { Router } = require('express');
const router = Router();
const fs = require('fs')
const path = require('path');
const htmlPdf  = require("html-pdf")


const pathPDFs = 'pdfs'


router.post('/', (req,res)=>{
  const { html, filename } = req.body;
  const options = {
    format: 'A4',
    orientation: 'portrait'
  }
  const filePath = path.join(__dirname, pathPDFs, filename)
  const cssPath = path.join(__dirname, '../../public/styles', 'impPDF.css');
  console.log(`[[csspath]] ${cssPath}`)
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  var fichaInn = html.outerHTML; //.replace(/(?:\r\n|\r|\n)/g, '').outerHTML;
  console.log(`[[router.post]] ${html}`)
  const fichaPDFBACK = `
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
    <div class="bodyInt" id="bodyInt">${html}</div>
    <script src="./api.js"></script>
  </body>
  </html>`;

  console.log(`[[[network fichaPDFback]]]   ${fichaPDFBACK}`)

  htmlPdf.create(fichaPDFBACK, options).toFile(filePath, (err, result) => {
    if (err) {
      console.error('Error generating PDF:', err);
      return res.status(500).send('Error generating PDF');
    }
    res.status(200).send({ message: 'PDF generado y guardado correctamente', filePath: result.filename });
  });
})

module.exports = router;