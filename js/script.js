const calculator = document.querySelector('.calculator');
const keys = document.querySelector('.calculator-keys');
const display = document.querySelector('.calculator-display');

keys.addEventListener('click', e => { //event listener on click taking argument 'e'
	//pure functions
	const resultString = createResultString

	const createResultString = () => {
			if (!action) {
				return displayedNum === '0' || //If displayed number is 0 replace it with number pressed
				previousKeyType === 'operator' || //or the user pressed an operator and then a number
				previousKeyType === 'calculate' //or if the user just pressed the equel button
				? keyContent // return the key pressed
				: displayedNum + keyContent //otherwise append number to number in display
				}
					calculator.dataset.previousKeyType = 'action';
		}
		// conditions for decimal button
		if (action === 'decimal') {
			if (!displayedNum.includes('.')) return = displayedNum + '.';
			if (previousKeyType === 'operator' && !displayedNum.includes('.') &&
				previousKeyType === 'calculate') return = '0.';
			return displayedNum;
			} 
			calculator.dataset.previousKeyType = 'decimal';
		} 

	//impure stuff
	display.textContent = resultString
	updateCalculatorState
	if (e.target.matches('button')) {  //if e is a button tag
		const key = e.target; //key pressed 
		const action = key.dataset.action; //data-action key has
		const keyContent = key.textContent; //What the key displays
		const displayedNum = display.textContent; //displayed number
		const previousKeyType = calculator.dataset.previousKeyType //saving what key was just pressed

		//calculate function			
		const calculate = (n1, operator, n2) => {
			const firstNum = parseFloat(n1);
			const secondNum = parseFloat(n2);
			if (operator === 'add')	return firstNum + secondNum;
			if (operator === 'subtract') return firstNum - secondNum;
			if (operator === 'multiply') return firstNum * secondNum;
			if (operator === 'divide') return firstNum / secondNum;
		}
		
		//conditions for operator buttons
		if ( 
			action === 'add' ||
			action === 'subtract' ||
			action === 'multiply' ||
			action === 'percentage' ||
			action === 'divide' 
		) {
			const secondValue = displayedNum;
			const firstValue = calculator.dataset.firstValue;
			const operator = calculator.dataset.operator;

			if (firstValue && 
				operator && 
				previousKeyType !=='operator' &&
				previousKeyType !=='calculate'
				) {
				const calcValue = calculate(firstValue, operator, secondValue);
				display.textContent = calcValue;
				calculator.dataset.firstValue = calcValue;
			} else {
				calculator.dataset.firstValue = displayedNum;
			}

			calculator.dataset.operator = action;
			calculator.dataset.previousKeyType = 'operator';
		} 

		// conditions for clear button
		if (action === 'all-clear') {
			display.textContent = '0';
			calculator.dataset.firstValue = '';
			calculator.dataset.modValue = '';
			calculator.dataset.operator = '';

			calculator.dataset.previousKeyType = '';
		} 
		// conditions for clear entry button
		if (action === 'clear-entry') {
			display.textContent = '0';
			calculator.dataset.previousKeyType = 'clear-entry';
		} 
		// conditions for equal button
		if (action === 'calculate') {
			let secondValue = displayedNum;
			let firstValue = calculator.dataset.firstValue;
			const operator = calculator.dataset.operator;
		
		//If there is a number saved to firstValue, i.e. not 0
		if (firstValue) {
			
			if (previousKeyType === 'calculate') {
				firstValue = displayedNum;
				secondValue = calculator.dataset.modValue;
			}

		display.textContent = calculate(firstValue, operator, secondValue);
		}	
		calculator.dataset.modValue = secondValue;
		calculator.dataset.previousKeyType = 'calculate';
		}

	}
});
