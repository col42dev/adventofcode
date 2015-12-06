var express = require('express');
var app = express();
var md5 = require('md5');
var http = require('http');
var _  = require('underscore')


app.get('/day4.2', function (req, res) {

	var puzzle = 
	'<br>\
	--- Day 4: The Ideal Stocking Stuffer ---<br>\
	<br>\
	Santa needs help mining some AdventCoins (very similar to bitcoins) to use as gifts for all the economically forward-thinking little girls and boys.\
	<br>\
	To do this, he needs to find MD5 hashes which, in hexadecimal, start with at least five zeroes. The input to the MD5 hash is some secret key (your puzzle input, given below) followed by a number in decimal. To mine AdventCoins, you must find Santa the lowest positive number (no leading zeroes: 1, 2, 3, ...) that produces such a hash.<br>\
	<br>\
	For example:<br>\
	<br>\
	If your secret key is abcdef, the answer is 609043, because the MD5 hash of abcdef609043 starts with five zeroes (000001dbbfa...), and it is the lowest such number to do so.<br>\
	If your secret key is pqrstuv, the lowest number it combines with to make an MD5 hash starting with five zeroes is 1048970; that is, the MD5 hash of pqrstuv1048970 looks like 000006136ef....<br>\
	<br>\
	<br>\
	Your puzzle input is yzbqklnj<br>\
	<br>\
	Answer:<br>\
	';

  	var puzzleInput = 'yzbqklnj';

	for (var lowest = 1; lowest < 9999999; lowest ++) {
		var hash = md5(puzzleInput + lowest);
		var matched = hash.match(/^000000/);
		if (matched) {
			console.log('lowest = ' +  lowest);
			puzzle += lowest;
			break;
		}
	}
  	res.send(puzzle);
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});