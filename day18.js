var _  = require('underscore')
var fs = require('fs');

var input = fs.readFileSync('day18.txt', 'utf8');


var lights = _.reduce( input.split('\n'), function ( memo, value, index) {

		var row = _.reduce( value, function ( rmemo, rvalue, rindex) {
			rmemo['source'].push( (rvalue === '#') ? 1 : 0);
			rmemo['clone'].push( (rvalue === '#') ? 1 : 0);
			return rmemo;
		}, { 'source' : [], 'clone':[] });

		memo.push(row);

		return memo;
}, []);

//console.log( JSON.stringify(lights, 0, 2) );


_.times(100, function(n) { 



	lights[0]['source'][0] = 1;
	lights[0]['source'][99] = 1;
	lights[99]['source'][0] = 1;
	lights[99]['source'][99] = 1;


	_.each( lights, function( rowElement, rowIndex) {

		_.each( rowElement['source'], function( colElement, colIndex) {


			var onCount = 0;
			_.each( _.range( Math.max(rowIndex -1, 0), Math.min(rowIndex +2, 100)), function ( sRowElement, sRowIndex ) {
				_.each( _.range( Math.max(colIndex -1, 0), Math.min(colIndex +2, 100)), function ( sColElement, sColIndex ) {
					if (!((sRowElement == rowIndex) && (sColElement == colIndex))) {
						onCount += lights[sRowElement]['source'][sColElement];
					}
				});
			});

			if (rowElement['source'][colIndex]) {
				if (onCount < 2 || onCount > 3) {
					rowElement['clone'][colIndex] = 0;
				}
			} else {
				if (onCount === 3) {
					rowElement['clone'][colIndex] = 1;
				}
			}
		});
	});

	lights[0]['clone'][0] = 1;
	lights[0]['clone'][99] = 1;
	lights[99]['clone'][0] = 1;
	lights[99]['clone'][99] = 1;


	_.each( lights, function( rowElement, rowIndex) {
		rowElement['source'] = _.clone(rowElement['clone']);
	});

});


var lightCount = _.reduce( lights, function( memo, value, index) {
	
	return memo + _.reduce( value['source'], function( smemo, svalue, sindex) {
		return smemo + svalue;
	}, 0);

}, 0);

console.log( 'pt 1: ' + lightCount); //814
//pt2: 924

