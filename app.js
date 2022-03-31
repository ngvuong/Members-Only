const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const logger = require('morgan');

const app = express();

// Views setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
