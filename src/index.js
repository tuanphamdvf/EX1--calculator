const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");
const display = document.querySelector(".calculator__display");
const error = document.querySelector(".error");
let preTypes;
let num1;
let operator;

keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.innerHTML;
    const displayedNum = display.innerHTML;
    error.innerHTML = "";

    // check if  input value is number
    if (!action) {
      if (displayedNum === "0" || preTypes === "operator" || preTypes ==='result') {
        display.innerHTML = keyContent;
      } else {
        display.innerHTML = displayedNum + keyContent;
      }
      preTypes = "number";
    }
    //check if  input value is  Operator
    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      preTypes = "operator";
      num1 = displayedNum;
      operator = action;
      display.innerHTML = keyContent;
    }

    if (action === "decimal") {
      if (!displayedNum.includes(".") && preTypes != "operator") {
        display.innerHTML = displayedNum + ".";
      } else if (preTypes == "operator") {
        display.innerHTML = "0.";
      }
    }

    if (action === "clear") {
      display.innerHTML = "0";
      preTypes = "clear";
      operator = undefined;
    }
    // handle calculations
    if (action === "calculate") {
      const num2 = displayedNum;
      if (num1 != undefined && operator != undefined) {
        display.innerHTML = calculate(num1, operator, num2);
        preTypes = "result" 
        operator = undefined
      } else if(operator == undefined){
        preTypes = "result"
      }
    }
  }
});
// function calculate receive 2 number, 1  operator and return result is a number
function calculate(num1, operator, num2) {
  if (operator === "add") {
    return parseFloat(num1) + parseFloat(num2);
  }
  if (operator === "subtract") {
    return parseFloat(num1) - parseFloat(num2);
  }
  if (operator === "multiply") {
    return parseFloat(num1) * parseFloat(num2);
  }
  if (operator === "divide") {
    return parseFloat(num1) / parseFloat(num2);
  }
}
