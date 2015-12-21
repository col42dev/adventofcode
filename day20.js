var _  = require('underscore')


var puzzleInput = 34000000;

function getFactors(integer){
  var factors = [],
  quotient = 0;

  for(var i = 1; i <= integer; i++){
    quotient = integer/i;

    if(quotient === Math.floor(quotient)){
      factors.push(i); 
    }
  }
  return factors;
}


var part1 = function () {
	var sumTotal = 0;
	var houseNumber = 780000;
	while ( sumTotal < puzzleInput)  {
		houseNumber ++;
		sumTotal = 10 * _.reduce( getFactors(houseNumber), 
							function (memo, value) {
								return memo + value;
							}, 0);
	};

	console.log('part 1: house no:' + houseNumber + ', total:' + sumTotal); 
}

part1(); //786240


var part2 = function () {

	var sumTotal = 0;
	var houseNumber = 830000;
	while (sumTotal < puzzleInput) {
		houseNumber ++;
		sumTotal = 11 * _.reduce( 
							_.filter( getFactors(houseNumber), function(num){
								if (num * 50 >= houseNumber) {
									return true;
								}
								return false;
							}), 
							function (memo, value) {
								return memo + value;
							},0);

	}

	console.log('part 2: house no:' + houseNumber + ', total:' + sumTotal); 


}

part2(); //831600

