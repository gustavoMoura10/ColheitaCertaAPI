const helmet = require('helmet');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

exports.config = app =>{
    app.use(morgan('dev'))
    app.use(helmet());
    app.use(cors());
    app.use(express.json({
        limit:'350mb'
    }));
}