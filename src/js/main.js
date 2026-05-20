import ProductData from "./ProductData.mjs";

// 1. Initialize the data source for the tents category
const dataSource = new ProductData("tents");

// 2. Generate the HTML markup string for an individual product card
function productCardTemplate(product) {
  // Fallback path to your tent logo if the product image is missing or broken
  const fallbackImage = "/images/noun_Tent_2517.svg";

  return `
    <li class="product-card">
      <a href="product_pages/index.html?product=${product.Id}">
        <img 
          src="${product.Image}" 
          alt="Image of ${product.Name}"
          onerror="this.onerror=null; this.src='${fallbackImage}';"
        >
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.ListPrice}</p>
      </a>
    </li>
  `;
}

// 3. Loop through products and inject the collective markup into the DOM
function renderProductList(products, listElement) {
  const htmlStrings = products.map((product) => productCardTemplate(product));
  listElement.innerHTML = htmlStrings.join("");
}

// 4. Run the main app pipeline
async function init() {
  const products = await dataSource.getData();
  const listElement = document.querySelector(".product-list");

  if (listElement && products) {
    // Filter the array down to show only the first 4 top products
    const topProducts = products.slice(0, 4);
    renderProductList(topProducts, listElement);
  }
}

init();