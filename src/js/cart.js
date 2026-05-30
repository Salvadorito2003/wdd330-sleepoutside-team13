import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (!cartItems || cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = "<p>Your cart is empty.</p>";
    return;
  }
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Images.PrimaryMedium}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors?.[0]?.ColorName || "No Color"}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

export function displayCartQuantity() {
  const cartItems = getLocalStorage("so-cart");
  const badge = document.querySelector(".cart-items-count");
  
  if (!cartItems || cartItems.length === 0) {
    if (badge) badge.style.display = "none";
    return false;
  }
  
  if (badge) {
    badge.textContent = cartItems.length;
    badge.classList.add("cart-badge"); // Move styles to CSS
  }
  
  return true;
}

function checkCart(areItems) {
  const cartFooter = document.querySelector(".cart-footer");
  
  if (!areItems) {
    cartFooter.style.display = "none";
    return;
  }
  
  cartFooter.style.display = "block";
  
  const cartItems = getLocalStorage("so-cart");
  const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
  
  // Build the footer with total AND checkout button
  cartFooter.innerHTML = `
    <p class="cart-total">Total: $${total.toFixed(2)}</p>
    <a href="/checkout/index.html">
      <button class="checkout-btn">Checkout</button>
    </a>
  `;
}

async function init() {
  await loadHeaderFooter();
  renderCartContents();
  const areItems = displayCartQuantity();
  checkCart(areItems);
}

init();