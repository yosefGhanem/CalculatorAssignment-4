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
    secondNumber = '',
    operator = '',
    currentInput = '',
    outcome,
    isOutcome = false


// Adding number to display

function addDigitToDisplay(digit) {
    if (currentInput.length >= 10) {
        alert("Number Limit Exceeded, max 10 digits")
        return
    }
    display.textContent = ''
    currentInput += digit.value
    display.textContent = currentInput
}

digits.forEach(digit => {
    digit.addEventListener('click', (e) => {
        addDigitToDisplay(e.target)
    })
})

// Clearing screen

function clearScreen() {
    firstNumber = ''
    secondNumber = ''
    operator = ''
    outcome = null
    currentInput = ''
    display.textContent = '0'
    isOutcome = false
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

    if (currentInput.length === 0) return

    operator = ''
    operator = sign.value

    if (!isOutcome) {
        firstNumber = currentInput
        currentInput = ''
    } else {
        currentInput = ''
    }


}

operators.forEach(o => {
    o.addEventListener('click', (e) => {
        addOperator(e.target)
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


// Calculation

function checkOutcomeLength(result) {
    if (result.toString().length > 10) {
        alert('This result is too long!')
        return true
    }
}

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



function calculation() {
    secondNumber = currentInput

    let firstNumberInt = parseFloat(firstNumber)
    let secondNumberInt = parseFloat(secondNumber)


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

    isOutcome = true
    firstNumber = outcome.toString()
    currentInput = outcome.toString()
    display.textContent = outcome.toString()
}

equals.addEventListener('click', calculation)