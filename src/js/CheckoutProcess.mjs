import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
  // convert the form data to a JSON object
  const formData = new FormData(formElement);
  const convertedJSON = {};
  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

function packageItems(items) {
    const simplifiedList = items.map(item => {
        return {
            id: item.Id,
            price: item.FinalPrice,
            name: item.Name,
            quantity: item.Quantity
        };
    });
    return simplifiedList;
}

export default class CheckoutProcess {
    constructor() {
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0.06;
        this.orderTotal = 0;
    }
    init() {
        this.list = getLocalStorage("so-cart") || [];
        this.calculateItemSummary();
    }

    calculateItemSummary() {
        const summaryElement = document.querySelector("#cartTotal");
    const itemNumElement = document.querySelector("#num-items");
    itemNumElement.innerText = this.list.length;
    // calculate the total of all the items in the cart
    const amounts = this.list.map((item) => item.FinalPrice * item.Quantity);
    this.itemTotal = amounts.reduce((sum, item) => sum + item); 
    summaryElement.innerText = `$${this.itemTotal}`;;
     }
    
    calculateOrderTotal() {
        if (this.list.length === 1) {
            this.shipping = 10;
        } else {
            for (let i = 2; i <= this.list.length; i++) {
                this.shipping += 5;
            }
            this.shipping += 10;
        }
        this.tax = this.itemTotal * 0.06;
        this.orderTotal = this.itemTotal + this.tax+ this.shipping;
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        const taxText = document.getElementById("tax");
        const shippingEstimateText = document.getElementById("shipping");
        const orderTotalText = document.getElementById("orderTotal");

        taxText.innerHTML = `$${this.tax.toFixed(2)}`;
        shippingEstimateText.innerHTML = `$${this.shipping.toFixed(2)}`;
        orderTotalText.innerHTML = `$${this.orderTotal.toFixed(2)}`;
    }

 
    async checkout() {
        const formElement = document.forms["checkoutForm"];
        const order = formDataToJSON(formElement);

        order.orderDate = new Date().toISOString();
        order.orderTotal = this.orderTotal;
        order.tax = this.tax;
        order.shipping = this.shipping;
        order.items = packageItems(this.list);

        try {
            const response = await services.checkout(order);
            console.log("Checkout successful:", response);
            return response;
        } catch (error) {
            console.error("Checkout failed:", error);
            console.log("Order data that failed to send:", order);
        }
    }
}
