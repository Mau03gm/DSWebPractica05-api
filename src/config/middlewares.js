const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');

const configureMiddlewares = (app) => {
    app.use(cors());
    app.use(compression());
    app.use(helmet());
    app.use(express.json());
};

module.exports = configureMiddlewares;
