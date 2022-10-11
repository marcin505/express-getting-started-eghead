const express = require('express')
const helpers = require('./helpers')
const fs = require('fs')

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
  const user = helpers.getUser(username)
  res.render('user', {
    user: user,
    address: user.location
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
  const username = req.params.username
  const user = helpers.getUser(username)
  user.location = req.body
  helpers.saveUser(username, user)
  res.end()
})

router.delete('/', function (req, res) {
  const fp = helpers.getUserFilePath(req.params.username)
  fs.unlinkSync(fp) // delete the file
  res.sendStatus(200)
})

module.exports = router
