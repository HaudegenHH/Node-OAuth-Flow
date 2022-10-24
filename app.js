const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const authRoutes = require('./routes/auth-routes');

// set up view engine
app.set('view engine', 'ejs');

// set up auth routes
app.use('/auth', authRoutes);

// home route
app.get('/', (req, res) => {
  res.render('home');
});

app.listen(PORT, () => {
  console.log(`server is listening on http://localhost:${PORT}`);
});
