//var User = require('./../models/user');

var r = require('rethinkdb');
var tbot = require('../.eris/apps/tbot/executetbot.js');

var connection = null;
r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
    if (err) throw err;
    connection = conn;
})

exports.readUsers = function (req, res) {
        r.db('test').table('user').run(connection, function (err, info) {
            if (err) res.send({"message": "Error while reading new user"});
            else {
			        console.log('toto', info);
                    res.send({"message": "Ok, user successfully read"});
                }
	//		cursor.toArray(function (err, result) {
           })
        }

exports.createUsers = function (req, res) {
        console.log(req.body);
        r.db('test').table('user').insert([req.body]).run(connection, function (err, info) {
            if (err) res.send({"message": "Error while creating new user"})
            else {
                console.log('user created ===>', req.body);
                res.send({"message": "User successfully created !"});
            }
        })
}
