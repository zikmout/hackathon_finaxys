var fs = require('fs');
var prompt = require('prompt');
var erisC = require('eris-contracts');
var erisdbURL = "http://localhost:1337/rpc";
var contractData = require('./jobs_output.json');
var tbotContractAddress = contractData["deploytbot"];
var tbotAbi = JSON.parse(fs.readFileSync("./abi/" + tbotContractAddress));

/*
	accountData = 	{
					  "address": "3F51FB1CC6AFE8670EC3262052383151C16C3B55",
					  "pubKey": "7069043541A214859D77CF6CFB5395F75693E2E60928FBAF6B41C776B7D276B8",
					  "privKey": "B5303FEA152D0C62010520BC2F327CC045729D50A42EEBFB23EA6BD6F6BC14A17069043541A214859D77CF6CFB5395F75693E2E60928FBAF6B41C776B7D276B8"
					}
*/

var execTbot = exports.execTbot = function (accountData) {
	var contractManager = erisC.newContractManagerDev(erisdbURL, accountData);
	var tbotContract = contractManager.newContractFactory(tbotAbi).at(tbotContractAddress);

	tbotContract.whoami(function(err, info){
		if (err) console.log(err);
		else console.log(info);
	});
}
