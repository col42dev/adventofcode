var express = require('express');
var app = express();
var http = require('http');
var _  = require('underscore')
var session = require("./session.js");
var fs = require('fs');


app.get('/day9.1', function (req, res) {
 
    var puzzle = 
		'<br>\
        --- Day 9: All in a Single Night ---<br>\
        <br>\
        Every year, Santa manages to deliver all of his presents in a single night.<br>\
        <br>\
        This year, however, he has some new locations to visit; his elves have provided him the distances between every pair of locations. He can start and end at any two (different) locations he wants, but he must visit each location exactly once. What is the shortest distance he can travel to achieve this?<br>\
        <br>\
        For example, given the following distances:<br>\
        <br>\
        London to Dublin = 464<br>\
        London to Belfast = 518<br>\
        Dublin to Belfast = 141<br>\
        The possible routes are therefore:<br>\
        <br>\
        Dublin -> London -> Belfast = 982<br>\
        London -> Dublin -> Belfast = 605<br>\
        London -> Belfast -> Dublin = 659<br>\
        Dublin -> Belfast -> London = 659<br>\
        Belfast -> Dublin -> London = 605<br>\
        Belfast -> London -> Dublin = 982<br>\
        The shortest of these is London -> Dublin -> Belfast = 605, and so the answer is 605 in this example.<br>\
        <br>\
        What is the distance of the shortest route?<br>\
        <br>';

    var options = {
        host : 'adventofcode.com',
        port: 80,
        path: '/day/9/input',
        headers: {'Cookie':'session=' + session.id()}
    };

    http.get( options, function(aocres) {
        var body = '';

        aocres.on('data', function(chunk){
            body += chunk;
        });

        var dict = null;


        aocres.on('end', function(){

            puzzle += '<br>';

              var input = body.split('\n');

            input.pop(); 


             dict = _.reduce(input, function (memo, v) {
                    
                    if ( v.match(/(\S*) to (\S*) = (\d+)/)) {
                        if ( !memo.hasOwnProperty(RegExp.$1)){
                            memo[RegExp.$1] = {};
                        }

                        memo[RegExp.$1][RegExp.$2] = parseInt(RegExp.$3, 10);

                        if ( !memo.hasOwnProperty(RegExp.$2)){
                            memo[RegExp.$2] = {};
                        }
                        memo[RegExp.$2][RegExp.$1] = parseInt(RegExp.$3, 10);
                    }

                    return memo;
                }, {});

            console.log( JSON.stringify(dict, 0, 2));

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
