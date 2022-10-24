const router = require('express').Router();

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/logout', (req, res) => {
  // to do: handle with passport
  res.send('logging out');
});

router.get('/google', (req, res) => {
  // to do: handle with passport
  res.send('logging in with google');
});

module.exports = router;
