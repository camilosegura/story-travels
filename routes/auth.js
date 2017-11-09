const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/google', 
    passport.authenticate('google', {scope: ['profile', 'email']}), 
    (req, res, next) => {
});

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
  // Successful authentication, redirect home.
        res.redirect('/dashboard');
});

module.exports = router;
