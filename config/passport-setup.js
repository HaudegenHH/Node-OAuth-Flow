const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { google } = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
  // id is from mongodb, first parameter is for an potential error
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      // options for the google strategy
      clientID: google.clientID,
      clientSecret: google.clientSecret,
      callbackURL: '/auth/google/redirect',
    },
    (accessToken, refreshToken, profile, done) => {
      // check if user already exists in the db
      User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          // already exists
          console.log('user is: ', currentUser);
          done(null, currentUser);
        } else {
          // create new User
          new User({
            username: profile.displayName,
            googleId: profile.id,
          })
            .save()
            .then((newUser) => {
              console.log('new user created: ', newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);
