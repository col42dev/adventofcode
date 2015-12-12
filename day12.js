var _  = require('underscore');

        var countRepeats = function( sequence, repeats) {
            var myregex = new RegExp("\^\(\.\)\\1\{"+repeats+"\}");
            if ( sequence.match(myregex)) {
                return countRepeats(sequence, repeats+1);
            } else {
                return repeats-1;
            }
        };

        var countAndSay = function( sequence) {
            return _.reduce( sequence.split(''), function(memo, thisChar, index) {
                var thisoutput = '';
                if ( this.lastChar !== thisChar) {
                    thisoutput += (countRepeats(sequence.slice(index), 1)+1)+thisChar;
                }
                this.lastChar = thisChar;

                return memo + thisoutput;
            }, '', {lastChar:''});
        };

        var output = _.reduce(_.range(50), function(memo) {
            return countAndSay(memo);
        }, '1321131112');
 

console.log( 'length:'+output.length); 

//40: 492982
//50: 6989950












