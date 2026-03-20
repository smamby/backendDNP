require('dotenv').config();
const express = require('express');

const app = express();

const bodyParser = require('body-parser')
const cors = require('cors');
const routes = require('./routes/routes');

const db = require('./db');
const URI = 'mongodb://127.0.0.1:27017/delNorteProp';

db(URI);

const port = process.env.PORT || 5500

const whiteList = ['http://localhost:3000', 'http://localhost:5500', 'http://127.0.0.1:5500']
//{origin: whiteList}
app.use(cors({origin: ['http://127.0.0.1:5500', 'http://localhost:5500']}));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(express.json());


app.use(express.static('./public'))

routes(app); //router tiene que estar despues de cors!!

const server = app.listen(port, ()=>{
    console.log(`Version 6.02 - 2026-01`)
    console.log('http://localhost:'+port)
})

app.post('/close', (req,res)=>{
    server.close(() => {
        console.log('El servidor se cerró de forma segura.');
        res.sendStatus(200);
        process.exit(0);
    });
})