var express = require('express');
var app = express();
var port = process.env.port || 8082;
var router = express.Router();
//var User = require('./models/user');

var bodyParser = require('body-parser');
var r = require('rethinkdb');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

var usersRoute = router.route('/users');
usersRoute.get(function(req, res) {
    res.json({"message": "You are on CTBot page /users"});
})

app.use('/api', router);

app.listen(port);

console.log('Hello propaZzZzZzz....Listenning on port: ' + port);

