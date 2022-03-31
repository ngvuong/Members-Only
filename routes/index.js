const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const postController = require('../controllers/postController');

router.get('/', postController.index);

router.get('/sign-up', userController.user_create_get);

router.post('/sign-up', userController.user_create_post);

module.exports = router;
