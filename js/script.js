const calculator = document.querySelector('.calculator');
const keys = document.querySelector('.calculator-keys');
const display = document.querySelector('.calculator-display');

keys.addEventListener('click', e => {
	if (e.target.matches('button')) {
		const key = e.target;
		const action = key.dataset.action;
		const keyContent = key.textContent;
		const displayedNum = display.textContent;
		const previousKeyType = calculator.dataset.previousKeyType

		//If displayed number is 0 replace it with number pressed,
		//if not, append number pressed to displayed number
		if (!action) {
			if (displayedNum === '0' || previousKeyType === 'operator') {
				display.textContent = keyContent;
				calculator.dataset.previousKeyType = 'action';
			} else {
				display.textContent = displayedNum + keyContent;
			}
		}
		if (
			action === 'add' ||
			action === 'subtract' ||
			action === 'multiply' ||
			action === 'percentage' ||
			action === 'divide' 
		) {
			calculator.dataset.firstValue = displayedNum;
			calculator.dataset.operator = action;
			calculator.dataset.previousKeyType = 'operator';
		} 
		if (action === 'decimal') {
			if (previousKeyType === 'operator' && !displayedNum.includes('.')) {
				display.textContent = '0.';
			} else if (!displayedNum.includes('.')) {
			display.textContent = displayedNum + '.';
			}
			calculator.dataset.previousKeyType = 'decimal';
		} 
		if (action === 'clear') {
			calculator.dataset.previousKeyType = 'clear';
		} 
		if (action === 'clear-entry') {
			calculator.dataset.previousKeyType = 'clear-entry';
		} 
		if (action === 'calculate') {
			const secondValue = displayedNum;
			const firstValue = calculator.dataset.firstValue;
			const operator = calculator.dataset.operator;

			//parsing string to floatnumbers and doing the operation
			const calculate = (n1, operator, n2) => {

				let result = ''

				if (operator === 'add') {
					result = parseFloat(n1) + parseFloat(n2);
				} else if (operator === 'subtract') {
					result = parseFloat(n1) - parseFloat(n2);
				} else if (operator === 'multiply') {
					result = parseFloat(n1) * parseFloat(n2);
				} else if (operator === 'divide') {
					result = parseFloat(n1) / parseFloat(n2);
				}

				return result;
				}

			display.textContent = calculate(firstValue, operator, secondValue);
			calculator.dataset.previousKeyType = 'calculate';

			
		}
	}


})
