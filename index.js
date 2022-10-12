const express = require('express')
const app = express()

const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const engines = require('consolidate')
const JSONStream = require('JSONStream');
const bodyParser = require('body-parser')

const mpdule = require('./db').User;
app.engine('hbs', engines.handlebars)

app.set('views', './views')
app.set('view engine', 'hbs')

app.use('/profilepics', express.static('images'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/favicon.ico', function (req, res) {
  res.end()
})

app.get('/', function (req, res) { 
    User.find({}, function(error, users) {
      res.render('index', {users})
  })
})

function verifyUser (req, res, next) {
  const fp = getUserFilePath(req.params.username)
  fs.exists(fp, function (yes) {
    if (yes) {
      next()
    } else {
      // next('route');
      res.redirect(`/error/${req.params.username}`);
    }})
  }

app.get('*.json', function (req, res) {
  res.download(`./users/${req.path}`, 'funny-name.exe')
});

app.get('/users/by/:gender', function (req, res) {
  const readable = fs.createReadStream('users.json');
  const gender = req.params.gender;
  readable
    .pipe(JSONStream.parse('*', function (user) {
      if (user.gender === gender) {
        console.log(user);
        return user.name};
    }))
    .pipe(JSONStream.stringify('[\n  ', ',\n  ', '\n]\n'))
    .pipe(res)
})

app.get('/error/:username', function (req, res) {
  res.status(404).send(`No user name ${req.params.username} found`);
});

app.get(`/data/:username`, function (req, res) {
  const username = req.params.username;
  const readable = fs.createReadStream(`./users/${username}.json`);
  readable.pipe(res);
})

const userRouter = require('./username')
const { User } = require('./db')
app.use('/:username', userRouter)

const server = app.listen(3000, function () {
  console.log('Server running at http://localhost:' + server.address().port)
})