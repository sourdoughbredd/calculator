// Variable Declarations
let firstOperand = '';
let operator = '';
let secondOperand = '';
let operation = '';

// DOM Queries
const mainDisplay = document.querySelector('#main-display');
const operationDisplay = document.querySelector('#operation-display');
const numberButtons = document.querySelectorAll('.number-btn');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('#clear');
const equalButton = document.querySelector('#equal');
const decimalButton = document.querySelector('#decimal');
const backspaceButton = document.querySelector('#backspace');

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

const getScientificNotation = function(numStr) {
    digitLimit = 3;
    return Number(numStr).toExponential(digitLimit);
}

const nDigitLimiter = function(numStr, n) {
    if (numStr.includes('e')) {
        // Our string is in scientific notation. Make sure it obeys digit limit.
        return getScientificNotation(numStr);
    }
    numDigits = numStr.match(/\d/g).length;
    // Less than n digits total
    if (numDigits <= n) return numStr;
    const [leftOfDecimal, rightOfDecimal] = numStr.split('.');
    // n digits to left of decimal
    if (leftOfDecimal.length === n) return Math.round(Number(numStr)).toString();
    // More than n digits to left of decimal
    if (leftOfDecimal.length > n) return getScientificNotation(numStr);
    // Less than n digits to left of decimal
    const targetNumToRight = n - leftOfDecimal.length;
    const newRight = Number('0.' + rightOfDecimal)
                    .toFixed(targetNumToRight)
                    .toString()
    return (Number(leftOfDecimal) + Number(newRight)).toString();
}

const updateDisplay = function(main, operation) {
    // process main display number
    let processedMain = main;
    const digits = main.match(/\d/g);
    if (digits && digits.length > 8) {
        processedMain = nDigitLimiter(main, 8);
    }
    mainDisplay.textContent = processedMain;

    // process operation display number
    console.log(operation);
    if (operation) {
        let tokens = operation.split(' ');
        if (tokens[0]) tokens[0] = nDigitLimiter(tokens[0], 6);
        if (tokens[2]) tokens[2] = nDigitLimiter(tokens[2], 6);
        operationDisplay.textContent = tokens.join(' ');
    } else {
        operationDisplay.textContent = operation;
    }
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
    operation = '';
    updateDisplay('', '');   
}

const numberButtonCallback = function() {
    const digit = this.textContent;
    if (firstOperand && operator) {
        secondOperand += digit;
        operation = firstOperand + ' ' + operator;
        updateDisplay(secondOperand, operation);
    } else {
        firstOperand += digit;
        operation = firstOperand;
        updateDisplay(firstOperand, operation);
    }
}

const operatorButtonCallback = function() {
    const newOperator = this.textContent;
    if (!firstOperand) return; // no operator allowed until we have at least one operand
    if (!secondOperand) {
        // No secondOperand supplied yet. Replace current operator.
        operator = newOperator;
        operation = firstOperand + ' ' + operator;
        updateDisplay('', operation)
    } else {
        // Carry out current operation and get ready to use the new operator on the result
        resultNum = operate(operator, Number(firstOperand), Number(secondOperand));
        if (resultNum === undefined) {
            divideByZeroReset();
        } else {
            firstOperand = resultNum.toString();
            operator = newOperator;
            secondOperand = '';
            operation = firstOperand + ' ' + operator;
            updateDisplay('', operation);
        }
    }
};

const decimalButtonCallback = function() {
    if (!operator) {
        // Add to first operand
        if (!firstOperand.includes('.')) {
            firstOperand += (firstOperand) ? '.' : '0.';
            operation = firstOperand;
            updateDisplay(firstOperand, operation);
        }
    } else {
        // Add to second operand
        if (!secondOperand.includes('.')) {
            secondOperand += (secondOperand) ? '.' : '0.';
            updateDisplay(secondOperand, operation);
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
            operation += ' ' + secondOperand +  ' =';
            firstOperand = resultNum.toString();
            operator = '';
            secondOperand = '';
            updateDisplay(firstOperand, operation);
        }
    }
}

const clearButtonCallback = function() {
    // Reset to initial state
    reset();
}

const backspaceButtonCallback = function() {
    if (firstOperand && operator === '') {
        firstOperand = firstOperand.slice(0,-1)
        operation = firstOperand;
        updateDisplay(firstOperand, operation);
    } else if (secondOperand){ 
        secondOperand = secondOperand.slice(0, -1);
        updateDisplay(secondOperand, operation); 
    }
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
backspaceButton.addEventListener('click', backspaceButtonCallback)
