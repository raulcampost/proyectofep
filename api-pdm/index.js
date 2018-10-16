/* global process */

"use strict";

const mongo = require('mongodb');
const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');
var url = config.db;
app.set('port',config.port);

//estableciendo conexion con bases de datos mongodb y levantando servidor
mongoose.connect(url,(err,db)=>{
    if(err){
        throw err;
    }
    console.log("database corriendo...");
    app.listen(app.get('port'),() => {
        console.log(`api-pdm corriendo en http://localhost:${app.get('port')}`);
    });
});


