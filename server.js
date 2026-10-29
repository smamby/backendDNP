require('dotenv').config();
const express = require('express');

const app = express();

const bodyParser = require('body-parser')
const path = require('path');
const cors = require('cors');
const routes = require('./routes/routes');
const { spawn } = require('child_process');

const db = require('./db');
const URI = 'mongodb://127.0.0.1:27017/delNorteProp';


db(URI);


const port = process.env.PORT || 5500

const whiteList = ['http://localhost:3000', 'http://localhost:5500', 'http://127.0.0.1:5500']
//{origin: whiteList}
app.use(cors({origin: '*' }));//['http://127.0.0.1:5500', 'http://localhost:5500', 'http://192.168.100.9:5500']}));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(express.json());


app.use(express.static('./public'))


if (process.env.NODE_ENV === 'development') {
    app.get('/api/ping', (req, res) => res.sendStatus(200)); // para refrezcar automaticamente el cliente
}

routes(app); //router tiene que estar despues de cors!!

const server = app.listen(port, '0.0.0.0', ()=>{
    console.log(`Version 6.2 - 2026-11`)
    console.log('http://localhost:'+port)
    // const protocol = req.protocol; // 'http' o 'https'
    // const host = req.get('host');   // Ej: '192.168.1.50:5500' o 'localhost:5500'
    // const SERVER_BASE_URL = `${protocol}://${host}`;
    // console.log('origin', SERVER_BASE_URL);

    // exec(`start "" brave --app=http://localhost:${port}/index.html`);
    if (process.env.NODE_ENV === 'wproduction') {
        const brave = 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe';
        const url = `http://localhost:${port}/index.html`;

        const braveProcess = spawn(brave, [`--app=${url}`], {
            detached: true,
            stdio: 'ignore'
        });
        braveProcess.unref();
    }
})

app.post('/close', (req, res) => {

    console.log('Cerrando aplicación...');

    res.sendStatus(200);

    server.close(() => {
        console.log('El servidor se cerró de forma segura.');
        process.exit(0);
    });
});