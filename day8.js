var express = require('express');
var app = express();
var http = require('http');
var _  = require('underscore')
var session = require("./session.js");
var fs = require('fs');


app.get('/day8.1', function (req, res) {
 
    var puzzle = 
		'--- Day 8: Matchsticks ---<br>\
        <br>\
Space on the sleigh is limited this year, and so Santa will be bringing his list as a digital copy. He needs to know how much space it will take up when stored.<br>\
<br>\
It is common in many programming languages to provide a way to escape special characters in strings. For example, C, JavaScript, Perl, Python, and even PHP handle special characters in very similar ways.<br>\
<br>\
However, it is important to realize the difference between the number of characters in the code representation of the string literal and the number of characters in the in-memory string itself.<br>\
<br>\
For example:<br>\
<br>\
\"\" is 2 characters of code (the two double quotes), but the string contains zero characters.<br>\
\"abc\" is 5 characters of code, but 3 characters in the string data.<br>\
\"aaa\\\"aaa\" is 10 characters of code, but the string itself contains six \"a\" characters and a single, escaped quote character, for a total of 7 characters in the string data.<br>\
\"\\x27\" is 6 characters of code, but the string itself contains just one - an apostrophe (\'), escaped using hexadecimal notation.<br>\
Santa\'s list is a file that contains many double-quoted string literals, one on each line. The only escape sequences used are \\\\ (which represents a single backslash), \\\" (which represents a lone double-quote character), and \\x plus two hexadecimal characters (which represents a single character with that ASCII code).<br>\
<br>\
Disregarding the whitespace in the file, what is the number of characters of code for string literals minus the number of characters in memory for the values of the strings in total for the entire file?<br>\
<br>\
For example, given the four strings above, the total number of characters of string code (2 + 5 + 10 + 6 = 23) minus the total number of characters in memory for string values (0 + 3 + 7 + 1 = 11) is 23 - 11 = 12.<br>\
';

    var options = {
        host : 'adventofcode.com',
        port: 80,
        path: '/day/8/input',
        headers: {'Cookie':'session=' + session.id()}
    };

    http.get( options, function(aocres) {
        var body = '';

        aocres.on('data', function(chunk){
            body += chunk;
        });

        aocres.on('end', function(){

            puzzle += '<br>';

            var input = body.split('\n');

            input.pop(); 

            var stringLiteralSize = _.reduce(input, function (memo, v) {
                    var vLength = _.reduce(v.split(''), function(splitMemo, splitV) {
                        return splitMemo + 1;
                    }, 0);
                    return memo + vLength;
                }, 0);

  
            var memLength = _.reduce(input, function (memo, v) {
                    return memo + v.replace(/\\(\\|"|x[0-f]{2})/g, '*').replace(/\"/g, '').length;
                }, 0);

            console.log( 'String Literal Size: ' + stringLiteralSize);

            console.log( 'Memory Size: ' + memLength);

            console.log( 'Diff: ' + (stringLiteralSize - memLength)); //1342

            res.send(puzzle);
        });

    })
    .on('error', function(e) {
        puzzle += e;
    });


});


app.get('/day8.2', function (req, res) {
 
    var puzzle = 
'--- Day 8: Matchsticks ---<br>\
<br>\
--- Part Two ---<br>\
<br>\
Now, let\'s go the other way. In addition to finding the number of characters of code, you should now encode each code representation as a new string and find the number of characters of the new encoded representation, including the surrounding double quotes.<br>\
<br>\
For example:<br>\
<br>\
\"\" encodes to \"\\\"\\\"\", an increase from 2 characters to 6.<br>\
\"abc\" encodes to \"\\\"abc\\\"\", an increase from 5 characters to 9.<br>\
\"aaa\\\"aaa\" encodes to \"\\\"aaa\\\\\\\"aaa\\\"\", an increase from 10 characters to 16.<br>\
\"\\x27\" encodes to \"\\\"\\\\x27\\\"\", an increase from 6 characters to 11.<br>\
Your task is to find the total number of characters to represent the newly encoded strings minus the number of characters of code in each original string literal. For example, for the strings above, the total encoded length (6 + 9 + 16 + 11 = 42) minus the characters in the original code representation (23, just like in the first part of this puzzle) is 42 - 23 = 19.<br>\
';

    var options = {
        host : 'adventofcode.com',
        port: 80,
        path: '/day/8/input',
        headers: {'Cookie':'session=' + session.id()}
    };

    http.get( options, function(aocres) {
        var body = '';

        aocres.on('data', function(chunk){
            body += chunk;
        });

        aocres.on('end', function(){

            puzzle += '<br>';

            var input = body.split('\n');

            input.pop(); 

            var stringLiteralSize = _.reduce(input, function (memo, v) {
                    var vLength = _.reduce(v.split(''), function(splitMemo, splitV) {
                        return splitMemo + 1;
                    }, 0);
                    return memo + vLength;
                }, 0);

  
            var escapedLiteralLength = _.reduce(input, function (memo, v) {
                    return memo + v.replace(/(\\|\")/g, '**').length+2;
                }, 0);

            console.log( 'String Literal Size: ' + stringLiteralSize);

            console.log( 'escapedLiteralLength: ' + escapedLiteralLength);

            console.log( 'Diff: ' + (escapedLiteralLength-stringLiteralSize )); //2074

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
