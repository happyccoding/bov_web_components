var validator = (function (window) {
    var validator = {};

    const NUM_ALPHA = "abcdefghijklmnopqrstuvwxyz1234567890";


    //1
    validator.isEmailAddress = function (input) {
        if (!input) return false;
        var arrEmail = input.split("@");
        //check it has 3 parts
        if (arrEmail.length >= 2) {
            return true;
        }

        return false;
    };

    //2
    validator.isPhoneNumber = function (input) {
        if (!input) return false;

        phoneNumber = input.replace(/[\s\-\(\)\+]/g, "");

        //check starting with 0, and minimum length
        if (phoneNumber.charAt(0) === "0" && phoneNumber.length >= 10) {
            return _isNumeric(phoneNumber);
        }
        return false;
    };

    //3
    validator.isDate = function (input) {
        if (!input) return false;

        var date = new Date(input);

        return !isNaN(date.getDate());
    };

    //4
    validator.isBeforeDate = function (input, reference) {
        var date1 = new Date(input);
        var date2 = new Date(reference);

        if (!this.isDate(date1)) throw "Invalid Date";
        if (!this.isDate(date2)) throw "Invalid Date";

        return date1 < date2;
    };

    //5
    validator.isAfterDate = function (input, reference) {
        var date1 = new Date(input);
        var date2 = new Date(reference);

        if (!this.isDate(date1)) throw "Invalid Date";
        if (!this.isDate(date2)) throw "Invalid Date";

        return date1 > date2;
    };

    //6
    validator.isBeforeToday = function (input) {
        return this.isBeforeDate(input, _toYYYYMMDD(new Date()));
    };

    //7
    validator.isAfterToday = function (input) {
        return this.isAfterDate(input, _toYYYYMMDD(new Date()));
    };

    //8 
    validator.isEmpty = function (input) {
        if (!input) return true;

        if (!input.trim()) return true;


        return false;
    };

    //9 
    validator.isTrimmed = function (input) {
        return input.trim().length === input.length && input.indexOf("  ") === -1
    };

    //10
    validator.contains = function (input, words) {

        if (!_isArray(words)) return false;

        input = input.toLowerCase().split('');
        var listInput = input.map(function (value) {
            return validator.isAlphanumeric(value) ? value : ' '
        });

        listInput = listInput.join('').split(' ');

        for (i = 0; i < words.length; i++) {
            if (listInput.indexOf(words[i].toLowerCase()) > -1) {
                return true;
            }
        }

        return false;
    };


    //11
    validator.lacks = function (input, words) {

        if (!_isArray(words)) return false;

        input = input.toLowerCase().split('');
        var listInput = input.map(function (value) {
            return validator.isAlphanumeric(value) ? value : ' '
        });

        listInput = listInput.join('').split(' ');


        return words.reduce(function (prevValue, currValue) {
            return listInput.indexOf(currValue.toLowerCase()) > -1 ? false : true;
        }, false);
    };


    //12
    validator.isComposedOf = function (input, strings) {

        if (!_isArray(strings)) return false;

        var arrInput = input.toLowerCase().replace(/[^\w ]/, '').split('');
        var string = strings.join('').toLowerCase().replace(/[^\w ]/, '').split('').join(' ');

        var isLack = !validator.lacks(string, arrInput);
        input = input.toLowerCase();
        return strings.reduce(function (prevValue, currValue) {
            return input.indexOf(currValue.toLowerCase()) > -1 ? isLack && true : isLack && false;
        }, false);
    };

    //13
    validator.isOfLengthOrLessThan = function (input, n) {
        return input.length <= n;
    };


    //14
    validator.isOfLengthOrGreaterThan = function (input, n) {
        return input.length >= n;
    };

    //15
    validator.lessWordsThan = function (input, n) {
        if (!input || !n) throw "Missing Parameter.";

        var arrWord = input.split(" ");
        return arrWord.length <= n ? true : false;
    }

    //16
    validator.moreWordsThan = function (input, n) {
        if (!input || !n) throw "Missing Parameter.";

        var arrWord = input.split(" ");
        return arrWord.length >= n ? true : false;
    }

    //17
    validator.isNumberBetween = function(input, floor, ceil) {
        if (!input || !floor || !ceil) throw "Missing Parameter";
        return (input >= floor && input <= ceil) ? true : false;
      }



    //18
    validator.isAlphanumeric = function (input) {
        if (!input) return false;

        var input = input.toLowerCase();
        for (i = 0; i < input.length; i++) {
            for (k = 0; k < NUM_ALPHA.length; k++) {
                if (NUM_ALPHA.indexOf(input.charAt(i)) == -1) return false;
            }
        }
        return true;
    };

    //19 
    validator.isCreditCard = function(input) {
        if (!input) return false;
        let arrInput = input.split('-');
        var cntPart = arrInput.reduce(function(prevValue, currValue){
           return validator.isAlphanumeric(currValue) ? prevValue + 1: 0
        }, 0);

       if (cntPart === 4) return true;
       
       if (input.length == 16 && validator.isAlphanumeric(input)) {
           return true;
       }

       return false;
    }

    //20
    validator.isHex = function (input) {

        if (!input) return false;

        var len = input.length;
        var chars = input.substr(1).split('');
        var that = this;

        if (input.charAt(0) !== '#') return false;
        if (len !== 4 && len !== 7) return false;

        return chars.reduce(function(prevValue, currValue) {
            var hex1 = _isBetween(currValue, 'a', 'f');
            var hex2 = _isBetween(currValue, '0', '9');
            return (hex1 || hex2) ? prevValue : false;
        }, true);

    };

    //21
    validator.isRGB = function (input) {

        if (!input) return false;

        var sanitize = input.split('rgb(').join('').split(')').join('');
        var values   = sanitize.split(',');

        if (values.length !== 3) return false;

        return values.reduce(function(prevValue, currValue) {
            return (_isBetween(currValue.trim(), '0', '255')) ? prevValue : false;
        }, true);
    };  
    
    //22
    validator.isHSL = function (input) {

        if (!input) return false;

        var sanitize = input.split('hsl(').join('').split(')').join('');
        var values   = sanitize.split(',');

        if (values.length !== 3) return false;
        if (!(_isBetween(values[0].trim(), '0', '360'))) return false;
        if (!(_isBetween(values[1].trim(), '0', '1'))) return false;
        if (!(_isBetween(values[2].trim(), '0', '1'))) return false;

        return true;
    }; 

    //23
    validator.isColor = function (input) {

        if (!input) return false;

        return validator.isHex(input) || validator.isRGB(input) || validator.isHSL(input);
    };    


    var _isArray = Array.isArray || function (arr) {

        return Object.prototype.toString.call(arr) === '[object Array]';

    };

    return validator;

    //util functions
    function _isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function _toYYYYMMDD(date) {
        return date.toISOString().slice(0, 10);
    }

    function _removeSpecial(input) {
        return input.replace(/[^\w ]/, '');
    }

    function _isBetween(input, floor, ceil) {
        return (input >= floor && input <= ceil);
    }
})(window);
