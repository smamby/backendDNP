const express = require('express');
const app = express();

const bodyParser = require('body-parser')
const cors = require('cors');
const routes = require('./routes/routes');

const db = require('./db');
const URI = 'mongodb://localhost:27017/DNP';

db(URI);

const port = process.env.PORT || 5500

const whiteList = ['http://localhost:3000', 'http://localhost:5500', 'http://127.0.0.1:5500']
//{origin: whiteList}
app.use(cors({origin: 'https://smamby.github.io'}));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

routes(app); //router tiene que estar despues de cors!!

app.get('/', (req,res)=>{
    var name = req.query.name
    console.log(name)
    res.send('<h1>Atencion '+name+' esto es una prueba de coneccion del servidro en puerto '+port+'</h1>')
})


app.post('/close', (req,res)=>{
    server.close(() => {
        console.log('El servidor se cerró de forma segura.');
        process.kill(process.pid)
        process.exit(0);
    });
})
    

const server = app.listen(port, ()=>{
    console.log(`Servidor escuchando por puerto ${port}`)
})
