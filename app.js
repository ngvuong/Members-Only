const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const logger = require('morgan');
require('dotenv').config();

const IndexRouter = require('./routes/index');
const app = express();

// Connect to mongodb
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
// Default connection
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Views setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routers setup
app.use('/', IndexRouter);

// Catch 404
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port 3000');
});
