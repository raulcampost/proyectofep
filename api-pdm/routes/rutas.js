"use strict";

const express = require('express');
const api = express.Router();
const Usercontroller = require('../controller/users');
const Objetocontroller = require('../controller/objetos');
const auth = require('../middlewares/auth');
const multer = require('multer');
const config = require('../config');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g,'-') + file.originalname.split(" ").join(""));
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({storage: storage,limits: {fileSize: 1024 * 1024 * 5},fileFilter: fileFilter}).single('imagen');
////////////////////////////////////////////////////////////////////////////////////////////////////
//esta area crea, elimina, actualiza y busca usuarios
////
//muestra todos los usuarios
api.get('/',Usercontroller.viewUser);
//muestra todos los usuarios
api.get('/ver/usuario/:user',Usercontroller.view);
//crea un nuevo usuario
api.post('/nuevo/usuario',Usercontroller.newUser);
//login de usuario
api.post('/login/usuario',Usercontroller.loginUser);

//elimina usuario por medio del id que genera mongodb
api.delete('/delete/usuario/:id',Usercontroller.deleteUser);

//actualiza los datos del usuario por medio de nombre de usuario
api.put('/actualizar/usuario',auth,Usercontroller.updateUser);





////////////////////////////////////////////////////////////////////////////////////////////////////
//rutas para agregar, ver, actualizar objetos con mongodb
//
//ruta que devuelve todos los objetos de la base de datos
api.get('/ver/objeto',Objetocontroller.viewObject);
//ruta que agrega datos
api.post('/nuevo/objeto',auth,Objetocontroller.newObject);

api.delete('/delete/objeto/:id',Objetocontroller.deleteObjeto);





module.exports = api;
