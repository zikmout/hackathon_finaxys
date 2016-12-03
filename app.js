var express = require('express');
var app = express();
var port = process.env.port || 8082;
var router = express.Router();
//var User = require('./models/user');

var bodyParser = require('body-parser');
var r = require('rethinkdb');

var usersController = require('./controllers/user');

app.use('/', express.static(__dirname + '/'));

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

router.route('/users')
    .get(usersController.readUsers);
/*
usersRoute.get(function(req, res) {
    res.json({"message": "You are on CTBot page /users"});
})*/

app.use('/api', router);

app.listen(port);

console.log('Hello propaZzZzZzz....Listenning on port: ' + port);

