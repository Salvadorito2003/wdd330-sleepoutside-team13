import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./checkout-process.mjs";

loadHeaderFooter();

const order = new CheckoutProcess("so-cart", ".checkout-summary");
order.init();

// Add event listeners to fire calculateOrderTotal when the user changes the zip code
document
  .querySelector("#zip")
  .addEventListener("blur", order.calculateOrderTotal.bind(order));

// listening for click on the button
document.querySelector("#submit").addEventListener("click", (e) => {
  e.preventDefault();

  order.checkout();

});