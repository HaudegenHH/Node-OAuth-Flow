const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();

const PORT = process.env.PORT || 3000;

// set up view engine
app.set('view engine', 'ejs');

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // a day in milliseconds
    keys: [keys.session.cookieKey], // for encrypting the id
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
  console.log('Connected to MongoDB');
});

// set up auth routes
app.use('/auth', authRoutes);
// set up profile routes
app.use('/profile', profileRoutes);

// home route
app.get('/', (req, res) => {
  res.render('home');
});

app.listen(PORT, () => {
  console.log(`server is listening on http://localhost:${PORT}`);
});
