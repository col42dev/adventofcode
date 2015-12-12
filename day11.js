var _  = require('underscore');

var input = 'hxbxwxba'.split('');

while ( (function(input) {

    // verify
    if (!/[i|o|l]/.test(input.join(''))) {

        var straight = (function(input) {
            var str = input.join('');
            var index = 0;
            while ( index < str.length - 2) {
                if ( str.charCodeAt(index) ===str.charCodeAt(index+1)-1 && str.charCodeAt(index+1) === str.charCodeAt(index+2)-1) {
                    return true;
                }
                index ++;
            }
            return false;
        })(input);

        var pairs =  ( _.uniq( input.join('').match(/(.)\1{1}/g) ).length >= 2) ? true : false;
        if (straight && pairs) {
            console.log('result:'+input.join('')); //hxbxxyzz, hxcaabcc
            return false;
        }
    }
    return true;

})(input)) {

    // increment
    (function( input){

        var incrementIndex = 7;
        do  {
            do {
                input[incrementIndex] = String.fromCharCode(input[incrementIndex].charCodeAt(0) + 1);
            } while (/[i|o|l]/.test(input.join('')))

            if (input[incrementIndex] === '{') {
                input[incrementIndex] = 'a';
                incrementIndex --;
            } else {
                break;
            }
        } while (true)

    })(input);


}
 













