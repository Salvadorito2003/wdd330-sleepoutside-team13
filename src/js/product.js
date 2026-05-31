import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParam } from "./utils.mjs";
const category = getParam("category");

const dataSource = new ExternalServices();
const productId = getParam("product");
const product = new ProductDetails(productId, category, dataSource);
product.init();
