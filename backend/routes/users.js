var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');

let User = require('../models/user');
const session = require('express-session');


/* GET users listing. */

router.get('/homepage', (req, res) => {

  //   const id = session.userID;
  //   console.log(`USERID From /homepage is ${session.userID}`)
  //   User.findOne({id: id}, (err, docs) => {
  //     //console.log(docs._id)
  //     console.log(docs.username)
  //   })

})



router.post('/login', function (req, res, next) {

  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username: username }, (err, docs) => {
    if (err) {
      console.log('User not found')
      res.send(err.message)
    }
    console.log(docs)
    let hash = docs.password
    if (bcrypt.compareSync(password, hash)) {
      session.userID = docs._id
      session.isLoggedIn = true
      console.log(`USERID from /login is ${session.userID}`)
      res.json({
        confirmation: "login successful",
        isLoggedIn: true
      })
    } else {
      session.isLoggedIn = false
      res.json({
        confirmation: "login failed",
        isLoggedIn: false
      })
    }
  });

});




router.post('/register', (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const age = Number(req.body.age);
  const username = req.body.username;
  const password = bcrypt.hashSync(req.body.password, 10);


  //console.log(firstName)
  //console.log(password)
  const newUser = new User({
    firstName,
    lastName,
    age,
    username,
    password
  })


  User.find({ username: username }, (err, docs) => {
    if (docs.length > 0) {
      console.log('Name exists already', null);
    } else {
      newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    }
  });
});



module.exports = router;
