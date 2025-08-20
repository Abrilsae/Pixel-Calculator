const screen = document.getElementById("screen");
const keys = document.getElementById("keys");

let currentInput = "";
let resetNext = false;

keys.addEventListener("click", (e) => {
  if (!e.target.matches("button")) return;

  const button = e.target;
  const action = button.dataset.action;
  const value = button.dataset.value;

  if (action === "clear") {
    currentInput = "";
    screen.textContent = "0";
    return;
  }

  if (action === "delete") {
    currentInput = currentInput.slice(0, -1);
    screen.textContent = currentInput || "0";
    return;
  }

  if (action === "equals") {
    try {
      // Replace symbols for JS evaluation
      const expression = currentInput.replace(/×/g, "*").replace(/÷/g, "/");
      currentInput = eval(expression).toString();
      screen.textContent = currentInput;
    } catch {
      screen.textContent = "Error";
      currentInput = "";
    }
    return;
  }

  // For numbers and operators
  if (value) {
    if (screen.textContent === "0" && value !== ".") {
      currentInput = value; 
    } else {
      currentInput += value; 
    }
    screen.textContent = currentInput;
  }
});
