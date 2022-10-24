const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const { google } = require('./keys');

passport.use(
  new GoogleStrategy(
    {
      // options for the google strategy
      clientID: google.clientID,
      clientSecret: google.clientSecret,
      callbackURL: '/auth/google/redirect',
    },
    (accessToken, refreshToken, profile, cb) => {
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
      console.log(profile);
    }
  )
);
