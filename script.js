// Variable Declarations
let firstOperand = '';
let operator = '';
let secondOperand = '';

// DOM Queries
const display = document.querySelector('#display');
const numberButtons = document.querySelectorAll('.number-btn');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('#clear');
const equalButton = document.querySelector('#equal');
const decimalButton = document.querySelector('#decimal');

// Functions
const add = function(a, b) {
	return a + b;
};

const subtract = function(a, b) {
	return a - b;
};

const multiply = function(a, b) {
  return a * b;
};

const divide = function(a, b) {
    if (b !== 0) {
        return a / b;
    }
    alert('Divide by zero! Microsoft just went down 3 points!')
};

const operate = function(operator, a, b) {
    // Apply operator to a and b. Ex: operate('-', a, b) = a - b;
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x':
            return multiply(a, b);
        case '÷':
            return divide(a, b);
        default:
            break;
    }
};

const convertToScientific = function(numStr) {
    const numDigitsAllowed = 3;
    return Number(numStr).toExponential(numDigitsAllowed);
}

const eightDigitLimiter = function(numStr) {

}

const updateDisplay = function(str) {
    // Only keep up to 8 digits and a decimal
    let processedStr = str;
    if (str) {
        const digits = str.match(/\d/g);
        if (digits && digits.length > 8) {
            processedStr = eightDigitLimiter(str);
        }
        if (processedStr.match(/\d/g).length > 8) alert('EIGHT DIGIT LIMITER RESULTED IN MORE THAN 8 DIGITS!');
    }
    display.textContent = processedStr;
}

const divideByZeroReset = function() {
    operator = '';
    secondOperand = '';
    updateDisplay(firstOperand);
}

const reset = function() {
    firstOperand = '';
    operator = '';
    secondOperand = '';
    updateDisplay(firstOperand);   
}

const numberButtonCallback = function() {
    const digit = this.textContent;
    if (firstOperand && operator) {
        secondOperand += digit;
        updateDisplay(secondOperand);
    } else {
        firstOperand += digit;
        updateDisplay(firstOperand);
    }
}

const operatorButtonCallback = function() {
    const newOperator = this.textContent;
    if (!firstOperand) return; // no operator allowed until we have at least one operand
    if (!secondOperand) {
        // No secondOperand supplied yet. Replace current operator.
        operator = newOperator;
    } else {
        // Carry out current operation and get ready to use the new operator on the result
        resultNum = operate(operator, Number(firstOperand), Number(secondOperand));
        if (resultNum === undefined) {
            divideByZeroReset();
        } else {
            firstOperand = resultNum.toString();
            operator = newOperator;
            secondOperand = '';
            updateDisplay(firstOperand);
        }
    }
};

const decimalButtonCallback = function() {
    if (!operator) {
        // Add to first operand
        if (!firstOperand.includes('.')) {
            firstOperand += (firstOperand) ? '.' : '0.';
            updateDisplay(firstOperand);
        }
    } else {
        // Add to second operand
        if (!secondOperand.includes('.')) {
            secondOperand += (secondOperand) ? '.' : '0.';
            updateDisplay(secondOperand);
        }
    }
}

const equalButtonCallback = function() {
    if (secondOperand) {
        // We have operation to carry out
        resultNum = operate(operator, Number(firstOperand), Number(secondOperand));
        if (resultNum === undefined) {
            divideByZeroReset();
        } else {
            firstOperand = resultNum.toString();
            operator = '';
            secondOperand = '';
            updateDisplay(firstOperand);
        }
    }
}

const clearButtonCallback = function() {
    // Reset to initial state
    reset();
}

///////////////////
// Main
///////////////////

// Add event listeners to the buttons with custom callbacks based on button type
numberButtons.forEach(btn => btn.addEventListener('click', numberButtonCallback));
operatorButtons.forEach(btn => btn.addEventListener('click', operatorButtonCallback));
decimalButton.addEventListener('click', decimalButtonCallback);
equalButton.addEventListener('click', equalButtonCallback);
clearButton.addEventListener('click', clearButtonCallback);
