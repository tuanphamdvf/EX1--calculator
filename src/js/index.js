const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");
const display = document.querySelector(".calculator__display");
let preType;
let num1;
let num2;
let operator;
const ARRAY_BUTTON = [
  {
    name: "add",
    text: "+",
    type: "add",
  },
  {
    name: "subtract",
    text: "-",
    type: "subtract",
  },
  {
    name: "multiply",
    text: "*",
    type: "multiply",
  },
  {
    name: "divide",
    text: "/",
    type: "divide",
  },
  {
    name: "7",
    text: 7,
    type: "number",
  },
  {
    name: "8",
    text: 8,
    type: "number",
  },
  {
    name: "9",
    text: 9,
    type: "number",
  },
  {
    name: "key--equal",
    text: "=",
    type: "calculate",
  },

  {
    name: "4",
    text: 4,
    type: "number",
  },
  {
    name: "5",
    text: 5,
    type: "number",
  },
  {
    name: "6",
    text: 6,
    type: "number",
  },

  {
    name: "1",
    text: 1,
    type: "number",
  },
  {
    name: "2",
    text: 2,
    type: "number",
  },
  {
    name: "3",
    text: 3,
    type: "number",
  },

  {
    name: "0",
    text: 0,
    type: "number",
  },
  {
    name: "dot",
    text: ".",
    type: "decimal",
  },

  {
    name: "clear",
    text: "AC",
    type: "clear",
  },
];

function createButton() {
  ARRAY_BUTTON.forEach((item) => {
    if (item.type === "number") {
      keys.innerHTML += `<button>${item.text}</button>`;
    } else {
      keys.innerHTML += `<button class = '${item.name}' data-action = ${item.type}>${item.text}</button>`;
    }
  });
}
createButton();

keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.innerHTML;
    const displayedNum = display.innerHTML

    // check if  input value is number
    if (!action) {
      if (
        displayedNum === "0" ||
        preType === "operator" ||
        preType === "result"
      ) {
        display.innerHTML = keyContent;
      } else {
        display.innerHTML = displayedNum + keyContent;
      }
      preType = "number";
    }
    //check if  input value is  Operator
    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      if (operator === undefined) {
        preType = "operator";
        num1 = displayedNum;
        operator = action;
        display.innerHTML = keyContent;
      } else {
        num1 = calculate(num1, operator, displayedNum);
        preType = "operator";
        operator = action;
        display.innerHTML = keyContent;
      }
    }

    if (action === "decimal") {
      if (!displayedNum.includes(".") && preType != "operator") {
        display.innerHTML = displayedNum + ".";
      } else if (preType == "operator") {
        display.innerHTML = "0.";
      }
    }

    if (action === "clear") {
      display.innerHTML = "0";
      preType = "clear";
      operator = undefined;
    }
    // handle calculations
    if (action === "calculate") {
      num2 = displayedNum;
      if (
        num1 != undefined &&
        operator != undefined &&
        preType != "operator"
      ) {
        display.innerHTML = calculate(num1, operator, num2);
        preType = "result";
        operator = undefined;
      }
      if (operator === undefined) {
        preType = "result";
      } else {
        display.innerHTML = `Error`;
        preType = "result";
        operator = undefined;
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
  if (operator === "divide" && num2 !== '0') {
    return parseFloat(num1) / parseFloat(num2);
  }else return "Error"
}
