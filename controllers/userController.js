const { body, validationResult } = require('express-validator');

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
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('sign_up', { title: 'Sign Up', errors: errors.array() });
    } else {
      next();
    }
  },
];
