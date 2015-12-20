var _  = require('underscore')
var fs = require('fs');

var input = fs.readFileSync('day19.txt', 'utf8');

var molecule = null;

var replacements = _.reduce( input.split('\n'), function ( memo, value, index) {

		var match = value.match(/(.*) => (.*)/);

		if ( match) {
			if (!memo.hasOwnProperty(match[1])) {
				memo[ match[1]] = [];
			}
			memo[ match[1]].push( match[2]);
		} else if (value.length) {
			molecule = value;
		}

		return memo;
}, {});


var transforms = [];
_.each( Object.keys(replacements), function (element, index, list) {
	var re = new RegExp(element, 'g');
	while ( match = re.exec(molecule)) {

		_.each( replacements[element], function (selement, sindex, slist) {
			var transformed = molecule.slice(0, match.index)  + selement + molecule.slice(match.index + element.length);
			if (transforms.indexOf(transformed) === -1) {
				transforms.push(res);
			}
		}, transforms);
	}
}, transforms);


console.log('count:'+transforms.length); //pt 1: 535

//console.log(transforms);


