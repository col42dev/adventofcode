
var _  = require('underscore')
var fs = require('fs');



var input = fs.readFileSync('day15.txt', 'utf8');


//input = 'Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8\nCinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3';



var cookies = _.reduce( input.split('\n'), function ( memo, value, index) {

		var match = value.match(/(.*)\: (.*) (-?\d+)\, (.*) (-?\d+)\, (.*) (-?\d+)\, (.*) (-?\d+)\, (.*) (-?\d+)/);
		if (match) {
			var entry = [];
			//entry[ match[1] ] = {};
			entry.push( parseInt(match[3], 10));
			entry.push(  parseInt(match[5], 10));
			entry.push(  parseInt(match[7], 10));
			entry.push( parseInt(match[9], 10)); 
			entry.push(  parseInt(match[11], 10)); 

			memo.push(entry);
		}
		return memo;

}, []);

//console.log( JSON.stringify(cookies, 0, 2));


var permFunc = function( depth, branch, topTotal) {

	if ( _.reduce(branch, function(sum, el) {
  		return sum + el;
	}, 0) === 100) {

		if (500 === _.reduce( branch, function( memo, value, index, list) { return memo + value * cookies[index][4]}, 0)) {

			topTotal = Math.max(topTotal, _.reduce( _.range(0, cookies[0].length-1), function(tMemo, tValue, tIndex) {
				return tMemo * Math.max(0, _.reduce( branch, function( memo, value, index, list) { return memo + value * cookies[index][tIndex]}, 0));
			}, 1));		
		}
	}
	
	if (depth < cookies.length) {
		_.each( _.range(0, 101), function(element, index, list) {
				var appendBranch = branch.slice();
				appendBranch.push(index);
				topTotal = permFunc(depth+1, appendBranch, topTotal);
		});
	}

	return topTotal;
};


var topTotal = permFunc( 0, [], 0);



console.log('topTotal:' + topTotal); //pt1: 18965440, pt2: 15862900