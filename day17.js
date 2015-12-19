var _  = require('underscore')
var fs = require('fs');

var input = fs.readFileSync('day17.txt', 'utf8');



var containers = input.split('\n');
containers = _.map ( containers, function(element) {
		return parseInt( element, 10);
	});


console.log( JSON.stringify(containers));

var permFunc = function( thisContainers, thisSum, totals, numContainers, context) {

		var subtotals = 0;

		if (thisSum  === 150) {
			if (context.hasOwnProperty(numContainers)) {
				context[numContainers].tally += 1;
			} else {
				context[numContainers] = {'tally':1};
			}
			subtotals += 1;			
		}

		_.each( thisContainers, function(element, index, list) {
			  subtotals += permFunc(thisContainers.slice(index + 1), element + thisSum, totals, numContainers + 1, context);
		});

	return subtotals;
};

var context = {};
console.log('part 1:' + permFunc( containers, 0, 0, 0, context)); //1638 
console.log('part 2:' + context[ Object.keys(context)[0] ].tally ); //17







