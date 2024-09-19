require('dotenv').config();
const { Router } = require('express');
const router = Router();
const nodemailer = require('nodemailer');
const fs = require('fs');


router.post('/', (req,res) => {
    const {
        filenamePDF, mailDestiny, subjectMail, bodyMail
    } = req.body;
    const filePath = process.env.PDFSTORAGEPATH + filenamePDF;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAILAUTH,
            pass: process.env.PASSAUTH
        }
    });
    console.log(filenamePDF);
    console.log(process.env.PDFSTORAGEPATH);
    console.log(process.env.MAILAUTH);
    console.log(process.env.PASSAUTH);

    if (fs.existsSync(process.env.PDFSTORAGEPATH + filenamePDF)) {
        const mailOption = {
            from: process.env.MAILAUTH,
            to: mailDestiny,
            subject: subjectMail,
            text: bodyMail,
            attachments: [{
                filename: filenamePDF,
                path: filePath
            }]
        };
        transporter.sendMail(mailOption, (error, info) => {
            if (error) {
                const errorMessage = error.message.split('\n')[0]; 
                console.error(errorMessage);
                return res.status(500).send({ message: `Error al enviar el correo: ${errorMessage}` })
            }
            console.log('Correo enviado: '+info.response);
            res.status(200).send(`Mail enviado correctamente a ${mailDestiny}, file: ${filenamePDF}`)
        });
    } else {
        console.error('El archivo no existe!\nImprime el PDF primero:', filePath);
        res.status(404).send(`Archivo inexistente!!\n\n${filenamePDF}\n\nImprime el PDF primero`);
    }
});

module.exports = router;