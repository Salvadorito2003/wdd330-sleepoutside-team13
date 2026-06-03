import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParam, loadHeaderFooter, getLocalStorage } from "./utils.mjs";
import { displayCartQuantity } from "./cart.js";

async function init() {
    await loadHeaderFooter();
    displayCartQuantity();
}
const dataSource = new ExternalServices();
const productId = getParam("product");
const product = new ProductDetails(productId, dataSource);
product.init();
init();

