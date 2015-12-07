
var express = require('express');
var app = express();
var md5 = require('md5');
var http = require('http');
var session = require("./session.js");


app.get('/day2.1', function (req, res) {

	var puzzle = 
'The elves are running low on wrapping paper, and so they need to submit an order for more. They have a list of the dimensions (length l, width w, and height h) of each present, and only want to order exactly as much as they need.<br>\
<br>\
Fortunately, every present is a box (a perfect right rectangular prism), which makes calculating the required wrapping paper for each gift a little easier: find the surface area of the box, which is 2*l*w + 2*w*h + 2*h*l. The elves also need a little extra paper for each present: the area of the smallest side.<br>\
<br>\
For example:<br>\
<br>\
A present with dimensions 2x3x4 requires 2*6 + 2*12 + 2*8 = 52 square feet of wrapping paper plus 6 square feet of slack, for a total of 58 square feet.<br>\
A present with dimensions 1x1x10 requires 2*1 + 2*10 + 2*10 = 42 square feet of wrapping paper plus 1 square foot of slack, for a total of 43 square feet.<br>\
All numbers in the elves list are in feet. How many total square feet of wrapping paper should they order.<br>\
<br>';

	var options = {
		host : 'adventofcode.com',
		port: 80,
		path: '/day/2/input',
		headers: {'Cookie':'session=53616c7465645f5f5508dbbdd598bc6a68a9d0913491e09359e933a225f1ae7f111c6990ccf11273cca87deff0d2213f'}
	};

	http.get( options, function(aocres) {

		var body = '';

		aocres.on('data', function(chunk){
			body += chunk;
		});

		aocres.on('end', function(){

			var totalArea = 0;

			var measurements = body.split('\n');
			measurements.forEach( function(measurement) {

		
				var result = /(.*)x(.*)x(.*)/.exec(measurement);
				//puzzle += result;
				if (result != null) {
					var l = parseInt( result[1], 10);
					var w = parseInt( result[2], 10);
					var h = parseInt( result[3], 10);
					var area = 2*l*w + 2*w*h + 2*h*l;

					var smallestSideSize = 99999;
					if (l*w<smallestSideSize) {
						smallestSideSize = l*w;
					}
					if (w*h<smallestSideSize) {
						smallestSideSize = w*h;
					}
					if (h*l<smallestSideSize) {
						smallestSideSize = h*l;
					}
					area += smallestSideSize;
					totalArea += area;
				}
				
				
			});


			puzzle += '<br>';
			puzzle += 'totalArea:' + totalArea;

			res.send(puzzle);
		});

	})
	.on('error', function(e) {
		puzzle += e;
	});

});



app.get('/day2.2', function (req, res) {

	var puzzle = 
'--- Part Two ---<br>\
<br>\
The elves are also running low on ribbon. Ribbon is all the same width, so they only have to worry about the length they need to order, which they would again like to be exact.<br>\
<br>\
The ribbon required to wrap a present is the shortest distance around its sides, or the smallest perimeter of any one face. Each present also requires a bow made out of ribbon as well; the feet of ribbon required for the perfect bow is equal to the cubic feet of volume of the present. Dont ask how they tie the bow, though; theyll never tell.<br>\
<br>\
For example:<br>\
<br>\
A present with dimensions 2x3x4 requires 2+2+3+3 = 10 feet of ribbon to wrap the present plus 2*3*4 = 24 feet of ribbon for the bow, for a total of 34 feet.<br>\
A present with dimensions 1x1x10 requires 1+1+1+1 = 4 feet of ribbon to wrap the present plus 1*1*10 = 10 feet of ribbon for the bow, for a total of 14 feet.<br>\
How many total feet of ribbon should they order?<br>\
<br>';

	var options = {
		host : 'adventofcode.com',
		port: 80,
		path: '/day/2/input',
		headers: {'Cookie':'session='+session.id()}
	};

	http.get( options, function(aocres) {

		var body = '';

		aocres.on('data', function(chunk){
			body += chunk;
		});

		aocres.on('end', function(){
			var totalRibbonLength = 0;

			var measurements = body.split('\n');
			measurements.forEach( function(measurement) {
				var result = /(.*)x(.*)x(.*)/.exec(measurement);
				//puzzle += result;
				if (result != null) {
					var l = parseInt( result[1], 10);
					var w = parseInt( result[2], 10);
					var h = parseInt( result[3], 10);
					var area = 2*l*w + 2*w*h + 2*h*l;

					var sides = [l,w, h];
					sides.sort( function(a, b) {
						return a-b;
					});

					var ribbonLength = sides[0] * 2 + sides[1] * 2;
					ribbonLength += sides[0] * sides[1] * sides[2];
					totalRibbonLength += ribbonLength;
				}
			});

			puzzle += '<br>';
			puzzle += 'totalRibbonLength:' + totalRibbonLength;

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
