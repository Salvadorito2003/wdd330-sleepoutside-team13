import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";
import { displayCartQuantity } from "./cart.js";

async function init() {
  await loadHeaderFooter();
  displayCartQuantity();
  
  const productId = getParam("product");
  const category = getParam("category");
  
  const dataSource = new ExternalServices();
  const product = new ProductDetails(productId, category, dataSource);
  product.init();
}

init();