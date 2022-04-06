const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const checkAuth = require('../utils/checkAuth');

// Home page
router.get('/', postController.index);

// Member page
router.get('/member/:id', checkAuth, postController.member);

// User auth routes
router.get('/sign-up', userController.user_create_get);

router.post('/sign-up', userController.user_create_post);

router.get('/log-in', userController.user_login_get);

router.post('/log-in', userController.user_login_post);

router.get('/log-out', userController.user_logout);

// Member access routes
router.get('/convert-member', checkAuth, userController.user_member_get);

router.post('/convert-member', checkAuth, userController.user_member_post);

// Admin access routes
router.get('/convert-admin', checkAuth, userController.user_admin_get);

router.post('/convert-admin', checkAuth, userController.user_admin_post);

// Post routes
router.get('/create-post', checkAuth, postController.post_create_get);

router.post('/create-post', checkAuth, postController.post_create_post);

router.post('/delete-post', checkAuth, postController.post_delete_post);

module.exports = router;
