var express = require('express');
var app = express();
var http = require('http');
var _  = require('underscore')



app.get('/day5.1', function (req, res) {

    var puzzle = 
		'--- Day 5: Doesnt He Have Intern-Elves For This? ---<br>\
		<br>\
		Santa needs help figuring out which strings in his text file are naughty or nice.<br>\
		<br>\
		A nice string is one with all of the following properties:<br>\
		<br>\
		It contains at least three vowels (aeiou only), like aei, xazegov, or aeiouaeiouaeiou.<br>\
		It contains at least one letter that appears twice in a row, like xx, abcdde (dd), or aabbccdd (aa, bb, cc, or dd).<br>\
		It does not contain the strings ab, cd, pq, or xy, even if they are part of one of the other requirements.<br>\
		For example:<br>\
		<br>\
		ugknbfddgicrmopn is nice because it has at least three vowels (u...i...o...), a double letter (...dd...), and none of the disallowed substrings.<br>\
		aaa is nice because it has at least three vowels and a double letter, even though the letters used by different rules overlap.<br>\
		jchzalrnumimnmhp is naughty because it has no double letter.<br>\
		haegwjzuvuyypxyu is naughty because it contains the string xy.<br>\
		dvszwmarrgswjxmb is naughty because it contains only one vowel.<br>\
		How many strings are nice?<br>\
		<br>';

    var options = {
        host : 'adventofcode.com',
        port: 80,
        path: '/day/5/input',
        headers: {'Cookie':'session=53616c7465645f5f5508dbbdd598bc6a68a9d0913491e09359e933a225f1ae7f111c6990ccf11273cca87deff0d2213f'}
    };

    http.get( options, function(aocres) {
        var body = '';

        aocres.on('data', function(chunk){
            body += chunk;
        });

        aocres.on('end', function(){
            puzzle += '<br>';

            var input = body.split('\n');
            var niceStringCount = _.reduce(input, function (memo, v) {
                    return memo + ((/(.)\1/.test(v) && /([aeiou].*){3}/.test(v) && !/ab|cd|pq|xy/.test(v)) ? 1 : 0);
                }, 0);
            puzzle += "nice string count = " + niceStringCount;  // 255
            console.log("nice string count = " + niceStringCount);
            res.send(puzzle);
        });

    })
    .on('error', function(e) {
        puzzle += e;
    });
});


app.get('/day5.2', function (req, res) {

    var puzzle = 
		'--- Part Two ---<br>\
		<br>\
		Realizing the error of his ways, Santa has switched to a better model of determining whether a string is naughty or nice. None of the old rules apply, as they are all clearly ridiculous.<br>\
		<br>\
		Now, a nice string is one with all of the following properties:<br>\
		<br>\
		It contains a pair of any two letters that appears at least twice in the string without overlapping, like xyxy (xy) or aabcdefgaa (aa), but not like aaa (aa, but it overlaps).<br>\
		It contains at least one letter which repeats with exactly one letter between them, like xyx, abcdefeghi (efe), or even aaa.<br>\
		For example:<br>\
		<br>\
		qjhvhtzxzqqjkmpb is nice because is has a pair that appears twice (qj) and a letter that repeats with exactly one letter between them (zxz).<br>\
		xxyxx is nice because it has a pair that appears twice and a letter that repeats with one between, even though the letters used by each rule overlap.<br>\
		uurcxstgmygtbstg is naughty because it has a pair (tg) but no repeat with a single letter between them.<br>\
		ieodomkazucvgmuy is naughty because it has a repeating letter with one between (odo), but no pair that appears twice.<br>\
		How many strings are nice under these new rules?<br>\
		<br>';

 var options = {
        host : 'adventofcode.com',
        port: 80,
        path: '/day/5/input',
        headers: {'Cookie':'session=53616c7465645f5f5508dbbdd598bc6a68a9d0913491e09359e933a225f1ae7f111c6990ccf11273cca87deff0d2213f'}
    };

    http.get( options, function(aocres) {
        var body = '';

        aocres.on('data', function(chunk){
            body += chunk;
        });

        aocres.on('end', function(){
            puzzle += '<br>';

            var input = body.split('\n');
            var niceStringCount  = _.reduce(input, function (memo, v) {
                    return memo + ((v.match(/(..).*\1/g) && v.match(/(.).\1/) !== null) ? 1 : 0);
                }, 0);

            puzzle += "nice string count = " + niceStringCount + " out of " + input.length;  //answer: 55
            console.log("nice string count = " + niceStringCount);
            res.send(puzzle);
        });
    })
    .on('error', function(e) {
        puzzle += e;
    });

});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});