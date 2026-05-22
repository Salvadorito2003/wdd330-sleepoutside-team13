import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

// Load header and footer
loadHeaderFooter();

// Create and initialize shopping cart
const cart = new ShoppingCart("so-cart", ".product-list");
cart.init();