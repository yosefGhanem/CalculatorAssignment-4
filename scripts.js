const display = document.querySelector('#display'),
    digits = document.querySelectorAll('.digit'),
    operators = document.querySelectorAll('.operator'),
    equals = document.querySelector('.equal'),
    clear = document.querySelector('.clear'),
    del = document.querySelector('.backspace'),
    decimal = document.querySelector('.decimal'),
    sign = document.querySelector('.sign'),
    percent = document.querySelector('.percent')


let firstNumber = '',
    currentExpression = '',
    secondNumber = '',
    operator = '',
    currentInput = '',
    outcome,
    isOutcome = false,
    wasCalculation = false



// Adding number to display

function addDigitToDisplay(digit) {
    if (currentInput.length >= 10) {
        alert("Number Limit Exceeded, max 10 digits");
        return;
    }

    if (wasCalculation && !operator) {
        clearScreen();
    }

    if (isOutcome) {
        currentExpression = outcome.toString();
        isOutcome = false;
    }

    display.textContent = '';
    currentInput += digit;
    currentExpression += digit;
    display.textContent = currentExpression;
}

digits.forEach(digit => {
    digit.addEventListener('click', (e) => {
        addDigitToDisplay(e.target.value)
    })
})

// Clearing screen

function clearScreen() {
    firstNumber = ''
    secondNumber = ''
    operator = ''
    outcome = null
    currentInput = ''
    currentExpression = ''
    display.textContent = '0'
    isOutcome = false
    wasCalculation = false
}

clear.addEventListener('click', clearScreen)

// Remove last digit

function delDigit() {
    if (currentInput.length === 1 && currentInput === '0') return

    currentInput = currentInput.slice(0, -1)
    display.textContent = currentInput

    if (currentInput.length === 0) {
        display.textContent = '0'
    }
}

del.addEventListener('click', delDigit)

// Add operator

function addOperator(sign) {

    if (currentInput.length === 0) {
        currentInput = '0';
    }

    if (operator !== '' && currentInput !== '') {
        calculation();
        currentExpression = outcome.toString();
        display.textContent = currentExpression;
    }

    operator = sign;

    if (!isOutcome) {
        firstNumber = currentInput;
        currentInput = '';
    } else {
        currentInput = '';
    }

    currentExpression += ` ${operator} `;
    display.textContent = currentExpression;

    isOutcome = false;
    }

operators.forEach(o => {
    o.addEventListener('click', (e) => {
        addOperator(e.target.value)
    })
})

// Add decimal

function addDecimalPoint() {
    if (currentInput !== '' && currentInput.includes('.')) return
    if (currentInput.length >= 10) return

    if (currentInput.length === 0) {
        currentInput += '0.'
        display.textContent = currentInput
        return
    }

    currentInput += "."
    display.textContent = currentInput

}

decimal.addEventListener('click', addDecimalPoint)

// Change sign 

function changeSign() {

    if (currentInput.charAt(0) === '-') {
        currentInput = currentInput.slice(1)
        display.textContent = currentInput

        return

    }

    if (currentInput.length === 0) {
        display.textContent = "0"
    }

    currentInput = "-" + currentInput
    display.textContent = currentInput

}

sign.addEventListener('click', changeSign)


// Change to percents

function changeToPercents() {
    if (currentInput.length === 0 && currentInput === '') return

    let inputLength = currentInput.length

    if (inputLength === 1) {
        currentInput = '0.0' + currentInput
    } else if (inputLength === 2) {
        currentInput = '0.' + currentInput
    } else {
        let currentInputArr = currentInput.split('')
        currentInputArr.splice(currentInput.length - 2, 0, '.')

        currentInput = currentInputArr.join('')
    }
    display.textContent = currentInput

}

percent.addEventListener('click', changeToPercents)


// Check for number length

function checkOutcomeLength(result) {
    if (result.toString().length > 10) {
        alert('This result is too long!')
        return true
    }
}

// Calculation functions

function addition(num1, num2) {
    outcome = num1 + num2

}

function subtraction(num1, num2) {
    outcome = num1 - num2

}

function divide(num1, num2) {
    outcome = num1 / num2

}

function multiply(num1, num2) {
    outcome = num1 * num2

}

// Getting the result

function calculation() {
    if (operator && currentInput.length === 0) return

    secondNumber = currentInput

    let firstNumberInt = parseFloat(firstNumber)
    let secondNumberInt = parseFloat(secondNumber)

    if (operator === '/' && secondNumberInt === 0) {
        alert('You cannot divide by 0')
        clearScreen()
        return
    }

    if (operator === '+') {
        addition(firstNumberInt, secondNumberInt)
    }

    if (operator === '-') {
        subtraction(firstNumberInt, secondNumberInt)
    }

    if (operator === '/') {
        divide(firstNumberInt, secondNumberInt)
    }

    if (operator === '*') {
        multiply(firstNumberInt, secondNumberInt)
    }

    if (outcome.toString().includes('.')) {
        outcome = outcome.toFixed(3)
    }

    let lengthCheck = checkOutcomeLength(outcome)

    if (lengthCheck) {
        clearScreen()
        return
    }
    wasCalculation = true
    operator = ''
    isOutcome = true
    firstNumber = outcome.toString()
    currentInput = outcome.toString()
    display.textContent = outcome.toString()
}

equals.addEventListener('click', calculation)

// Keyboard support

function keyboardSupport(key) {
    let pressedKey = key
    const operatorSigns = ['+', '-', '*', '/']
    const regExCheck = /^[0-9]+$/


    if (operatorSigns.includes(pressedKey)) {
        addOperator(pressedKey)
    }

    if (pressedKey.match(regExCheck)) {
        addDigitToDisplay(pressedKey)
    }

    if (pressedKey === "Backspace") {
        delDigit()
    }

    if (pressedKey === 'Delete') {
        clearScreen()
    }

    if (pressedKey === '.') {
        addDecimalPoint()
    }

    if (pressedKey === 'Enter' || pressedKey === '=') {
        calculation()
    }

    if (pressedKey === '%') {
        changeToPercents()
    }
}

window.addEventListener('keyup', (e) => {
    keyboardSupport(e.key)
})