const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const compression = require('compression');
const path = require('path');
const logger = require('morgan');
require('dotenv').config();

const User = require('./models/user');

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

// Passport, session config
const secret = process.env.SESSION_SECRET;
app.use(session({ secret, resave: false, saveUninitialized: true }));
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { msg: 'Incorrect username or password' });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          return done(null, user);
        } else {
          return done(null, false, {
            msg: 'Incorrect username or password',
          });
        }
      });
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

// Middlewares setup
app.use(compression());
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

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
