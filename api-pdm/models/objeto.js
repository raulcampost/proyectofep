"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const objetoSchema = Schema({
    imagen: String,
    nombre: String,
    descripcion: String,
    direccion: String,
    fecha: String,
    usuario: String,
    correo: String
});

module.exports = mongoose.model('Objeto',objetoSchema);

