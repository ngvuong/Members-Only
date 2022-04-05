const passport = require('passport');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');

exports.user_create_get = function (req, res, next) {
  res.render('sign_up', { title: 'Sign Up' });
};

exports.user_create_post = [
  body('username')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long')
    .escape(),
  body('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .escape(),
  body('password_confirm')
    .trim()
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Password confirmation must match password')
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('sign_up', {
        title: 'Sign Up',
        username: req.body.username,
        errors: errors.array(),
      });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) return next(err);

        const user = new User({
          username: req.body.username,
          password: hashedPassword,
        });
        user.save((err) => {
          if (err) return next(err);
          res.redirect('/');
        });
      });
    }
  },
];

exports.user_login_get = function (req, res, next) {
  res.render('log_in', { title: 'Log In' });
};

exports.user_login_post = function (req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.render('log_in', { title: 'Log In', errors: [info] });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      const prevUrl = req.session.prevUrl;
      req.session.prevUrl = null;
      return res.redirect(prevUrl || '/');
    });
  })(req, res, next);
};

exports.user_logout = function (req, res) {
  req.logout();
  res.redirect('/');
};

exports.user_member_get = function (req, res, next) {
  res.render('convert_member', { title: 'Become a Member' });
};

exports.user_member_post = function (req, res, next) {
  if (req.body.password === process.env.MEMBERSHIP_CODE) {
    User.findById(req.user._id, (err, user) => {
      if (err) return next(err);
      user.membership = 'member';
      user.save((err) => {
        if (err) return next(err);
        res.redirect('/');
      });
    });
  } else {
    res.render('convert_member', {
      title: 'Become a Member',
      errors: [{ msg: 'Incorrect code' }],
    });
  }
};

exports.user_admin_get = function (req, res, next) {
  res.render('convert_admin', { title: 'Become an Admin' });
};

exports.user_admin_post = function (req, res, next) {
  if (req.body.password === process.env.ADMIN_CODE) {
    User.findById(req.user._id, (err, user) => {
      if (err) return next(err);
      user.membership = 'admin';
      user.save((err) => {
        if (err) return next(err);
        res.redirect('/');
      });
    });
  } else {
    res.render('convert_admin', {
      title: 'Become an Admin',
      errors: [{ msg: 'Incorrect code' }],
    });
  }
};
