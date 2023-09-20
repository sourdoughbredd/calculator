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

const updateDisplay = function(str) {

}

const numberButtonCallback = function() {
    
}

const operatorButtonCallback = function() {

}

const decimalButtonCallback = function() {

}

const equalButtonCallback = function() {
    
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
