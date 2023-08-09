
const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

buttons.forEach(button =>{
    button.addEventListener('click', () => {
        
        if(button.textContent === '='){
            try {
                //display.value
            } catch (error) {
                display.innerText = 'Error';
            }
        }else if(button.textContent === 'AC'){
            display.innerText = null;
        }else if(button.textContent === 'BACK'){
            display.innerText = display.innerText.slice(0, -1); //To remove when pressing BACK
        }else{
            display.innerText += button.textContent;
        }

    });
});