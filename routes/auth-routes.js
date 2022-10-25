const router = require('express').Router();
const passport = require('passport');

router.get('/login', (req, res) => {
  res.render('login', { user: req.user });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// callback route for google to redirect to
// + extra piece of middleware: before the redirect callback runs
// it fires passport.authenticate('google') again
// why authenticate 2x? difference to before is: now you have a code
// as query param in the redirect url (which passport can see and instead of
// redirecting you to the conscent screen again, it sees the code and knows
// you want to exchange the code for profile information which passport does for
// you in the background)
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  // res.send(req.user);
  res.redirect('/profile/');
});

module.exports = router;
