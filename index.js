var express = require('express');
const res = require('express/lib/response');
var app = express();
var fs = require('fs');
var _ = require('lodash');
var engine = require('consolidate');


var users = [];

fs.readFile('users.json', {encoding: 'utf8'}, (err, data) => {
  if (err) throw err

  JSON.parse(data).forEach((user) => {
    user.name.full = _.startCase(user.name.first + ' ' + user.name.last)
    users.push(user)
  })
  
});

app.engine('hbs', engine.handlebars);

app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  // res.send(buffer)
  res.render('index', {users })
})

app.get(/big.*/, (req, res, next) =>{
  console.log('BIG USER ACCESS');
  next();
});

app.get(/.*dog.*/, (req, res, next) =>{
  console.log('DOGD GO WOOF');
  next();
})

app.get('/:username', (req, res) => {
  var username = req.params.username;
  res.send(username);
})

var server = app.listen(3000, () => {
  console.log(`Server at http://localhost:${server.address().port}`);
});

