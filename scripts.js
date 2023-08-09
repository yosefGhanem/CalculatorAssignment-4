class Calculator {
    constructor(displayElementId) {
        this.display = document.getElementById(displayElementId);
        this.operationsButtons = document.querySelectorAll('.operator, .digit, .equal, .clear, .backspace, .percent, .digitzero, .sign');
        this.currentInput = '';
        this.attachButtonListeners();
    }

    attachButtonListeners() {
        this.operationsButtons.forEach(button => {
            button.addEventListener('click', () => this.handleButtonClick(button.textContent));
        });
    }

    handleButtonClick(buttonText) {
        if (buttonText === '=') {
            try {
                this.currentInput = this.currentInput.replace(/X/g, '*');
                const result = eval(this.currentInput);
                this.display.innerText = result;
                this.currentInput = result.toString();
            } catch (error) {
                this.display.innerText = 'Error';
            }
            if(this.currentInput === '=' && this.currentInput != "") {
                setTimeout(() => {
                    this.display.innerText = '';
                    this.currentInput = '';
                }, 2000);
            }
            
        } else if (buttonText === 'AC') {
            this.display.innerText = '';
            this.currentInput = '';
        } else if (buttonText === 'BACK') {
            this.currentInput = this.currentInput.slice(0, -1);
            this.display.innerText = this.currentInput;
        } else if (buttonText === '+/-') {
            if (this.currentInput !== '' && this.currentInput !== '=') {
                const num = parseFloat(this.currentInput);
                this.currentInput = (-num).toString();
                this.display.innerText = this.currentInput;
            }
        } else {
            if (this.currentInput === '=') {
                this.currentInput = '';
                this.display.innerText = '';
            } else if (this.currentInput.includes("=")) {
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
        }
    }
}

const basicCalc = new Calculator('display');
// Works perfectly