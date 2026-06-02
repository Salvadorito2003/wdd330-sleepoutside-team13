import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
    constructor() {
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0.06;
        this.orderTotal = 0;
    }
        init(){
            this.calculateOrderTotal();
    }
    
    calculateItemSubTotal() {
        this.list = getLocalStorage("so-cart");
        const subTotal = this.list.reduce((total, item) => {
            return total + (item.Price * item.Quantity);
        }, 0);
        this.itemTotal = subTotal;
    }
    calculateShipping() {
        if (this.list.length === 1) {
            this.shipping = 10;
        } else {
            for (let i = 2; i <= this.list.length; i++) {
                this.shipping += 5;
            }
            this.shipping += 10;
        }
    }

    calculateOrderTotal() { 
        this.calculateItemSubTotal();
        this.calculateShipping();
        this.orderTotal = this.itemTotal + (this.itemTotal * this.tax) + this.shipping;
        this.displayOrderTotals();
    }
    displayOrderTotals() { 
        const taxText = document.getElementById("tax-text");
        const shippingEstimateText = document.getElementById("shipping-estimate-text");
        const orderTotalText = document.getElementById("order-total-text");

        taxText.innerHTML = `<strong>Tax:</strong> $${(this.itemTotal * this.tax).toFixed(2)}`;
        shippingEstimateText.innerHTML = `<strong>Shipping:</strong> $${this.shipping.toFixed(2)}`;
        orderTotalText.innerHTML = `<strong>Total:</strong> $${this.orderTotal.toFixed(2)}`;
    }
 }
