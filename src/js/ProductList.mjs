import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="/product_pages/?product=${product.Id}&category=${product.Category || 'tents'}">
      <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}" />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = [];
  }

  async init() {
    this.products = await this.dataSource.getData(this.category);
    this.renderList(this.products);
  }

  renderList(list) {
    // Added "true" to clear element before inserting new cards
    renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
  }

  sortProducts(sortBy = "default") {
    const sortedProducts = [...this.products];

    if (sortBy === "price") {
      sortedProducts.sort((firstProduct, secondProduct) => firstProduct.FinalPrice - secondProduct.FinalPrice);
    }

    if (sortBy === "alpha") {
      sortedProducts.sort((firstProduct, secondProduct) =>
        firstProduct.NameWithoutBrand.localeCompare(secondProduct.NameWithoutBrand)
      );
    }

    this.renderList(sortedProducts);
  }

  
}