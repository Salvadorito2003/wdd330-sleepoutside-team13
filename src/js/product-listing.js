// Import the ProductData class to handle fetching product data from JSON files
import ProductData from "./ProductData.mjs";

// Import the ProductList class to handle rendering product cards to the page
import ProductList from "./ProductList.mjs";

import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();

const category = getParam('category');
const title = document.querySelector("#category-title");

title.textContent = `Top Products: ${
  category.charAt(0).toUpperCase() + category.slice(1)
}`;

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
const productList = new ProductList(category, dataSource, listElement);

// Initialize the product list by calling init()
// This starts the process to fetch data and render product cards
productList.init();