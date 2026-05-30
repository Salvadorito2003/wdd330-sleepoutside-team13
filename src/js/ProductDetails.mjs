import { addItemToArray } from "./utils.mjs";

function animateCart() {
  const cartLink = document.querySelector(".cart");
  if (!cartLink) return;
  
  cartLink.classList.add("cart-animate");
  
  setTimeout(() => {
    cartLink.classList.remove("cart-animate");
  }, 500);
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    
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

      <section class="product-card-details">
        <h2 class="brand">${this.product.Brand.Name}</h2>
        <h1 class="product-title">${this.product.NameWithoutBrand}</h1>
        <p class="product-card__price">
          <span class="list-price">List Price: $${this.product.ListPrice}</span><br>
          <span class="final-price">Final Price: $${this.product.FinalPrice}</span><br>
          ${discounted}
        </p>
        <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
        </div>
      </section>
    `;
  }
}import { addItemToArray } from "./utils.mjs";

function animateCart() {
  const cartLink = document.querySelector(".cart");
  if (!cartLink) return;
  
  cartLink.classList.add("cart-animate");
  
  setTimeout(() => {
    cartLink.classList.remove("cart-animate");
  }, 500);
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    
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

      <section class="product-card-details">
        <h2 class="brand">${this.product.Brand.Name}</h2>
        <h1 class="product-title">${this.product.NameWithoutBrand}</h1>
        <p class="product-card__price">
          <span class="list-price">List Price: $${this.product.ListPrice}</span><br>
          <span class="final-price">Final Price: $${this.product.FinalPrice}</span><br>
          ${discounted}
        </p>
        <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
        </div>
      </section>
    `;
  }
}import { addItemToArray } from "./utils.mjs";

function animateCart() {
  const cartLink = document.querySelector(".cart");
  if (!cartLink) return;
  
  cartLink.classList.add("cart-animate");
  
  setTimeout(() => {
    cartLink.classList.remove("cart-animate");
  }, 500);
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    
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

      <section class="product-card-details">
        <h2 class="brand">${this.product.Brand.Name}</h2>
        <h1 class="product-title">${this.product.NameWithoutBrand}</h1>
        <p class="product-card__price">
          <span class="list-price">List Price: $${this.product.ListPrice}</span><br>
          <span class="final-price">Final Price: $${this.product.FinalPrice}</span><br>
          ${discounted}
        </p>
        <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
        </div>
      </section>
    `;
  }
}import { addItemToArray } from "./utils.mjs";

function animateCart() {
  const cartLink = document.querySelector(".cart");
  if (!cartLink) return;
  
  cartLink.classList.add("cart-animate");
  
  setTimeout(() => {
    cartLink.classList.remove("cart-animate");
  }, 500);
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    
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

      <section class="product-card-details">
        <h2 class="brand">${this.product.Brand.Name}</h2>
        <h1 class="product-title">${this.product.NameWithoutBrand}</h1>
        <p class="product-card__price">
          <span class="list-price">List Price: $${this.product.ListPrice}</span><br>
          <span class="final-price">Final Price: $${this.product.FinalPrice}</span><br>
          ${discounted}
        </p>
        <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
        </div>
      </section>
    `;
  }
}import { addItemToArray } from "./utils.mjs";

function animateCart() {
  const cartLink = document.querySelector(".cart");
  if (!cartLink) return;
  
  cartLink.classList.add("cart-animate");
  
  setTimeout(() => {
    cartLink.classList.remove("cart-animate");
  }, 500);
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    
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

      <section class="product-card-details">
        <h2 class="brand">${this.product.Brand.Name}</h2>
        <h1 class="product-title">${this.product.NameWithoutBrand}</h1>
        <p class="product-card__price">
          <span class="list-price">List Price: $${this.product.ListPrice}</span><br>
          <span class="final-price">Final Price: $${this.product.FinalPrice}</span><br>
          ${discounted}
        </p>
        <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
        </div>
      </section>
    `;
  }
}import { addItemToArray } from "./utils.mjs";

function animateCart() {
  const cartLink = document.querySelector(".cart");
  if (!cartLink) return;
  
  cartLink.classList.add("cart-animate");
  
  setTimeout(() => {
    cartLink.classList.remove("cart-animate");
  }, 500);
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    
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

      <section class="product-card-details">
        <h2 class="brand">${this.product.Brand.Name}</h2>
        <h1 class="product-title">${this.product.NameWithoutBrand}</h1>
        <p class="product-card__price">
          <span class="list-price">List Price: $${this.product.ListPrice}</span><br>
          <span class="final-price">Final Price: $${this.product.FinalPrice}</span><br>
          ${discounted}
        </p>
        <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
        </div>
      </section>
    `;
  }
}