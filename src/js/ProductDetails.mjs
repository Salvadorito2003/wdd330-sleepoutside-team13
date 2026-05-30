import { addItemToArray } from "./utils.mjs";

function animateCart() {
  const cartLink = document.querySelector(".cart");
  if (!cartLink) return;
  
  // Scroll to top so user sees the animation
  window.scrollTo({ top: 0, behavior: "smooth" });
  
  // Wait for scroll, then animate
  setTimeout(() => {
    cartLink.classList.add("cart-animate");
    setTimeout(() => {
      cartLink.classList.remove("cart-animate");
    }, 500);
  }, 300);
}

export default class ProductDetails {
  constructor(productId, category, dataSource) {
    this.productId = productId;
    this.category = category;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    // use the datasource to get the details for the current product
    this.product = await this.dataSource.findProductById(this.productId, this.category);
    
    // the product details are needed before rendering the HTML
    this.renderProductDetails();
    
    // once the HTML is rendered, add a listener to the Add to Cart button
    // Notice the .bind(this). This callback will not work if the bind(this) is missing.
    document.getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
  if (!this.product || !this.product.Images) {
    console.error("Invalid product, not adding to cart:", this.product);
    return;
  }

  addItemToArray("so-cart", this.product);
  animateCart();
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
        src="${this.product.Images.PrimaryExtraLarge}"
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