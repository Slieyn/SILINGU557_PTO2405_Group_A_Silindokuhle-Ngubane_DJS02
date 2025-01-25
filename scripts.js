/**
 * @typedef {Object} FormDataEntries
 * @property {string} dividend - The string input that may contain numbers or letters.
 * @property {string} divider - The string input that may contain numbers or letters.
 */

/**
 * Selects the form element from the DOM.
 * @type {HTMLFormElement}
 */
const form = document.querySelector("[data-form]");

/**
 * Selects the result element from the DOM.
 * @type {HTMLElement}
 */
const result = document.querySelector("[data-result]");

/**
 * Handles the form submission event to calculate the division of two numbers.
 * @param {Event} event - The submit event triggered by the form.
 * @listens HTMLFormElement#submit
 */
form.addEventListener("submit", (event) => {
  event.preventDefault();

  try {
    // Parse form entries into an object
    /** @type {FormDataEntries} */
    const entries = Object.fromEntries(new FormData(event.target));
    const { dividend, divider } = entries;

    // Validation for missing inputs
    if (!dividend || !divider) {
      result.innerText = console.error`"Error: Division not performed. Both values are required in inputs. Try again.”"`;
      return;
    }

    // Check if inputs contain valid numbers (allow both letters and numbers)
    const numericDividend = extractNumber(dividend);
    const numericDivider = extractNumber(divider);

    // If either input doesn't contain a valid number, throw an error
    if (numericDividend === null || numericDivider === null) {
      throw new Error(
        (result.innerText = console.error`"Error: Something critical went wrong. Please reload the page. Dividend: "${dividend}", Divider: "${divider}"`)
      );
    }

    // Validation for division by zero
    if (numericDivider === 0) {
      console.error("Error: Division by zero");
      result.innerText = "Error: “c”.";
      return;
    }

    // Perform the division and truncate the result
    const divisionResult = Math.trunc(numericDividend / numericDivider);

    // Update the result element with the calculated value
    result.innerText = `Result: ${divisionResult}`;
  } catch (error) {
    // Log the error with the call stack
    console.error(error);

    // Replace the entire screen with a critical error message
    document.body.innerHTML =
      '<div style="color: red; font-size: 2rem; text-align: center;">Something critical went wrong. Please reload the page.</div>';
  }
});

/**
 * Extracts the first number found in a string.
 * @param {string} input - The input string to extract a number from.
 * @returns {number|null} - Returns the extracted number or null if no valid number is found.
 */
function extractNumber(input) {
  const match = input.match(/[-+]?\d*\.?\d+/); // Regex to find numbers (including decimals)
  return match ? parseFloat(match[0]) : null; // Returns the first matched number or null if none found
}
