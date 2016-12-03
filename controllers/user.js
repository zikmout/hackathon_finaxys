//var User = require('./../models/user');

r = require('rethinkdb');

var connection = null;
r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
    if (err) throw err;
    connection = conn;
})

exports.readUsers = function (req, res) {
        r.db('test').table('user').run(connection, function (err, info) {
            if (err) res.send({"message": "Error while creating new user"});
            else
                cursor.toArray(function (err, result) {
                    res.send({"message": "Ok, user successfully created"});
                })
        })
    }