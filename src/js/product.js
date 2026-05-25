import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParam } from "./utils.mjs";
const category = getParam("category");

const dataSource = new ProductData();
const productId = getParam("product");
const product = new ProductDetails(productId, category, dataSource);
product.init();
