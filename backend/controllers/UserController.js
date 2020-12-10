const User = require('../models/user')
const bcrypt = require('bcrypt');
const session = require('express-session');




module.exports = {
    registerUser(data) {
        return new Promise((resolve, reject) => {
            const firstName = data.firstName;
            const lastName = data.lastName;
            const age = Number(data.age);
            const username = data.username;
            const password = bcrypt.hashSync(data.password, 10);

            const newUser = new User({
                firstName,
                lastName,
                age,
                username,
                password
            });
            User.find({ username: username }, (err, docs) => {
                if (docs.length > 0) {
                    console.log('Name exists already', null);
                    resolve({ status: 500, message: "Name exists o" })
                } else {
                    newUser.save()
                        .then(() => resolve({ status: 200, message: "User inserted Successfully" }))
                        .catch(err => reject({ status: 500, message: "Error " + err }))
                }
            })
        })
    },
    loginUser(data) {
        return new Promise((resolve, reject) => {
            let username = data.username;
            let password = data.password;

            User.findOne({ username: username }, (err, docs) => {
                if (docs.length > 0) {
                    console.log("Found")
                    return;
                }

                if (!docs) {
                    console.log("Not found")
                }

                //console.log(docs)
                let hash = docs.password
                if (bcrypt.compareSync(password, hash)) {
                    session.userID = docs._id
                    session.isLoggedIn = true
                    console.log(`User ${session.userID} successfully logged in`)
                } else {
                    session.isLoggedIn = false
                    console.log(`${err}: Try Again`)
                }
                console.log(session.isLoggedIn)

            }).then(() => resolve({ status: 200, message: "Sent", isLoggedIn: session.isLoggedIn }))
            .catch(err => reject({ status: 500, message: "Error " + err }))
        })




    }
}


