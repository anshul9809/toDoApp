
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/TODOLIST_development');

const db = mongoose.connection;

db.on('error', (err)=>{console.log("error is here in mongoose", err);});


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db