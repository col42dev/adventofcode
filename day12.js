
var _  = require('underscore')
var fs = require('fs');


var input = JSON.parse(fs.readFileSync('day12.json', 'utf8'));

var sumJSON = function( thisObject, recurseSum) {

    return recurseSum + ( _.isArray(thisObject) || !_.contains(thisObject, 'red'))  
            ?  _.reduce( thisObject, function( memo, thisValue) {
                
                return memo + { 
                      'number' : function() { return thisValue;}, 
                      'object' : sumJSON,
                      'string' :  function() { return 0;}
                    }[typeof(thisValue)]( thisValue, recurseSum);
                }, 0)
            : 0;
        
};
 

 console.log('result: ' + sumJSON(input, 0)); //111754, 65402

       










