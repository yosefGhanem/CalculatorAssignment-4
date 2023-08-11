class Calculator {
    constructor(displayElementId) {
        this.display = document.getElementById(displayElementId);
        this.operationsButtons = document.querySelectorAll('.operator, .digit, .equal, .clear, .backspace, .percent, .digitzero, .sign, .decimal');
        this.currentInput = '';
        this.attachButtonListeners();
        this.attachKeyboardListeners();
    }

    attachButtonListeners() {
        this.operationsButtons.forEach(button => {
            button.addEventListener('click', () => this.handleButtonClick(button.textContent));
        });
    }

    attachKeyboardListeners() {
        window.addEventListener('keydown', event => {
            let key = event.key;
            if (key.match(/[0-9]|\.|[+\-*/%=]|Enter|Backspace/)) {
                event.preventDefault();
                if (key === 'Enter') {
                    key = '=';
                }
                if (key === 'Backspace/') {
                    key = 'BACK';
                }
                const button = document.querySelector(`[value="${key}"]`);
                if (button) {
                    button.click();
                }
            }
        });
    }

    handleButtonClick(buttonText) {
        if (this.currentInput.length >= 10) {
            // Do not allow further input if the limit is reached
            this.display.innerText = '';
            this.currentInput = '';
            alert("Number Limit Exceeded")
        }
        else if (buttonText === '=') {
            try {
                this.currentInput = this.currentInput.replace(/X/g, '*'); //replace string with * for eval
                const result = eval(this.currentInput); //evaluates expression
                if (result === Infinity || result === -Infinity) {
                    this.display.innerText = 'Infinity';
                    setTimeout(() => {
                        this.display.innerText = '';
                        this.currentInput = '';
                    }, 2000); // Clear infinity
                } else if (!isNaN(result)) {
                    const roundedResult = this.roundToMaxDecimals(result, 6);// Adjust to 6 maximum decimal places
                    this.display.innerText = roundedResult;
                    this.currentInput = roundedResult.toString();
                }
            }
            catch (error) {
                this.display.innerText = 'Error';
                setTimeout(() => {
                    this.display.innerText = '';
                    this.currentInput = '';
                }, 2000); // Clear error
            }
        }
        else if (buttonText === 'AC') {
            this.display.innerText = '';
            this.currentInput = '';
        }
        else if (buttonText === 'BACK') {
            this.currentInput = this.currentInput.slice(0, -1);
            this.display.innerText = this.currentInput;
        }
        else if (buttonText === '+/-') {
            if (this.currentInput !== '' && this.currentInput !== '=') {
                const num = parseFloat(this.currentInput);
                this.currentInput = (-num).toString();//convert to - / + and vice versa
                this.display.innerText = this.currentInput;
            }
        }
        else if (buttonText === '.') {
            if (!this.currentInput.includes('.')) {
                this.currentInput += buttonText;
                this.display.innerText = this.currentInput;
            }
            document.querySelector('.decimal').classList.add('disabled');//disable . once used
        }
        else {
            if (this.currentInput === '=') {
                this.currentInput = '';
                this.display.innerText = '';
            } else if (this.currentInput.includes('=')) {
                this.currentInput = buttonText;
                this.display.innerText = buttonText;
            } else {
                if (buttonText === 'X') {
                    this.currentInput += '*';
                } else if (buttonText === '/') {
                    this.currentInput += '/';
                } else if (buttonText === '%') {
                    this.currentInput += '%';
                } else {
                    this.currentInput += buttonText;
                }
                this.display.innerText = this.currentInput;
            }
            // Re-enable the decimal button if necessary
            if (!this.currentInput.includes('.')) {
                document.querySelector('.decimal').classList.remove('disabled');
            }
        }
    }

    roundToMaxDecimals(value, maxDecimals) {
        return parseFloat(value.toFixed(maxDecimals));
    }
}

const basicCalc = new Calculator('display');