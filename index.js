const express = require('express'),
  morgan = require('morgan'),
  fs = require('fs'),
  path = require('path');
const app = express();

let topMovies = [
  {
    title: 'Good Will Hunting'
  },
  {
    title: 'Amelie'
  },
  {
    title: 'The Grand Budapest Hotel'
  },
  {
    title: 'The Lord of the Rings'
  },
  {
    title: 'Inglorious Basterds'
  },
  {
    title: 'Stalker'
  },
  {
    title: 'Triangle of Sadness'
  },
  {
    title: 'In the Mood for Love'
  },
  {
    title: 'The Grinch'
  },
  {
    title: 'Mean Girls'
  },
];

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), { flags: 'a' })

app.use(morgan('combined', { stream: accessLogStream }));

app.use(express.static('public'));

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.get('/secreturl', (req, res) => {
  res.send('This is a secret url with super top-secret content.');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});