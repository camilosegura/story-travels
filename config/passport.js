const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');
const User = mongoose.model('users');

const Passport = passport => {
    passport.use(
        new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.gogoleClientSecret,
            callbackURL: "/auth/google/callback",
            proxy: true
        },
        (accessToken, refreshToken, profile, cb) => {
            // console.log(accessToken, refreshToken, profile)
            // User.findOrCreate({ googleId: profile.id }, function (err, user) {
            //   return cb(err, user);
            // });
            const photo = profile.photos[0].value
                .substring(0, profile.photos[0].value.indexOf('?'));
            const newUser = {
                googleID: profile.id,
                firstName: profile.name.givenName, 
                lastName: profile.name.familyName,
                email: profile.emails[0].value,
                image: photo
            }

            User.findOne({
                googleID: profile.id
            })
                .then(user => {
                    if (user) {
                        cb(null, user);
                    } else {
                        new User(newUser)
                            .save()
                            .then(user => cb(null, user));
                    }
                })
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id)
            .then(user => done(null, user));
    })
}

module.exports = Passport;