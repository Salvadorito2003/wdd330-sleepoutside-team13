import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

const checkout = new CheckoutProcess("so-cart", "#order-summary");

async function init() {
  await loadHeaderFooter();
  checkout.init();              // Shows subtotal
  checkout.calculateOrderTotal();  // ALSO show tax, shipping, total immediately
  
  // Recalculate if zip changes
  document.querySelector("#zip").addEventListener("blur", () => {
    checkout.calculateOrderTotal();
  });
  
  // Handle form submission
  document.querySelector("#checkout-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const res = await checkout.checkout(e.target);
      console.log("Order submitted:", res);
    } catch (err) {
      console.error("Checkout failed:", err);
    }
  });
}

init();