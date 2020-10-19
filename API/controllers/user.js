//import mongoose
const mongoose = require('mongoose');

//import product model
const User = require('../models/user');


//method to add new product
exports.addNewUser = ((req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const password = req.body.password;
    const status = req.body.status;

    const user = new User({ name: name, email: email, mobile: mobile, password: password, status: status });

    user.save()
        .then(result => {
            user.find().then(user => {
                res.status(201);
                res.send(user);
            })
                .catch(err => console.log(err));
        })
        .catch(err => {
            console.log(err)
        });
});

//method to add new product
exports.authenticateUser = ((req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    user.find(email).then(user => {
        if (user.password == password) {
            res.status(200);
            res.send(user);
        }
        else {
            res.status(404);
            res.send("user not registered");
        }
    })
        .catch(err => console.log(err));
});
