import ExternalServices from "./ExternalServices.mjs";
import { getLocalStorage, alertMessage } from "./utils.mjs";

// Handles checkout calculations and order submission
export default class CheckoutProcess {

  constructor(key, outputSelector) {
    // Local storage key used to retrieve cart items
    this.key = key;

    // CSS selector for the order summary section
    this.outputSelector = outputSelector;

    // Array of cart items
    this.list = [];

    // Total cost of items before tax and shipping
    this.itemTotal = 0;

    // Shipping cost
    this.shipping = 0;

    // Tax amount
    this.tax = 0;

    // Final order total
    this.orderTotal = 0;
  }

  // Initialize checkout data
  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSubTotal();
  }

  // Calculate subtotal of all items in the cart
  calculateItemSubTotal() {
    this.itemTotal = this.list.reduce((sum, item) => sum + item.FinalPrice, 0);

    // Update subtotal display
    const subtotalElement = document.querySelector(`${this.outputSelector} #subtotal`);
    if (subtotalElement) {
      subtotalElement.textContent = `$${this.itemTotal.toFixed(2)}`;
    }
  }

  // Calculate tax, shipping, and final order total
  calculateOrderTotal() {
    // Tax is 6% of subtotal
    this.tax = this.itemTotal * 0.06;

    // Shipping starts at $10 and increases by $2 per additional item
    const itemCount = this.list.length;
    this.shipping = itemCount > 0 ? 10 + (itemCount - 1) * 2 : 0;

    // Calculate grand total
    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    // Update display
    this.displayOrderTotals();
  }

  // Display tax, shipping, and order total in the UI
  displayOrderTotals() {
    const taxEl = document.querySelector(`${this.outputSelector} #tax`);
    const shippingEl = document.querySelector(`${this.outputSelector} #shipping`);
    const totalEl = document.querySelector(`${this.outputSelector} #order-total`);

    if (taxEl) taxEl.textContent = `$${this.tax.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = `$${this.shipping.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${this.orderTotal.toFixed(2)}`;
  }

  // Submit the order to the server
  async checkout(form) {
    // Gather all form data
    const formData = new FormData(form);

    // Convert FormData into a plain object
    const order = Object.fromEntries(formData.entries());

    // Add additional order information
    order.orderDate = new Date().toISOString();
    order.items = packageItems(this.list);
    order.orderTotal = this.orderTotal.toFixed(2);
    order.shipping = this.shipping;
    order.tax = this.tax.toFixed(2);

    try {
      // Create API service instance
      const externalServices = new ExternalServices();

      // Send order to server
      const res = await externalServices.checkout(order);

      // Order successful: clear cart and redirect
      localStorage.removeItem("so-cart");
      window.location.href = "/checkout/success.html";

    } catch (err) {
      // Log error for debugging
      console.error("Checkout error:", err);

      // Extract error message from server response
      const errorMessage =
        err.message?.message || "Checkout failed. Please try again.";

      // Display error to user
      alertMessage(errorMessage);
    }
  }
}

// Convert cart items into the format required by the API
function packageItems(items) {
  const grouped = {};

  items.forEach(item => {
    // Create a new grouped item if it doesn't exist yet
    if (!grouped[item.Id]) {
      grouped[item.Id] = {
        id: item.Id,
        name: item.Name,
        price: item.FinalPrice,
        quantity: 0
      };
    }

    // Increase quantity count for duplicate items
    grouped[item.Id].quantity += 1;
  });

  // Convert grouped object into an array
  return Object.values(grouped);
}