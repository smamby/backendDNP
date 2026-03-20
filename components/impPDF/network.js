const { Router } = require('express');
const router = Router();
const fs = require('fs')
const path = require('path');
const puppeteer = require('puppeteer')

let browser = null; // Instancia única de browser reutilizada

const pathPDFs = 'pdfs' //path donde se guarda los PDF

router.post('/', async (req, res) => {
  const { html, filename } = req.body;

  if (!html || !filename) {
    return res.status(400).send('HTML content and filename are required.');
  }

  const filePathProduccion = path.join(process.env.PDFSTORAGEPATH, filename);
  const cssPath = path.join(__dirname, '../../public/styles', 'impPDF.css');
  console.log(`[[filepath]] ${filePathProduccion}`);

  let cssContent;
  try {
    cssContent = fs.readFileSync(cssPath, 'utf8');
  } catch (err) {
    console.error('Error reading CSS file:', err);
    return res.status(500).send('Error reading CSS file');
  }

  const fichaPDFBACK = `
    <!doctype html>
    <html>
    <head>
      <title>Print it to PDF</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,500;0,700;1,200;1,600&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet">
      <link rel="stylesheet" media="all" href="./styles/impPDF.css">
      <style>${cssContent}</style>
    </head>
    <body style="width: 628px">
      ${html}
    </body>
    </html>`;

  try {
    // Inicializar browser si no existe
    if (!browser) {
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
    }

    const page = await browser.newPage();
    const SERVER_BASE_URL = 'http://127.0.0.1:5500';
    
    // Esperar a que se carguen todos los recursos (fuentes, imágenes, etc.)
    await page.setContent(fichaPDFBACK, {
      waitUntil: 'networkidle0',
      baseURL: SERVER_BASE_URL
    });

    await page.pdf({
      format: 'A4',
      path: filePathProduccion,
      printBackground: true,
      margin: {
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
      },
      scale: 0.9,
    });

    await page.close();
    res.status(200).send({ message: 'PDF generado y guardado correctamente', filePathProduccion });
  } catch (err) {
    console.error('PDF ERROR:', err);
    return res.status(500).json({ error: err.message });
  }
});

// Cerrar browser al cerrar la aplicación
process.on('SIGINT', async () => {
  if (browser) {
    await browser.close();
  }
  process.exit(0);
});

module.exports = router;