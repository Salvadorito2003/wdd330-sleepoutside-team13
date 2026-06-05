import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { displayCartQuantity } from "./cart.js";
import { loadHeaderFooter, getParam } from "./utils.mjs";

async function init() {
  await loadHeaderFooter();
  displayCartQuantity();
  
  // Get category from URL
  const category = getParam("category");
  const capitalized = category ? category.charAt(0).toUpperCase() + category.slice(1) : "";

  // Update page heading (ONLY ONCE)
  const titleElement = document.querySelector(".products h2");
  if (titleElement) {
    titleElement.textContent = `Products: ${capitalized}`;
  }
  
  // Update browser tab title
  document.title = `Sleep Outside | Products: ${capitalized}`;
  
  // Initialize product list
  const dataSource = new ExternalServices();
  const listElement = document.querySelector(".product-list");
  const myList = new ProductList(category, dataSource, listElement);
  await myList.init();

  const sortSelect = document.querySelector("#sort-products");
  if (sortSelect) {
    sortSelect.addEventListener("change", (event) => {
      myList.sortProducts(event.target.value);
    });
  }
}

init();