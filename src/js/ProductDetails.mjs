import { addItemToArray } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    // use the datasource to get the details for the current product
    this.product = await this.dataSource.findProductById(this.productId);
    
    // the product details are needed before rendering the HTML
    this.renderProductDetails();
    
    // once the HTML is rendered, add a listener to the Add to Cart button
    // Notice the .bind(this). This callback will not work if the bind(this) is missing.
    document.getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    addItemToArray("so-cart", this.product);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  document.querySelector("h2").textContent = product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
  document

  document.querySelector("#brand").textContent = product.Brand.Name;
  document.querySelector("#name").textContent = product.NameWithoutBrand;

  const image = document.querySelector("#productImage");

  image.src = product.Images.PrimaryLarge;
  image.alt = product.NameWithoutBrand

  const euroPrice = new Intl.NumberFormat('de-DE',
    {
      style: 'currency', currency: 'EUR',
    }).format(Number(product.FinalPrice) * 0.85);

  document.querySelector("#product-card_price").textContent = `${euroPrice}`;

  document.querySelector("#product_color").textContent = product.Colors[0].ColorName;

  document.querySelector("#product_description").innerHTML = product.DescriptionHtmlSimple;

  document.querySelector("#addToCart").dataset.id = product.Id;
  
}