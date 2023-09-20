// Variable Declarations
let firstOperand, secondOperand, operator;

// DOM Queries
const display = document.querySelector('#display');
const buttons = document.querySelectorAll(".btn");

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
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            break;
    }
};

const buttonCallback = function() {
    text = this.textContent;
    console.log(text)
}

// Main

// Add event listeners to the buttons
buttons.forEach(btn => btn.addEventListener('click', buttonCallback));