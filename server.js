const express = require('express');
const app = express();

//const bodyParser = require('body-parser')
const cors = require('cors');
const routes = require('./routes/routes');
routes(app);

const db = require('./db');
const URI = 'mongodb://localhost:27017/DNP';

db(URI);

const port = process.env.PORT || 5500

const whiteList = ['http://localhost:3000', 'http://localhost:5500', 'http://127.0.0.1:5500']
//{origin: whiteList}
app.use(cors({origin: "*"}));
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.get('/', (req,res)=>{
    var name = req.query.name
    console.log(name)
    res.send('<h1>Atencion '+name+' esto es una prueba de coneccion del servidro en puerto '+PORT+'</h1>')
})


app.listen(port, ()=>{
    console.log(`Servidor escuchando por puerto ${port}`)
})