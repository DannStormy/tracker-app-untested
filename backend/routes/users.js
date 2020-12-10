var express = require('express');
var router = express.Router();

const { registerUser, loginUser, } = require('../controllers/UserController');

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
  loginUser(req.body).then((data) => {
    res.status(data.status).send({ message: data })
  }).catch((err) => {
    res.status(data.status).send({ message: err.message })
  });
});

router.post('/register', (req, res) => {
  registerUser(req.body).then((data) => {
    res.status(data.status).send({ message: data })
  }).catch((err) => {
    res.status(data.status).send({ message: err.message })
  });
});



module.exports = router;
