
"use strict";
const Objeto = require('../models/objeto');
const config = require('../config');


function newObject(req,res){
    
    let objeto = new Objeto();

    objeto.imagen = 'uploads\\'+req.body.imagen;
    objeto.nombre = req.body.nombre;
    objeto.descripcion = req.body.descripcion;
    objeto.direccion = req.body.direccion;
    objeto.fecha = new Date();
    objeto.usuario = req.body.usuario;
    objeto.correo = req.body.correo;
    
    objeto.save().then(result => {
      res.status(201).json({
        message: "Created objeto successfully",
        createdObjeto: {
            nombre: result.nombre,
            descripcion: result.descripcion,
            direccion: result.direccion,
            fecha: result.fecha,
            usuario: result.usuario,
            correo: result.correo
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

function viewObject(req,res){
    Objeto.find()
    .select("imagen nombre descripcion direccion fecha usuario correo _id")
    .exec()
    .then(response => {
            req.imagen = response.imagen;
            req.nombre= response.nombre;
            req.descripcion= response.descripcion;
            req.direccion= response.direccion;
            req.fecha= response.fecha;
            req.usuario= response.usuario;
            req.correo= response.correo;
            req._id= response._id;
       
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

function deleteObjeto(req,res){
     let id = req.params.id;
    Objeto.findById(id,(err,user)=>{
        if(err){
            return res.status(500).send({message: `error al borrar: ${err}`});
        }
        user.remove(err =>{
            if(err){
                return res.status(500).send({message: `error al borrar: ${err}`});
            }
            res.status(200).send({message: 'el objeto fue eliminado'});
        });
    });
}

module.exports = {
  newObject,
  viewObject,
  deleteObjeto
};
