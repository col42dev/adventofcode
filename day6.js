var express = require('express');
var app = express();
var http = require('http');
var _  = require('underscore')
var session = require("./session.js");


app.get('/day6.1', function (req, res) {

    var puzzle = 
		'--- Day 6: Probably a Fire Hazard ---<br>\
        <br>\
        Because your neighbors keep defeating you in the holiday house decorating contest year after year, youve decided to deploy one million lights in a 1000x1000 grid.<br>\
        <br>\
        Furthermore, because youve been especially nice this year, Santa has mailed you instructions on how to display the ideal lighting configuration.<br>\
        <br>\
        Lights in your grid are numbered from 0 to 999 in each direction; the lights at each corner are at 0,0, 0,999, 999,999, and 999,0. The instructions include whether to turn on, turn off, or toggle various inclusive ranges given as coordinate pairs. Each coordinate pair represents opposite corners of a rectangle, inclusive; a coordinate pair like 0,0 through 2,2 therefore refers to 9 lights in a 3x3 square. The lights all start turned off.<br>\
        <br>\
        To defeat your neighbors this year, all you have to do is set up your lights by doing the instructions Santa sent you in order.<br>\
        <br>\
        For example:<br>\
        <br>\
        turn on 0,0 through 999,999 would turn on (or leave on) every light.<br>\
        toggle 0,0 through 999,0 would toggle the first line of 1000 lights, turning off the ones that were on, and turning on the ones that were off.<br>\
        turn off 499,499 through 500,500 would turn off (or leave off) the middle four lights.<br>\
        After following the instructions, how many lights are lit?<br>\
		<br>';

    var options = {
        host : 'adventofcode.com',
        port: 80,
        path: '/day/6/input',
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

            var tree = new Array(1000);
            for(xIndex = 0; xIndex < tree.length; xIndex++) {
                tree[xIndex] = Array.apply(null, Array(1000)).map(Number.prototype.valueOf,0);
            }

            input.forEach( function (line) {
                    //console.log(line);
                    var matched = /^(.*) (\d+),(\d+) .* (\d+),(\d+)$/.exec(line);
                    if (matched) {
                        var startX = parseInt(matched[2], 10);
                        var startY = parseInt(matched[3], 10);
                        var endX = parseInt(matched[4], 10) + 1;
                        var endY = parseInt(matched[5], 10) + 1;

                        try {
                            _.range(startX, endX).forEach( function(xValue, ix) {
                                _.range(startY, endY).forEach( function(yValue, iy) {
                                    switch( matched[1])
                                    {
                                        case 'turn on':
                                            tree[xValue][yValue] = 1;
                                            break;
                                        case 'turn off':
                                            tree[xValue][yValue] = 0;
                                            break;
                                        case 'toggle':
                                            tree[xValue][yValue] = 1 - tree[xValue][yValue];
                                            break;
                                        default:
                                            console.log('?: ' + matched[1]);
                                            break;
                                    }
                                });
                            });
                        } catch( message) {
                            console.log('err:' + line);
                        }
                    } else {
                        console.log('no match:' + line);
                    }
                });

            litCount = 0;
            tree.forEach( function( xValue, ix) {
                xValue.forEach( function( yValue, iy) {
                    litCount += tree[ix][iy] ;
                })
            });
            puzzle += 'Lit Count = ' + litCount + ' out of ' + input.length + ' commands.\n';
            console.log('Lit Count = ' + litCount + ' out of ' + input.length + ' commands.\n'); //569999


            res.send(puzzle);
        });

    })
    .on('error', function(e) {
        puzzle += e;
    });
});

app.get('/day6.2', function (req, res) {

    var puzzle = 
        '--- Part Two ---<br>\
<br>\
You just finish implementing your winning light pattern when you realize you mistranslated Santas message from Ancient Nordic Elvish.<br>\
<br>\
The light grid you bought actually has individual brightness controls; each light can have a brightness of zero or more. The lights all start at zero.<br>\
<br>\
The phrase turn on actually means that you should increase the brightness of those lights by 1.<br>\
<br>\
The phrase turn off actually means that you should decrease the brightness of those lights by 1, to a minimum of zero.<br>\
<br>\
The phrase toggle actually means that you should increase the brightness of those lights by 2.<br>\
<br>\
What is the total brightness of all lights combined after following Santas instructions?<br>\
<br>\
For example:<br>\
<br>\
turn on 0,0 through 0,0 would increase the total brightness by 1.<br>\
toggle 0,0 through 999,999 would increase the total brightness by 2000000.<br>\
        <br>';

    var options = {
        host : 'adventofcode.com',
        port: 80,
        path: '/day/6/input',
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

            var tree = new Array(1000);
            for(xIndex = 0; xIndex < tree.length; xIndex++) {
                tree[xIndex] = Array.apply(null, Array(1000)).map(Number.prototype.valueOf,0);
            }

            input.forEach( function (line) {
                    //console.log(line);
                    var matched = /^(.*) (\d+),(\d+) .* (\d+),(\d+)$/.exec(line);
                    if (matched) {
                        var startX = parseInt(matched[2], 10);
                        var startY = parseInt(matched[3], 10);
                        var endX = parseInt(matched[4], 10) + 1;
                        var endY = parseInt(matched[5], 10) + 1;

                        try {
                            _.range(startX, endX).forEach( function(xValue, ix) {
                                _.range(startY, endY).forEach( function(yValue, iy) {
                                    switch( matched[1])
                                    {
                                        case 'turn on':
                                            tree[xValue][yValue] += 1;
                                            break;
                                        case 'turn off':
                                            if (tree[xValue][yValue] > 0) { 
                                                tree[xValue][yValue] -= 1;
                                            }
                                            break;
                                        case 'toggle':
                                            tree[xValue][yValue]  += 2; 
                                            break;
                                        default:
                                            console.log('?: ' + matched[1]);
                                            break;
                                    }
                                });
                            });
                        } catch( message) {
                            console.log('err:' + line);
                        }
                    } else {
                        console.log('no match:' + line);
                    }
                });

            litCount = 0;
            tree.forEach( function( xValue, ix) {
                xValue.forEach( function( yValue, iy) {
                    litCount += tree[ix][iy];
                })
            });
            puzzle += 'Lit Count = ' + litCount + ' out of ' + input.length + ' commands.\n';
            console.log('Lit Count = ' + litCount + ' out of ' + input.length + ' commands.\n'); //569999


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
