const express = require('express')
const helpers = require('./helpers')
const fs = require('fs')
const { User } = require('./db')

const router = express.Router({
  mergeParams: true
})

router.all('/', function (req, res, next) {
  console.log(req.method, 'for', req.params.username)
  next()
})

// router.get('/', helpers.verifyUser, function (req, res) {
router.get('/', function (req, res) {
  const username = req.params.username
  User.findOne({username}, function(err, user){
    res.render('user', {
      user: user,
      address: user.location
    })
  })
})

router.use(function name(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
})
 
router.get('/edit', function (req, res) {
  res.send('You want to edit ' + req.params.username + '???')
})

router.put('/', function (req, res) {
  const username = req.params.username;
  User.findOneAndUpdate({username}, {location: req.body}, function(err, user){
    res.end()
  })
})

router.delete('/', function (req, res) {
  const fp = helpers.getUserFilePath(req.params.username)
  fs.unlinkSync(fp) // delete the file
  res.sendStatus(200)
})

module.exports = router
