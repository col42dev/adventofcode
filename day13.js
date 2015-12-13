
var _  = require('underscore')
var fs = require('fs');



var input = fs.readFileSync('day13.txt', 'utf8');
var hu = {};

input.trim().split('\n').forEach(item => {
  var match = item.match(/^(\w+) would (lose|gain) (\d+) happiness units by sitting next to (\w+)\./);
  if (match) {
  	var amount = (match[2] === 'gain') ? parseInt(match[3]) : -parseInt(match[3]);

    hu[match[1]] 			= hu[match[1]] || {};
    hu[match[1]][match[4]] 	= amount;

  }
});


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


var permutates = permute(Object.keys(hu))
    .map(
    	permutation => 
    		{
              return permutation.reduce((memo, location) => {
                return {
                  prevLoc: location,
                  totalDistance: memo.totalDistance + (memo.prevLoc ? (hu[memo.prevLoc][location] + hu[location][memo.prevLoc]) : 0)
                }
            	}, {prevLoc: permutation[permutation.length-1], totalDistance: 0})
              .totalDistance;
});
var optiomalHappinesUnits = permutates.reduce((memo, permutation) => permutation > memo ? permutation : memo, 0);
console.log( 'pt 1:' + optiomalHappinesUnits); //pt1: 733


var permutates = permute(Object.keys(hu))
    .map(
    	permutation => 
    		{
              return permutation.reduce((memo, location) => {
                return {
                  prevLoc: location,
                  totalDistance: memo.totalDistance + (memo.prevLoc ? (hu[memo.prevLoc][location] + hu[location][memo.prevLoc]) : 0)
                }
            	}, {prevLoc: 0, totalDistance: 0})
              .totalDistance;
});
var optiomalHappinesUnits = permutates.reduce((memo, permutation) => permutation > memo ? permutation : memo, 0);
console.log( 'pt 2:' + optiomalHappinesUnits); //pt 2: 725





