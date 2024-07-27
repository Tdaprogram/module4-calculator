initialEnvironment();
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
function initialEnvironment() {
  document.getElementById("divideByZero").style.display = "none";
}
function appendNumber(number) {
  initialEnvironment();
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
//function to set precision after decimal for * and /
function roundTo(num, precision) {
  if (operation == "*") {
    let factor = Math.pow(10, precision);
    return Math.round(num * factor) / factor;
  } else {
    const factor = Math.pow(10, precision);
    return Math.round(num * factor) / factor;
  }
}
function calculateResult() {
  if (
    previousOperand === null ||
    operation === null ||
    (previousOperand === null && operation === null)
  )
    return;
  let result = "";
  let currentOperation = operation;
  switch (currentOperation) {
    case "+":
      result = previousOperand + parseFloat(currentOperand);
      break;
    case "-":
      result = previousOperand - parseFloat(currentOperand);
      break;
    case "*":
      result = previousOperand * parseFloat(currentOperand);
      result = roundTo(result, 3);

      break;
    case "/":
      if (currentOperand === "0") {
        // alert("Cannot divide by zero");
        document.getElementById("divideByZero").style.display = "block";
        document.getElementById("divideByZero").innerHTML =
          "Cannot divide by zero";
        clearResult();
        return;
      }
      result = previousOperand / parseFloat(currentOperand);
      result = roundTo(result, 3);

      break;
  }
  currentOperand = result;
  previousOperand = null;
  operation = null;
  resultInput.value = result;
  resultCalculated = true; // to start calculating next one without pressing =
}
