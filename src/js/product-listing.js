// Import the ExternalServices class to handle fetching product data from JSON files
import ExternalServices from "./ExternalServices.mjs";

// Import the ProductList class to handle rendering product cards to the page
import ProductList from "./ProductList.mjs";

import { displayCartQuantity } from "./cart.js";

//Import the funtion to render the Header and Footer
import { loadHeaderFooter, getParam , getLocalStorage} from "./utils.mjs";

// Create a new instance of ExternalServices for the "tents" category
async function init() {
    await loadHeaderFooter();
    displayCartQuantity();
}
const category = getParam('category');
// Create a new instance of ProductData for the "tents" category
// This will fetch from /json/tents.json
const dataSource = new ExternalServices();

// Find the HTML element where product cards will be inserted
// This is the empty <ul class="product-list"> in index.html
const listElement = document.querySelector(".product-list");

// Create a new instance of ProductList and initialize it with:
// 1. The category name ("tents")
// 2. The data source (ExternalServices instance)
// 1. The category 
// 2. The data source (ProductData instance)
// 3. The target HTML element to render into
const myList = new ProductList(category, dataSource, listElement);

// Initialize the product list by calling init()
// This starts the process to fetch data and render product cards
myList.init();

init();

const stringCategory = category.charAt(0).toUpperCase() + category.slice(1);

document.querySelector("h2").textContent = `Top Products: ${stringCategory}`;
