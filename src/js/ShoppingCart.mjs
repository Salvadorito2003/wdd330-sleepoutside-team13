import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
  // Get image from API or old format
  const image = item.Images?.PrimaryMedium || item.Image || "";
  
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors?.[0]?.ColorName || "No Color"}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentElement = document.querySelector(parentSelector);
  }

  init() {
    const cartItems = getLocalStorage(this.key) || [];
    this.renderCart(cartItems);
  }

  renderCart(cartItems) {
    renderListWithTemplate(cartItemTemplate, this.parentElement, cartItems, "afterbegin", true);
  }
}
