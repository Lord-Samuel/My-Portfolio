const express = require('express');
const app = express();
const path = require('path')


app.use('/favicon', express.static(path.join(__dirname, 'public/favicon')))
app.use('/css', express.static(path.join(__dirname, 'public/css')))
app.use('/js', express.static(path.join(__dirname, 'public/js')))
app.use('/images', express.static(path.join(__dirname, 'public/images')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 404 Handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});


app.listen(3000, () => {
  console.log('Server started on port 3000');
});
