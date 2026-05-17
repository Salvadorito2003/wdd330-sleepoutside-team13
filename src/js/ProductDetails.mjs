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
    const productElement = document.querySelector(".product-detail");
    var discounted = "";
    if (this.product.SuggestedRetailPrice > this.product.FinalPrice) {
      discounted = '<span class="discount">Discounted!</span>';
    }
      
      productElement.innerHTML = `
      <img
        class="divider"
        src="${this.product.Image}"
        alt="${this.product.Name}"
      />

      <section class="product-card">
        <h2 class="brand">${this.product.Brand.Name}</h2>
        <h1 class="product-title">${this.product.NameWithoutBrand}</h1>
        <p class="product-card__price">
          <span class="list-price">List Price: $${this.product.ListPrice}</span>
          <span class="final-price">Final Price: $${this.product.FinalPrice}</span>
          ${discounted}
        </p>
        <p class="product__color">${this.product.Colors[0].ColorName}</p>
        <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
        </div>
      </section>
    `;
  }
}