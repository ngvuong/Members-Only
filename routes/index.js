const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.get('/sign-up', (req, res) => {
  res.render('sign_up', { title: 'Sign Up' });
});

module.exports = router;
