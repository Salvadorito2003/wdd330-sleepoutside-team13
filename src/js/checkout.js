import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

// Create a new checkout process instance
// Uses "so-cart" from localStorage and updates the order summary section
const checkout = new CheckoutProcess("so-cart", "#order-summary");

async function init() {
  // Load shared header and footer content
  await loadHeaderFooter();

  // Initialize checkout data
  checkout.init();

  // Calculate and display order totals
  checkout.calculateOrderTotal();

  // Recalculate totals when the user finishes entering a zip code
  document.querySelector("#zip").addEventListener("blur", () => {
    checkout.calculateOrderTotal();
  });

  // Listen for checkout form submission
  document.querySelector("#checkout-form").addEventListener("submit", async (e) => {
    // Prevent the browser's default form submission
    e.preventDefault();

    // Get the submitted form element
    const myForm = e.target;

    // Check if all form fields pass validation
    const chk_status = myForm.checkValidity();

    // Display validation messages to the user
    myForm.reportValidity();

    // Only continue if the form is valid
    if (chk_status) {
      // Submit the order
      await checkout.checkout(myForm);
    }
  });
}

// Start the checkout page
init();