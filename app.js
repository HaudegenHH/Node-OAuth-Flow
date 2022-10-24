const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// set up view engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(PORT, () => {
  console.log(`server is listening on http://localhost:${PORT}`);
});
