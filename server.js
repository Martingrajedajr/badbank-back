const express = require('express');
const app = express();
const cors = require('cors');
const dal = require('./dal.js');
const path = require("path");


// used to serve static files
app.use(express.static('public'));
app.use(cors());


// create user account
app.get('/account/create/:name/:email/:password', function(req, res) {
        // check if account exists
        dal.find(req.params.email).
        then((users) => {
            console.log('users:', JSON.stringify(users));

            // if user exists, return error message
            if(users.length > 0){
                console.log('You have already created an account.  Please Log In.');
                res.send({message: "You already created an account.  Please Log In."});    
            }
            else{
             // else create user
            dal.create(req.params.name,req.params.email,req.params.password)
                .then((user) => {
                    console.log(user);
                    res.send(user);            
                });            
            }
        });     
});


// login user
app.get('/account/login/:email/:password', function (req, res) {
    dal.findOne(req.params.email).then(user => {
            console.log("inside app.get", JSON.stringify(user));
            console.log(JSON.stringify(user).length)
            // if user exists, check password
            if(JSON.stringify(user).length > 4){
                //console.log('user length greater than 0')
                //console.log(user.password);
                if (user.password === req.params.password){
                    //console.log('user password matches')
                    res.send(JSON.stringify(user));
                }
                else{
                    //console.log('password does not match')
                    res.send("Incorrect password.  Please try again.");
                }
            }
            else{
                //console.log('user not found')
                res.send("Username not found.  Please try again or create a new account.");
            }
            //console.log('outside of if');
            // res.send(user);
    });
});

// find user account
app.get('/account/find/:email', function (req, res) {
    dal.find(req.params.email).then(user => {
        console.log(user);
        res.send(user);
    })
});

// find one user by email - alternative to find
app.get('/account/findOne/:email', function (req, res) {
    dal.findOne(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

// find all accounts
app.get('/account/all', function (req, res) {
    dal.all().then(docs => {
        console.log(docs);
        res.send(docs);
    });
});

// update - deposit/withdraw amount
app.get('/account/update/:email/:amount', function (req, res) {
    let amount = Number(req.params.amount);
    console.log("inside index...amount: ", amount)

    dal.update(req.params.email, amount)
        .then((response) => {
            console.log(response);
            res.send(response);
    });    
}); 

// update - deposit/withdraw amount
app.get('/account/update/:email/:amount/:message', function (req, res) {
    let amount = Number(req.params.amount);
    console.log("inside index...amount: ", amount)

    dal.transfer(req.params.email, amount, req.params.message)
        .then((response) => {
            console.log(response);
            res.send(response);
    });    
}); 

// get balance
app.get('/account/balance/:name/:email/:amount', function(req, res) {
    
    dal.deposit(req.params.name, req.params.email, req.params.amount)
        .then((user) => {
        console.log(user);
        res.send(user);
        });
});

// update balance
app.get('/account/balance/update/:email', function(req, res) {
    dal.update(req.params.email).then(user => {
        console.log(user);
        res.send(user);
    })
});

// delete user
app.get('/account/delete/:email', function(req, res) {
    dal.deleteOne(req.params.email).then(user => {
        console.log(user);
        res.send(user);
    })
})

const port = process.env.PORT || 8080;
app.listen(port, () => {
console.log(`Listening on http:localhost: ${port}`);
});