const { body, validationResult } = require('express-validator');

exports.index = function (req, res, next) {
  res.render('index', {
    title: 'Members-Only',
  });
};
