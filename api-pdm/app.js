"use strict";

const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const app = express();
const api = require('./routes/rutas');
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use('/uploads', express.static('uploads'));

///control de las rutas
app.use('/',api);
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});


module.exports = app;



