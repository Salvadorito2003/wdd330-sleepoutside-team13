import { loadHeaderFooter } from "./utils.mjs";
import Alert from "./Alert.mjs";

async function init() {
  const alert = new Alert();
  await alert.init();        
  await loadHeaderFooter();  
}

init();
// Import the ProductList class to handle rendering product cards to the page
import ProductList from "./ProductList.mjs";

import ProductData from "./ProductData.mjs";

import { displayCartQuantity } from "./cart.js";

//Import the funtion to render the Header and Footer
import { loadHeaderFooter, getLocalStorage } from "./utils.mjs";

async function init() {
    await loadHeaderFooter();
    displayCartQuantity();
}
// Create a new instance of ProductData for the "tents" category
// This will fetch from /json/tents.json
const dataSource = new ProductData();

// Find the HTML element where product cards will be inserted
// This is the empty <ul class="product-list"> in index.html
const listElement = document.querySelector(".product-list");

// Create a new instance of ProductList and initialize it with:
// 1. The category name ("tents")
// 2. The data source (ProductData instance)
// 3. The target HTML element to render into
const productList = new ProductList("tents", dataSource, listElement);

// Initialize the product list by calling init()
// This starts the process to fetch data and render product cards
productList.init();
init();



