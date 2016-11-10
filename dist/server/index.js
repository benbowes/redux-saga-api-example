const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3006;

app.use(
  express.static(path.resolve(__dirname, '../../dist'))
);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
