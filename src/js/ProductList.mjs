import { renderListWithTemplate } from "./utils.mjs";

// Helper function to generate the HTML markup for an individual product card
function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img src="${product.Image}" alt="Image of ${product.Name}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.NameWithoutBrand}</h3>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // Await the promise returned by your data source module
    const list = await this.dataSource.getData();
    
    // Pass the data and rendering logic to your utility function
    this.renderList(list);
  }

  renderList(list) {
    // Use our global utility function to draw the items
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}