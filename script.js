const buttons = document.querySelectorAll('.button');
const input = document.querySelector('.input');
const clearButton = document.querySelector('.clear-button');
let answerDisplayed = false;

// Clear button event listener
clearButton.addEventListener('click', () => {
    input.value = '';
    answerDisplayed = false;
});

Array.from(buttons).forEach((button) => {
    button.addEventListener('click', (e) => {
        if (answerDisplayed) {
            // If an answer is displayed, clear the input field
            input.value = '';
            answerDisplayed = false;
        }

        const buttonText = e.target.textContent;
        if (buttonText === '=') {
            try {
                input.value = evaluateExpression(input.value);
                answerDisplayed = true; // Set the flag to true when the answer is displayed
            } catch (error) {
                input.value = 'Error';
                answerDisplayed = true; // Set the flag to true for errors too
            }
        } else if (buttonText === 'A/C') {
            input.value = '';
        } else {
            // Append the button's text to the input field
            input.value += buttonText;
        }
    });
});

function evaluateExpression(expression) {
    try {
        // Using the Function constructor to evaluate the expression as a JavaScript function
        const result = new Function('return ' + expression)();
        return result;
    } catch (error) {
        throw new Error("Invalid expression");
    }
}
