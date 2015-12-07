var express = require('express');
var app = express();
var http = require('http');
var _  = require('underscore')
var session = require("./session.js");

app.get('/day1.1', function (req, res) {

    var puzzle = 
		'--- Day 1: Not Quite Lisp ---<br>\
        <br>\
        Santa was hoping for a white Christmas, but his weather machines snow function is powered by stars, and hes fresh out! To save Christmas, he needs you to collect fifty stars by December 25th.<br>\
        <br>\
        Collect stars by helping Santa solve puzzles. Two puzzles will be made available on each day in the advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!<br>\
        <br>\
        Heres an easy puzzle to warm you up.<br>\
        <br>\
        Santa is trying to deliver presents in a large apartment building, but he cant find the right floor - the directions he got are a little confusing. He starts on the ground floor (floor 0) and then follows the instructions one character at a time.<br>\
        <br>\
        An opening parenthesis, (, means he should go up one floor, and a closing parenthesis, ), means he should go down one floor.<br>\
        <br>\
        The apartment building is very tall, and the basement is very deep; he will never find the top or bottom floors.<br>\
        <br>\
        For example:<br>\
        <br>\
        (()) and ()() both result in floor 0.<br>\
        ((( and (()(()( both result in floor 3.<br>\
        ))((((( also results in floor 3.<br>\
        ()) and ))( both result in floor -1 (the first basement level).<br>\
        ))) and )())()) both result in floor -3.<br>\
        To what floor do the instructions take Santa?<br>\
		<br>';

    var options = {
        host : 'adventofcode.com',
        port: 80,
        path: '/day/1/input',
        headers: {'Cookie':'session=' + session.id()}
    };

    http.get( options, function(aocres) {
        var body = '';

        aocres.on('data', function(chunk){
            body += chunk;
        });

        aocres.on('end', function(){
            puzzle += '<br>';

            var input = body;


            var finalFloor = (input.match(/\(/g) || []).length - (input.match(/\)/g) || []).length ;

          
            puzzle += 'Final Floor = ' + finalFloor+'\n';
            console.log('Final Floor = ' + finalFloor+'\n'); //232


            res.send(puzzle);
        });

    })
    .on('error', function(e) {
        puzzle += e;
    });
});

app.get('/day1.2', function (req, res) {

    var puzzle = 
        '--- Part Two ---<br>\
        <br>\
        Now, given the same instructions, find the position of the first character that causes him to enter the basement (floor -1). The first character in the instructions has position 1, the second character has position 2, and so on.<br>\
        <br>\
        For example:<br>\
        <br>\
        ) causes him to enter the basement at character position 1.<br>\
        ()()) causes him to enter the basement at character position 5.<br>\
        What is the position of the character that causes Santa to first enter the basement?<br>\
        <br>\
        <br>\
        <br>';

    var options = {
        host : 'adventofcode.com',
        port: 80,
        path: '/day/1/input',
        headers: {'Cookie':'session=' + session.id()}
    };

    http.get( options, function(aocres) {
        var body = '';

        aocres.on('data', function(chunk){
            body += chunk;
        });

        aocres.on('end', function(){
            puzzle += '<br>';

            var input = body;


            var basementIndex = _.findIndex(input, function (v) {
                console.log(this.floor );
              return -1 === (this.floor += +(v === '(') || -1);
            }, {floor: 0}) +1;

            puzzle += 'basement index  = ' + basementIndex+ ' out of ' + body.length + '\n';
            console.log('basement index  = ' + basementIndex+ ' out of ' + body.length + '\n'); //1783
  
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
