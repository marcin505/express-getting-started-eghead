var uri = 'mongodb+srv://marcin:H0Eza1vdu9GJwyH5@batcluster.xvblpv2.mongodb.net/egghead_users'
const _ = require('lodash');


const  mongoose = require('mongoose')
mongoose.connect(uri)

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function (callback) {
  console.log('db connected')
})

var userSchema = mongoose.Schema({
  username: String,
  gender: String,
  name: {
    title: String,
    first: String,
    last: String,
  },
  location: {
    street: String,
    city: String,
    state: String,
    zip: Number
  }
})

userSchema.virtual('name.full').get(function () {
  return _.startCase(this.name.first + ' ' + this.name.last);
});

userSchema.virtual('name.full').set(function (value) {
  var bits = value.split(' ');
  this.name.first = bits[0];
  this.name.last = bits[1];
});

exports.User = mongoose.model('Users', userSchema);
