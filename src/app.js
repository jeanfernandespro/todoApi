// Setup básico do app.js | o cors é usado para permitir o uso em localhost (deve ser usado apenas em desenvolvimento)
const express = require('express');
const router = require('./router');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

module.exports = app;
