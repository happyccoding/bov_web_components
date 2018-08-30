var utilities = (function () {
    var utilities = {};

    utilities.by = function (list, n, callback) {
        for (let i = n - 1; i < list.length; i += n) {
            callback(list[i]);
        }

    };

    utilities.keys = function (object) {
        var results = [];
        for (let key in object) {
            results.push(key);
        }

        return results;
    };


    utilities.values = function (object) {
        var results = [];
        for (let key in object) {
            results.push(object[key]);
        }

        return results;
    };

    utilities.pairs = function (object) {
        var results = [];
        for (let key in object) {
            results.push(key);
            results.push(object[key]);
        }

        return results;
    };

    utilities.shuffle = function (array) {

        var tmpArray = array.slice();
        var results = [];
        while (tmpArray.length > 0) {
            let rnd = _getRandom(tmpArray.length);
            results.push(tmpArray[rnd]);
            tmpArray.splice(rnd, 1);
        }

        return results;
    };


    utilities.pluralize = function (n, word, pluralWord) {

        if (pluralWord) return pluralWord;

        if (n === 1) return word;

        return word + 's';
    };


    utilities.toDash = function (str) {
        var chars = str.split('');

        return chars.map(function (value) {
            if (value.toUpperCase() === value) {
                return '-' + value.toLowerCase();
            }
            return value;
        }).join('');

        return result;
    };

    utilities.toCamel = function (str) {
        var chars = str.split('-');

        return chars.map(function (value, index) {
            if (index === 0) return value;
            return value.charAt(0).toUpperCase() + value.substr(1);
        }).join('');

    };


    utilities.has = function (obj, search) {
        var ret = false;

        obj.forEach(function (value) {
            if (value === search) {
                ret = true;
            }
        });


        return ret;
    };

    utilities.pick = function (obj, keys) {
        var results = {};
        for (let key in obj) {
            if (keys.indexOf(key) >= 0) {
                results[key] = obj[key];
            }
        }

        return results;
    };



    const NUM_ALPHA_SPACE = "abcdefghijklmnopqrstuvwxyz1234567890 ";

    utilities.withoutSymbols = function (input) {
        var chars = input.split('');

        return chars.map(function (value) {
            if (NUM_ALPHA_SPACE.indexOf(value.toLowerCase()) >= 0) {
                return value;
            }
        }).join('');
    };


    utilities.countWords = function (input) {

        var words = input.split(/\s+/);

        return words.length;
    };    

    return utilities;

    function _isArray(arr) {
        return Object.prototype.toString.call(arr) === '[object Array]';
    }

    function _isFunc(fn) {
        return (typeof fn === 'function');
    }

    function _isString(str) {
        return (typeof str === 'string');
    }

    function _isNumber(num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    }

    function _isInt(num) {
        return u.isNumber(num) && (parseFloat(num) === parseInt(num, 10));
    }

    function _getRandom(max) {
        return parseInt(Math.random() * max, 10);
    }

})();

// var log = function (val, index, list) {
//     console.log(val);
// };

// utilities.by([1, 2, 3, 4, 5, 6], 2, log);

// console.log(utilities.keys({ count: 5, length: 10, total: 16 }));

// console.log(utilities.values({ count: 5, length: 10, total: 16 }));

// console.log(utilities.pairs({ count: 5, length: 10, total: 16 }));

// var arr = [1,2,3,4,5];
// console.log(utilities.shuffle(arr)); 

//console.log(utilities.pluralize(2, "lioness", "lionesses"));

//console.log(utilities.toDash("hotDogMilk"));

//console.log(utilities.toCamel("hot-dog-milk"));

//console.log(utilities.has([1,2,3,4,5], 0));

// var data = {

//     type: "transformer",

//     index: 19,

//     siblings: 19,

//     access: "full"

// };

// console.log(utilities.pick(data, ["type", "index"]));  

// console.log(utilities.withoutSymbols("Hi, john.doe@live.com., is that you?/"));

console.log(utilities.countWords("this is a   constructor this  is  not abd"));