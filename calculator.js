let resultInput = document.getElementById("result-window-data");
let currentOperand = "";
let previousOperand = "";
let operation = null;
let resultCalculated = false; //to check if display window is already showing calculated results from previous operation.

function clearResult() {
  currentOperand = "";
  previousOperand = "";
  operation = null;
  resultInput.value = "";
}

function appendNumber(number) {
  //No previous Operation's Data in Result Window
  if (resultCalculated == false) {
    currentOperand = currentOperand + number;
    resultInput.value = currentOperand;
  }
  // Previous Operation data exists in Result Window
  else {
    clearResult();
    resultCalculated = false;
    appendNumber(number);
  }
}

function performOperation(op) {
  if (currentOperand === "") return;
  if (previousOperand !== "" && operation !== null) {
    calculateResult();
  }
  previousOperand = parseFloat(currentOperand);
  currentOperand = "";
  operation = op;
}

function calculateResult() {
  // Function to round devided numbers result to 2 decimal places.

  if (previousOperand === null || operation === null) return;
  let result = "";
  switch (operation) {
    case "+":
      result = previousOperand + parseFloat(currentOperand);
      break;
    case "-":
      result = previousOperand - parseFloat(currentOperand);
      break;
    case "*":
      result = previousOperand * parseFloat(currentOperand);
      break;
    case "/":
      if (currentOperand === "0") {
        alert("Cannot divide by zero");
        clearResult();
        return;
      }
      result = previousOperand / parseFloat(currentOperand);
      /*   result = roundTo(result, 3);
      function roundTo(num, precision) {
        const factor = Math.pow(10, precision);
        return Math.round(num * factor) / factor;
      }*/
      break;
  }
  currentOperand = result;
  previousOperand = null;
  operation = null;
  resultInput.value = result;
  resultCalculated = true; // to start calculating next one without pressing =
}
