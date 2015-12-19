
var _  = require('underscore')
var fs = require('fs');



var input = fs.readFileSync('day16.txt', 'utf8');


var auntSue = { 'children': 3, 'cats': 7, 'samoyeds': 2, 'pomeranians': 3, 'akitas': 0, 'vizslas': 0, 'goldfish': 5, 'trees': 3, 'cars': 2, 'perfumes': 1};


var aunts = _.reduce( input.split('\n'), function ( memo, value, index) {

		var match = value.match(/Sue (\d+)\: (.*)\: (\d+)\, (.*)\: (\d+)\, (.*)\: (\d+)/);
		if (match) {
			var entry = {};

			entry[ match[2]] = parseInt(match[3], 10);
 			entry[ match[4]] = parseInt(match[5], 10);
 			entry[ match[6]] = parseInt(match[7], 10);
 

			memo[ match[1]  ] = entry;
		}
		return memo;

}, {});


//console.log( JSON.stringify(aunts, 0, 2));


//pt 1
_.each( aunts, function(value, key, list) {
	if ( _.isMatch(auntSue, value) ) {
		console.log('match:' + key + ', ' + JSON.stringify(value)); //pt 1: 373
	}
});


//pt 2
_.each( aunts, function(value, key, list) {

	var match = true;
	_.each( value, function(svalue, skey, slist) {
		if (Object.keys(auntSue).indexOf(skey) !== -1) {
			switch (skey) {
				case 'cats':
				case 'trees':
					if ( auntSue[skey] >= svalue) {
						match = false;	
					}
					break;
				case 'pomeranians':
				case 'goldfish':
					if ( auntSue[skey] <= svalue) {
						match = false;	
					}
					break;
				default:
					if ( auntSue[skey] !== svalue) {
						match = false;	
					}
					break;
			}
		}
	});
	if (match) {
			console.log('match:' + key + ', ' + JSON.stringify(value)); 
	}
});
