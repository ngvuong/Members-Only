const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const checkAuth = require('../utils/checkAuth');

// Home page
router.get('/', postController.index);

// User auth routes
router.get('/sign-up', userController.user_create_get);

router.post('/sign-up', userController.user_create_post);

router.get('/log-in', userController.user_login_get);

router.post('/log-in', userController.user_login_post);

router.get('/log-out', userController.user_logout);

// Post routes
router.get('/create-post', checkAuth, postController.post_create_get);

router.post('/create-post', checkAuth, postController.post_create_post);

module.exports = router;
