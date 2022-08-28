const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://martingrajedajr:tooMANY1101101@bankingapp.1n7sbk1.mongodb.net/?retryWrites=true&w=majority';
let db = null;

MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client){
    console.log('connected successfully to db server');

    // database Name
    const dbName = 'badbank';
    db = client.db(dbName);  
    console.log(db);
});

// create user account
function create(name, email, password){
    return new Promise((resolve, reject) => {
        const collection = db.collection('users')
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err? reject(err) : resolve(doc);
        });
    }); 
     
};

// find single user
function find(email){
    //console.log('find function called')
    return new Promise((resolve, reject) => {
        const customers = db.collection('users')
        .find({email: email})
        .toArray(function(err, docs) {
            err? reject(err):resolve(docs);
        })
    })
};

// find user account
function findOne(email) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .findOne({ email: email })
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));
    })
};

// find all users
function all(){
    return new Promise((resolve, reject) => {
        const customers = db.collection('users').find({}).toArray(function(err, docs) {
            err? reject(err):resolve(docs);
        })
    })
}

// update - deposit/withdraw amount
function update(email, amount) {
    console.log('inside dal...amount:', amount)
    const amountNum = Number(amount);
    return new Promise((resolve, reject) => {
        const customers = db.collection('users')
            .findOneAndUpdate(
                { email: email },
                { $inc: {balance: amountNum} },
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );
    });
}

// delete user
function deleteOne(email) {
    return new Promise((resolve, reject) => {
        const customers = db.collection('users')
        .deleteOne(
            {"email": email},
            function(err, docs) {
                err? reject(err):resolve(docs);
            }
        )
    })
}

// add field to collection docs
function updateMany() {
    return new Promise((resolve, reject) => {
        const customers = db.collection('users')
        .updateMany(
            {},
            {$set: {message: "none"}},
            function(err, docs) {
                err? reject(err):resolve(docs);
            }
        )
    })
}

module.exports = {create, find, findOne, update, all, deleteOne, updateMany};