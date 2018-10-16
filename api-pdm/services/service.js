"use strict";

const jwt = require('jwt-simple');
const moment = require('moment');
const conf = require('../config');

function createToken(user){
    const payload = {
        sub: user._id,
        iat:moment().unix(),
        exp:moment().add(30, 'days').unix
    };
    
   return jwt.encode(payload,conf.SECRET_TOKEN);
    
}

function decodeToken(token){
    const decoded = new Promise((resolve,reject)=>{
        try{
            const payload = jwt.decode(token,conf.SECRET_TOKEN);
            if(payload.exp <= moment().unix()){
                reject({
                    status:401,
                    message: 'el token ha vencido'
                });
            }
            
            resolve(payload.sub);
    
        }
        catch(err){
            reject({
                status:500,
                message:'token invalido'
            });
        }
    });
    
   return decoded;
    
}




module.exports = {
    createToken,
    decodeToken
};

