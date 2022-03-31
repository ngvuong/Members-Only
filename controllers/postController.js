const { body, validationResult } = require('express-validator');
const Post = require('../models/post');

exports.index = async function (req, res, next) {
  try {
    const posts = await Post.find().sort({ created: 'desc' });
    res.render('index', {
      title: 'Members Only',
      posts,
    });
  } catch (err) {
    next(err);
  }
};
