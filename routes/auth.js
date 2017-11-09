const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/google', 
    passport.authenticate('google', {scope: ['profile', 'email']}), (req, res, next) => {
//   res.render('auth', { title: 'Express' });
});

module.exports = router;
