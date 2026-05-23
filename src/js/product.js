import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParam } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";
// Load header and footer
loadHeaderFooter();

const dataSource = new ProductData();
const productId = getParam("product");
const product = new ProductDetails(productId, dataSource);
product.init();
