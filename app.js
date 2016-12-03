var express = require('express');
var app = express();
var port = process.env.port || 8082;
var router = express.Router();
//var User = require('./models/user');

//eris requirements
var fs = require('fs');
var prompt = require('prompt');
var erisC = require('eris-contracts');
var erisdbURL = "http://localhost:1337/rpc";
var contractData = require('./.eris/apps/tbot/jobs_output.json');
var tbotContractAddress = contractData["deploytbot"];
var tbotAbi = JSON.parse(fs.readFileSync("./.eris/apps/tbot/abi/" + tbotContractAddress));

var tbot = require('./.eris/apps/tbot/executetbot.js');
//var accountData =   {
//                                          "address": "3F51FB1CC6AFE8670EC3262052383151C16C3B55",
//                                          "pubKey": "7069043541A214859D77CF6CFB5395F75693E2E60928FBAF6B41C776B7D276B8",
//                                          "privKey": "B5303FEA152D0C62010520BC2F327CC045729D50A42EEBFB23EA6BD6F6BC14A17069043541A214859D77CF6CFB5395F75693E2E60928FBAF6B41C776B7D276B8"
                  //                      }
//tbot.execTbot(accountData, erisdbURL, tbotAbi, tbotContractAddress, erisC);

var bodyParser = require('body-parser');
var r = require('rethinkdb');
var connection = null;
r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
    if (err) throw err;
    connection = conn;
});


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
app.post('/check', function (req, res) {
	r.db('test').table('user').filter({email: req.body.email}).run(connection, function (err, cursor) {
            if (err) res.send({"message": "Error while reading new user"});
            else {
			cursor.toArray(function (err, result){
				if (err) res.send({"Message": "err cursor"});
				else {
					//console.log(result, result[0].address, result[0].pubKey);
					var accountData = { "address": result[0].address, "pubKey": result[0].pubKey, "privKey": req.body.privKey };
  					tbot.execTbot(accountData, erisdbURL, tbotAbi, tbotContractAddress, erisC);
					res.send(JSON.stringify(accountData, null, 2));
				}
			});
                           //     console.log('toto', info);
                  //  res.send({"message": "Ok, user successfully read"});
                }
        //              cursor.toArray(function (err, result) {
           });
});

/*
app.use(bodyParser.urlencoded({
    extended: true
}));*/

router.route('/users')
    .post(usersController.createUsers);
   // .get(usersController.readUsers)
/*
usersRoute.get(function(req, res) {
    res.json({"message": "You are on CTBot page /users"});
})*/

app.use('/api', router);

app.listen(port);

console.log('Hello propaZzZzZzz....Listenning on port: ' + port);

