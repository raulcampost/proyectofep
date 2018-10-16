"use strict";
const imagen = require('../models/imagen');

function newimage(req,res){
    let img = new imagen();
    img.imagen = req.body.imagen;
    img.nombre = req.body.nombre;
    
    img.save((err, imgsave)=>{
       if(err){
           res.status(500).send({message: `error al guardar datos: ${err}`});
       } 
       res.status(200).send({imagenes: imgsave});
    });
}

function viewImage(req,res){
    imagen.find({},(err,imagen)=>{
        if(err){
            return res.status(500).send({message: `error al realizar peticion: ${err}`});
        }
        if(!imagen){
            return res.status(404).send({message: 'no existen la imagen'});
        }
        
        res.send(200,imagen);
    });
}

module.exports = {
  newimage,
  viewImage
};


