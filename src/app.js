const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const app = express();

//Mejora la seguridad de las URL
app.use(helmet());

//Allow cors
app.use(cors());

//Información de los request
app.use(morgan("combined"));

// Allow json request
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

///Permite acceder a cualquier ruta de manera estática
app.use(express.static(path.join(__dirname , 'public')))

//Configurar rutas
app.use('/user', require('./routes/user.route'));
app.use('/product', require('./routes/product.route'));

module.exports = app;