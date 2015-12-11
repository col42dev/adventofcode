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

              var input = body;

       

                var distances = {};

                input.trim().split('\n').forEach(item => {
                  var match = item.match(/^(\w+) to (\w+) = (\d+)/);
                  if (match) {
                    distances[match[1]] = distances[match[1]] || {};
                    distances[match[1]][match[2]] = parseInt(match[3]);
                    distances[match[2]] = distances[match[2]] || {};
                    distances[match[2]][match[1]] = parseInt(match[3]);
                  }
                });

                //console.log( JSON.stringify(distances, 0, 2));

                function permute(array) {
                  if (array.length > 1) {
                    var newArray = [];
                    array.forEach( (item, index) => {
                      permute(array.slice(0, index).concat(array.slice(index + 1))).forEach(newSubArray => {
                        newArray.push([item].concat(newSubArray));
                      });
                    });
                    return newArray;
                  } else {
                    return array;
                  }
                }

                //console.log( JSON.stringify( permute(Object.keys(distances)), 0, 2));

                var routes = permute(Object.keys(distances)).map(route => {
                  return route.reduce((memo, location) => {
                    return {
                      prevLoc: location,
                      totalDistance: memo.totalDistance + (memo.prevLoc ? distances[memo.prevLoc][location] : 0)
                    }
                  }, {prevLoc: null, totalDistance: 0}).totalDistance;
                });

                //console.log( JSON.stringify( routes, 0, 2));

                var shortestRoute = routes.reduce((memo, route) => route < memo ? route : memo, 999999999999999);
                var longestRoute = routes.reduce((memo, route) => route > memo ? route : memo, 0);

                console.log('Part 1:', shortestRoute);
                console.log('Part 2:', longestRoute);


/*
module.exports = (i, m='min') => {
    var _ = require('lodash')
    var z = i.map(i => i.match(/(\S+) to (\S+) = (\d+)/)).map(i => ({a: [i[1], i[2]], d: i[3]}))
    var x = require('js-combinatorics').permutation(_(z).map('a').flatten().uniq().value())
    return _[m](x.map(t => t.reduce((r, v) => ({p: v, d: r.p ? +_.find(z, {a: [r.p, v]}).d + r.d: 0}), {}).d))
}*/
       
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
