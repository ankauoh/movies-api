const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid'),
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

app.use(bodyParser.json());
app.use(morgan('combined', { stream: accessLogStream }));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send("These are movies I like.");
});

//get all movies
app.get('/movies', (req, res) => {
  res.json('GET request returns data about all movies');
});

//get a movie via the title
app.get('/movies/:title/', (req, res) => {
  res.json(movies.find((movie) => { return movie.title === req.params.title }));
});

//get genre by name
app.get('/movies/genre/:Name', (req, res) => {
  res.json('request with genre Name parameter, and return the data for the genre');
});

//get director by name
app.get('.movies/directors/:Name', (req, res) => {
  res.json('request with director name parameter, and return the data for the director');
});

//register a new user
app.post('/users', (req, res) => {
  res.json('send parameters for new user incl. name, email, passwors, and respond with successful registration message');
});

//update user info
app.put('/users/:Username', (req, res) => {
  res.json('send parameters for updated info, and respond with a success message');
});

//Allow users to add a movie to their favorites list
app.post('/users/:Username/movies/:MovieID', (req, res) => {
  res.json('send info about the movie, respond with a success message');
});

//delete movie from favorite list
app.delete('/users/:Username/movies/:MovieID', (req, res) => {
  res.json('send info about the movie to be removed, respond with a success message');
});

//deregister a user
app.delete('/users/:Username', (req, res) => {
  res.json('send info about the user to be deleted, return a success mesage');
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});