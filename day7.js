var express = require('express');
var app = express();
var http = require('http');
var _  = require('underscore')
var session = require("./session.js");
var fs = require('fs');


app.get('/day7.1', function (req, res) {
 
    var puzzle = 
		'--- Day 7: Some Assembly Required ---<br>\
        <br>\
        This year, Santa brought little Bobby Tables a set of wires and bitwise logic gates! Unfortunately, little Bobby is a little under the recommended age range, and he needs help assembling the circuit.<br>\
        <br>\
        Each wire has an identifier (some lowercase letters) and can carry a 16-bit signal (a number from 0 to 65535). A signal is provided to each wire by a gate, another wire, or some specific value. Each wire can only get a signal from one source, but can provide its signal to multiple destinations. A gate provides no signal until all of its inputs have a signal.<br>\
        <br>\
        The included instructions booklet describe how to connect the parts together: x AND y -> z means to connect wires x and y to an AND gate, and then connect its output to wire z.<br>\
        <br>\
        For example:<br>\
        <br>\
        123 -> x means that the signal 123 is provided to wire x.<br>\
        x AND y -> z means that the bitwise AND of wire x and wire y is provided to wire z.<br>\
        p LSHIFT 2 -> q means that the value from wire p is left-shifted by 2 and then provided to wire q.<br>\
        NOT e -> f means that the bitwise complement of the value from wire e is provided to wire f.<br>\
        Other possible gates include OR (bitwise OR) and RSHIFT (right-shift). If, for some reason, youd like to emulate the circuit instead, almost all programming languages (for example, C, JavaScript, or Python) provide operators for these gates.<br>\
        <br>\
        For example, here is a simple circuit:<br>\
        <br>\
        123 -> x<br>\
        456 -> y<br>\
        x AND y -> d<br>\
        x OR y -> e<br>\
        x LSHIFT 2 -> f<br>\
        y RSHIFT 2 -> g<br>\
        NOT x -> h<br>\
        NOT y -> i<br>\
        After it is run, these are the signals on the wires:<br>\
        <br>\
        d: 72<br>\
        e: 507<br>\
        f: 492<br>\
        g: 114<br>\
        h: 65412<br>\
        i: 65079<br>\
        x: 123<br>\
        y: 456<br>\
        In little Bobbys kits instructions booklet (provided as your puzzle input), what signal is ultimately provided to wire a?<br>\
		<br>';

    var options = {
        host : 'adventofcode.com',
        port: 80,
        path: '/day/7/input',
        headers: {'Cookie':'session=' + session.id()}
    };
    var wires = {};

    http.get( options, function(aocres) {
        var body = '';

        aocres.on('data', function(chunk){
            body += chunk;
        });

        aocres.on('end', function(){

            puzzle += '<br>';

            var input = body.split('\n');

            input.pop(); // empty 




              var reducedinput = input.reduce(
                function (prev, current) {

                    // generate object for this instruction
                    current = _.object(['dest', 'b', 'op', 'a'], 
                            current.replace(/ /g, '')
                            .match(/(?:([a-z]+|\d+)?([A-Z]+))?([a-z]+|\d+)->([a-z]+)/)
                            .slice(1)
                            .reverse());

                    prev[current.dest] = current;
                    return prev;
                }, {});

                //console.log('reducedinput:' + JSON.stringify(reducedinput, 0 , 2));

                asmbl = function (map) {
                    while (_.filter(map, function (x) {
                      return _.isObject(x);
                    }).length) {
              
                      _.map(map, function (v) {
                        if (_.isObject(v) && !_.isObject(map[v.a]) && !_.isObject(map[v.b])) {

                          var a = map[v.a] === undefined ? v.a : map[v.a]
                            , b = map[v.b] === undefined ? v.b : map[v.b];

                          map[v.dest] = v.op === 'AND' ? a & b : (v.op === 'OR' ? a | b : (v.op === 'LSHIFT' ? a << b : (v.op === 'RSHIFT' ? a >> b : (v.op === 'NOT' ? 65535 - b : b))));
                        }
                      });
                    }
                    return map.a;
                  };

                var result = asmbl(_.clone(reducedinput));

                console.log( result );

                puzzle += result;


            res.send(puzzle);
        });

    })
    .on('error', function(e) {
        puzzle += e;
    });




});


app.get('/day7.2', function (req, res) {
 
    var puzzle = 
        '--- Part Two ---<br>\
<br>\
Now, take the signal you got on wire a, override wire b to that signal, and reset the other wires (including wire a). What new signal is ultimately provided to wire a?<br>\
        <br>';

    var options = {
        host : 'adventofcode.com',
        port: 80,
        path: '/day/7/input',
        headers: {'Cookie':'session=' + session.id()}
    };
    var wires = {};

    http.get( options, function(aocres) {
        var body = '';

        aocres.on('data', function(chunk){
            body += chunk;
        });

        aocres.on('end', function(){

            puzzle += '<br>';

            var input = body.split('\n');

            input.pop(); // empty 




              var reducedinput = input.reduce(
                function (prev, current) {

                    // generate object for this instruction
                    current = _.object(['dest', 'b', 'op', 'a'], 
                            current.replace(/ /g, '')
                            .match(/(?:([a-z]+|\d+)?([A-Z]+))?([a-z]+|\d+)->([a-z]+)/)
                            .slice(1)
                            .reverse());

                    prev[current.dest] = current;
                    return prev;
                }, {});

                //console.log('reducedinput:' + JSON.stringify(reducedinput, 0 , 2));

                asmbl = function (map) {
                    while (_.filter(map, function (x) {
                      return _.isObject(x);
                    }).length) {
              
                      _.map(map, function (v) {
                        if (_.isObject(v) && !_.isObject(map[v.a]) && !_.isObject(map[v.b])) {

                          var a = map[v.a] === undefined ? v.a : map[v.a]
                            , b = map[v.b] === undefined ? v.b : map[v.b];

                          map[v.dest] = v.op === 'AND' ? a & b : (v.op === 'OR' ? a | b : (v.op === 'LSHIFT' ? a << b : (v.op === 'RSHIFT' ? a >> b : (v.op === 'NOT' ? 65535 - b : b))));
                        }
                      });
                    }
                    return map.a;
                  };


                var workingMap = _.clone(reducedinput);
                workingMap.b = 16076;

                var result = asmbl(workingMap);

                console.log( result );

                puzzle += result;


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
