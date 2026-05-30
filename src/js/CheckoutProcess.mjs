// Import the module that sends orders to the server
import ExternalServices from "./ExternalServices.mjs";

// Import helper to read cart data from browser storage
import { getLocalStorage } from "./utils.mjs";

// Main class that handles all checkout math and display
export default class CheckoutProcess {
  
  // Set up empty values when the class is created
  constructor(key, outputSelector) {
    this.key = key;                 
    this.outputSelector = outputSelector; // CSS selector for where to show totals
    this.list = [];                    
    this.itemTotal = 0;               
    this.shipping = 0;                 
    this.tax = 0;                      
    this.orderTotal = 0;               // final total
  }

  // Load cart from storage and show subtotal on page load
  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSubTotal();
  }

  // Add up all item prices and display subtotal
  calculateItemSubTotal() {
    this.itemTotal = this.list.reduce((sum, item) => sum + item.FinalPrice, 0);
    
    const subtotalElement = document.querySelector(`${this.outputSelector} #subtotal`);
    if (subtotalElement) {
      subtotalElement.textContent = `$${this.itemTotal.toFixed(2)}`;
    }
  }

  // Calculate tax, shipping, and final total after zip is entered
  calculateOrderTotal() {
    this.tax = this.itemTotal * 0.06;
    
    const itemCount = this.list.length;
    this.shipping = itemCount > 0 ? 10 + (itemCount - 1) * 2 : 0;
    
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    
    this.displayOrderTotals();
  }

  // Show tax, shipping, and total on the page
  displayOrderTotals() {
    const taxEl = document.querySelector(`${this.outputSelector} #tax`);
    const shippingEl = document.querySelector(`${this.outputSelector} #shipping`);
    const totalEl = document.querySelector(`${this.outputSelector} #order-total`);
    
    if (taxEl) taxEl.textContent = `$${this.tax.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = `$${this.shipping.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${this.orderTotal.toFixed(2)}`;
  }

  // Gather form data, add order details, and send to server
  async checkout(form) {
    const formData = new FormData(form);
    const order = Object.fromEntries(formData.entries());
    
    order.orderDate = new Date().toISOString();
    order.items = packageItems(this.list);
    order.orderTotal = this.orderTotal.toFixed(2);
    order.shipping = this.shipping;
    order.tax = this.tax.toFixed(2);
    
    const externalServices = new ExternalServices();
    return await externalServices.checkout(order);
  }
}

// Convert cart items to simpler format for the server
  function packageItems(items) {
  // Group items by id and sum quantities
  const grouped = {};
  
  items.forEach(item => {
    if (!grouped[item.Id]) {
      grouped[item.Id] = {
        id: item.Id,
        name: item.Name,
        price: item.FinalPrice,
        quantity: 0
      };
    }
    grouped[item.Id].quantity += 1;
  });
  
  return Object.values(grouped);
}