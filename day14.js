
var _  = require('underscore')
var fs = require('fs');



var input = fs.readFileSync('day14.txt', 'utf8');


//Vixen can fly 8 km/s for 8 seconds, but then must rest for 53 seconds.
//input = "Vixen can fly 8 km/s for 8 seconds, but then must rest for 8 seconds.";

var abilities = _.reduce( input.split('\n'), function( memo, value, index) {
		var match = value.match(/^(.*) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds\.$/)
		if (match) {
			memo[ match[1]] = {};
			memo[ match[1]]['kms'] = parseInt(match[2], 10);
			memo[ match[1]]['kmsDuration'] = parseInt(match[3], 10);
			memo[ match[1]]['restDuration'] = parseInt(match[4], 10);
			memo[ match[1]]['distanceTravelled'] = 0;
			memo[ match[1]]['points'] = 0;
		}
		return memo;
	}, {});


_(2503).times( function(n) {

	abilities = _.reduce( abilities, function(memo, value, index) {
			if ( n % (value['kmsDuration'] + value['restDuration']) < value['kmsDuration']) {
				value['distanceTravelled'] += value['kms'];
			}
			return memo;
		}, abilities);

	var currMaxTravalled = _.max(abilities, function(value) { return value['distanceTravelled']; })['distanceTravelled'];

	_.each( _.filter( abilities, function(value) { 
				return (value['distanceTravelled'] === currMaxTravalled); 
		}), function( element) {
			element['points'] += 1;
	});

});

//console.log( JSON.stringify(abilities, 0, 2));

console.log( 'max dist:' + _.max(abilities, function(value) { return value['distanceTravelled']; })['distanceTravelled']); //2655

console.log( 'points:' + _.max(abilities, function(value) { return value['points']; })['points']);  //1059





