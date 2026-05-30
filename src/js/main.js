import { loadHeaderFooter } from "./utils.mjs";
import Alert from "./Alert.mjs";
import ProductList from "./ProductList.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { displayCartQuantity } from "./cart.js";

async function init() {
  const alert = new Alert();
  await alert.init();
  await loadHeaderFooter();
  displayCartQuantity();
  
  // Fetch all categories
  const dataSource = new ExternalServices();
  const categories = ["tents", "backpacks", "sleeping-bags", "hammocks"];
  
  let allProducts = [];
  for (const category of categories) {
    const products = await dataSource.getData(category);
    // Add category to each product for correct links
    products.forEach(p => p.Category = category);
    allProducts = allProducts.concat(products);
  }
  
  // Shuffle and take top 8
  const shuffled = shuffleArray(allProducts).slice(0, 8);
  
  // Render using ProductList but with our pre-loaded data
  const listElement = document.querySelector(".product-list");
  const productList = new ProductList("mixed", dataSource, listElement);
  
  // Override init to use our shuffled list instead of fetching
  productList.init = async function() {
    this.renderList(shuffled);
  };
  
  productList.init();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

init();