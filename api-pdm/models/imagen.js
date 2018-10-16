"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imgSchema = Schema({
    titulo: {type:String,required: true},
    creador:{type: Schema.Types.ObjectId}
   
});

module.exports = mongoose.model('Imagen',imgSchema);


