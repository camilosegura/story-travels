const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');

const Passport = passport => {
    passport.use(
        new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.gogoleClientSecret,
            callbackURL: "/auth/google/callback",
            proxy: true
        },
        (accessToken, refreshToken, profile, cb) => {
            console.log(accessToken, refreshToken, profile)
            // User.findOrCreate({ googleId: profile.id }, function (err, user) {
            //   return cb(err, user);
            // });
        })
    )
}

module.exports = Passport;