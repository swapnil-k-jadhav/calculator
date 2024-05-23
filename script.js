let displayValue = '';

            function clearDisplay() {
                document.getElementById('display').value = '';
            }
            
            function appendToDisplay(value) {
                const display = document.getElementById('display');
                const currentValue = display.value;

                // Check if the input is a valid number, operator, or decimal point
                if (isValidInput(value, currentValue)) {
                    // Replace the last operator if a new operator is clicked
                    if (isOperator(value) && isOperator(currentValue.slice(-1))) {
                        display.value = currentValue.slice(0, -1) + value;
                    } else {
                      display.value += value;
                    }
                }
            }

            
            function isValidInput(char, currentValue) {
              // Prevent operators as the first character
              if (currentValue === '' && isOperator(char)) {
                return false;
              }
              if (!isNaN(char) || isOperator(char)) {
                return true;
              } else if (char === '.') {
                // Allow a dot if there's no dot in the current number segment
                const lastOperatorIndex = Math.max(
                  currentValue.lastIndexOf('+'),
                  currentValue.lastIndexOf('-'),
                  currentValue.lastIndexOf('*'),
                  currentValue.lastIndexOf('/')
                );
                const currentNumberSegment = currentValue.slice(lastOperatorIndex + 1);
                return !currentNumberSegment.includes('.');
              }
              return false;
            }
            
            function isOperator(char) {
                return ['+', '-', '*', '/'].includes(char);
            }
            
            function calculateResult() {
                const display = document.getElementById('display');
                const currentValue = display.value;
                
                // Prevent calculation if the expression ends with an operator
                if (isOperator(currentValue.slice(-1))) {
                    alert('Invalid calculation: expression ends with an operator');
                    return;
                }

                try {
                    const result = eval(currentValue);
                    // Prevent infinite calculation by checking if result is finite
                    if (isFinite(result)) {
                        display.value = result;
                    } else {
                        alert('Invalid calculation: result is not finite');
                    }
                } catch (error) {
                    alert('Invalid calculation: error in evaluation');
                }
            }

            function backSpace() {
                const display = document.getElementById('display');
                display.value = display.value.slice(0, -1);
            }

            document.addEventListener('keydown', function(event) {
                const key = event.key;
                const displayValue = document.getElementById('display').value;


                if (key === 'Enter') {
                    calculateResult();
                } else if (key === 'Escape') {
                    clearDisplay();
                } else if (key === 'Backspace') {
                    backSpace();
                } else if (key === '.' || !isNaN(key) || isOperator(key)) {
                    appendToDisplay(key);
                }
            });