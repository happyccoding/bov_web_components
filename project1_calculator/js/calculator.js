(function () {
    "use strict";
    var calculator = document.querySelector(".calculator-container");
    var resultscreen = document.querySelector(".result-screen");
    const operators = ['÷', 'x', '-', '+'];

    var result = "0";
    calculator.addEventListener("click", function (event) {
        updateResult(event.target.value);
        resultscreen.value = result;
    });

    function updateResult(value) {
        if (value === "C") {
            result = "0";
            return;
        } else if (value === "DEL") {
            if (result !== "0") {
                result = result.slice(0, -1);
            }
            return;
        } else if (value === "+/-") {
            if (result !== "0" && result[0] !== "-") {
                result = "-" + result;
            } else if (result[0] === '-') {
                result = result.slice(1);
            }
            return;
        } else if (value === "=") {
            result = result.replace("÷", "/");
            result = result.replace("x", "*");

            result = eval(result).toString();
        }
        else if (operators.indexOf(value) >= 0) {
            let lastChar = result.charAt(result.length - 1);
            if (operators.indexOf(lastChar) >= 0) {
                result = result.slice(0, -1) + value;
            } else if (result && result!=="0"){
                result += value;
            }
        }
        else {
            if (result === "0") {
                result = "";
            }
            result += value;
        }
    }
})();
