var _  = require('underscore')
var fs = require('fs');

var input = fs.readFileSync('day21.txt', 'utf8');


var enemy = _.reduce( input.split('\n'), function (memo, element, index) {

//console.log(element);
	var match = element.match(/(.*)\: (\d+)/);
	if (match) {
		memo[ match[1]] = parseInt( match[2], 10);
	}

	return memo;

}, {});



var player  = {'Hit Points' : 100, 'Damage' : 1, 'Armor' : 0};


while ( true) {
	enemy['Hit Points'] -= Math.max(1, player['Damage'] - enemy['Armor']);
	console.log('enemy: ' +JSON.stringify(enemy));
	if (enemy['Hit Points'] <= 0) {
		process.exit();
	}

	player['Hit Points'] -= Math.max(1, enemy['Damage'] - player['Armor']);
	console.log('player: '+ JSON.stringify(player));
	if (player['Hit Points'] <= 0) {
		process.exit();
	}
}