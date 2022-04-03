const { body, validationResult } = require('express-validator');
const { format } = require('date-fns');

const Post = require('../models/post');

exports.index = async function (req, res, next) {
  try {
    const posts = await Post.find()
      .populate('author')
      .sort({ created: 'desc' });
    res.render('index', {
      title: 'Members Only',
      posts,
    });
  } catch (err) {
    next(err);
  }
};

// 'MMM do, yyyy \@ H:mm'

exports.post_create_get = function (req, res, next) {
  res.render('create_post', { title: 'Create Post' });
};

exports.post_create_post = [
  body('title', 'Post title must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('content', 'Post content must not be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      created: format(new Date(), 'MMM do, yyyy @ H:mm'),
      author: req.user._id,
    });

    if (!errors.isEmpty()) {
      res.render('create_post', {
        title: 'Create Post',
        post,
        errors: errors.array(),
      });
    } else {
      post.save((err) => {
        if (err) return next(err);
        res.redirect('/');
      });
    }
  },
];

exports.post_delete_post = async function (req, res, next) {
  try {
    await Post.findByIdAndDelete(req.body.postid);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
};
