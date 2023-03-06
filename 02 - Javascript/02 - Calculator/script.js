let value = 0;
let stack = 0;
let stringValue = String(value);
let stringStack = String(stack);
let stringOperation = "";
let lastOperation = "";

// Elements
const oneButton = document.getElementById("oneButton");
const twoButton = document.getElementById("twoButton");
const threeButton = document.getElementById("threeButton");
const fourButton = document.getElementById("fourButton");
const fiveButton = document.getElementById("fiveButton");
const sixButton = document.getElementById("sixButton");
const sevenButton = document.getElementById("sevenButton");
const eightButton = document.getElementById("eightButton");
const nineButton = document.getElementById("nineButton");
const ceButton = document.getElementById("ceButton");
const cButton = document.getElementById("cButton");
const timesButton = document.getElementById("timesButton");
const divideButton = document.getElementById("divideButton");
const minusButton = document.getElementById("minusButton");
const plusButton = document.getElementById("plusButton");
const equalsButton = document.getElementById("equalsButton");

const operationField = document.getElementById("operation");
const valueField = document.getElementById("currentValue");

// Defining events
oneButton.onclick = () => ConcatValue(1);
twoButton.onclick = () => ConcatValue(2);
threeButton.onclick = () => ConcatValue(3);
fourButton.onclick = () => ConcatValue(4);
fiveButton.onclick = () => ConcatValue(5);
sixButton.onclick = () => ConcatValue(6);
sevenButton.onclick = () => ConcatValue(7);
eightButton.onclick = () => ConcatValue(8);
nineButton.onclick = () => ConcatValue(9);

plusButton.onclick = () => UpdateOperation("+");
minusButton.onclick = () => UpdateOperation("-");
divideButton.onclick = () => UpdateOperation("/");
timesButton.onclick = () => UpdateOperation("x");
equalsButton.onclick = () => UpdateOperation("=");

ceButton.onclick = () => UpdateValue(0);
cButton.onclick = () => ClearAll();

document.addEventListener('keydown', HandleKeyboard);

function UpdateValue(newValue)
{
    value = newValue;
    stringValue = String(newValue);
    if (stringValue.length > 1 && stringValue.startsWith("0"))
    {
        stringValue = stringValue.slice(1);
    }

    UpdateStringValue(newValue);
}

function UpdateStringValue(newValue)
{
    valueField.innerHTML = String(newValue);
}

function UpdateStringOperation(newValue)
{
    stringOperation = String(newValue);
    operationField.innerHTML = stringOperation;
}

function ConcatValue(number)
{
    valueString = String(value);
    valueString += number;
    UpdateValue(Number(valueString));
}

function UpdateOperation(operation)
{
    lastOperation = (lastOperation === "") ? operation : lastOperation;
    switch(lastOperation)
    {
        case "+":
            stack += value;
            break;
        case "-":
            stack -= value;
            break;
        case "x":
            stack *= value;
            break;
        case "/":
            stack /= value;
    }

    if (stringOperation === "")
    {
        stack = value;
        UpdateStringOperation(String(stack) + " " + operation);
        UpdateValue(0);
    }
    else if (operation === "=")
    {
        UpdateValue(stack);
        stack = 0;
        UpdateStringOperation("");
        lastOperation = "";
        return;
    }
    else if (stringOperation != "" && value === 0)
    {
        UpdateStringOperation(stringOperation.slice(0, -1) + " " + operation);
    }
    else
    {
        const newStringOperation = stringOperation + ` ${value} ${operation}`;
        UpdateStringOperation(newStringOperation);
        UpdateValue(0);
        UpdateStringValue(stack);
    }

    lastOperation = operation;
}

function ClearAll() {
    stack = 0;
    UpdateValue(0);
    UpdateStringOperation("");
    lastOperation = "";
}

function HighlightButton(element)
{
    element.classList.add("buttonPressed");
    setTimeout(RemoveHighlight, 150, element);
}

function RemoveHighlight(element)
{
    element.classList.remove("buttonPressed");
}

function HandleKeyboard(event)
{
    const name = event.key;
    let element = null;
    
    switch(name)
    {
        case "1":
            element = oneButton;
            break;
        case "2":
            element = twoButton;
            break;
        case "3":
            element = threeButton;
            break;
        case "4":
            element = fourButton;
            break;
        case "5":
            element = fiveButton;
            break;
        case "6":
            element = sixButton;
            break;
        case "7":
            element = sevenButton;
            break;
        case "8":
            element = eightButton;
            break;
        case "9":
            element = nineButton;
            break;
        case "+":
            element = plusButton;
            break;
        case "-":
            element = minusButton;
            break;
        case "*":
            element = timesButton;
            break;
        case "/":
            element = divideButton;
            break;
        case "Backspace":
            element = ceButton;
            break;
        case "Delete":
            element = cButton;
            break;
        case "Enter":
            element = equalsButton;
            break;
        case "=":
            element = equalsButton;
            break;
    }

    if (element)
    {
        element.click();
        HighlightButton(element);
    }
}