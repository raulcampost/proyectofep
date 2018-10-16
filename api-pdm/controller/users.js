

"use strict";
const User = require('../models/user');
const mongoose = require('mongoose');
const service = require('../services/service');


function newUser(req,res){    
    const users = new User();
        users.user = req.body.user;
        users.password = req.body.password;
        users.correo = req.body.correo;
        users.actualizar = req.body.user;
        
    users.save((err)=>{
       if(err){
           res.status(500).send({message: `error al crear usuario: ${err}`});
       } 
       res.status(201).send({token: service.createToken(users)});
    });
}

function loginUser(req,res){
    const users = new User();
   User.findOne({'user': req.body.user,'password': req.body.password},(err,user)=>{
        if(err){
            return res.status(500).send({message:err});
        }
        if(!user){
            return res.status(404).send({message: 'usuario invalido...'});
        }
        res.status(200).send({
           token:service.createToken(user)
        });
    });
}

function deleteUser(req,res){
     let id = req.params.id;
    User.findById(id,(err,user)=>{
        if(err){
            return res.status(500).send({message: `error al borrar: ${err}`});
        }
        user.remove(err =>{
            if(err){
                return res.status(500).send({message: `error al borrar: ${err}`});
            }
            res.status(200).send({message: 'el usuario fue eliminado'});
        });
    });
}

function updateUser(req,res){
    
    User.findOneAndUpdate({actualizar:req.body.actualizar},{$set:{user: req.body.user,password:req.body.password,
            correo:req.body.correo,actualizar:req.body.user}},(err,user)=>{
        if(err){
            return res.status(500).send({message: `error al actualizar: ${err}`});
        }
        res.status(200).send(user);
    });
   
}

function viewUser(req,res){
    User.find({},(err,user)=>{
        if(err){
            return res.status(500).send({message: `error al realizar peticion: ${err}`});
        }
        if(!user){
            return res.status(404).send({message: 'no existen ese usuario'});
        }
        res.status(200).send(user);
    });
}
function view(req,res){
    User.find({user:req.params.user},(err,user)=>{
        if(err){
            return res.status(500).send({message: `error al realizar peticion: ${err}`});
        }
        if(!user){
            return res.status(404).send({message: 'no existen ese usuario'});
        }
         res.status(200).send(user);
    });
}



module.exports = {
  newUser,
  loginUser,
  deleteUser,
  updateUser,
  viewUser,
  view
};

