const db = require('mongoose');

//db.set('strictQuery', false);
//db.Promnise = global.Promise;

async function connect(url){
    await db.connect(url, {useNewUrlParser: true});
    console.log('[db] conectada');
}

module.exports = connect;
