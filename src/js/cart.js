import { getLocalStorage, setLocalStorage, loadHeaderFooter } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems) {
    if (!cartItems || cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = "<p>Your cart is empty.</p>";
    return;
  }
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
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



function setupCartEvents() {
  const parent = document.querySelector(".product-list");

  parent.addEventListener("click", (event) => {
    const itemId = event.target.dataset.id;

    let cartItems = getLocalStorage("so-cart") || [];

    // INCREASE
    if (event.target.classList.contains("increase")) {

      cartItems = cartItems.map((item) => {

        if (item.Id === itemId) {
          item.Quantity += 1;
        }

        return item;
      });
    }

    // DECREASE
    if (event.target.classList.contains("decrease")) {

      cartItems = cartItems.map((item) => {

        if (item.Id === itemId && item.Quantity > 1) {
          item.Quantity -= 1;
        }

        return item;
      });
    }

    // DELETE
    if (event.target.classList.contains("cart-card__delete")) {

      cartItems = cartItems.filter(
        (item) => item.Id !== itemId
      );
    }

    setLocalStorage("so-cart", cartItems);

    renderCartContents();
    const areItems = displayCartQuantity();
    checkCart(areItems);
  });
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
    badge.classList.add("cart-badge");
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

  const cartItems = getLocalStorage("so-cart") || [];
  const total = cartItems.reduce((sum, item) => 
    sum + (item.FinalPrice || 0) * (item.Quantity || 1), 0
  );

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
  setupCartEvents();
  const areItems = displayCartQuantity();
  checkCart(areItems);
}

init();

function checkCart (areItems) {
  const cartItems = getLocalStorage("so-cart");
  const cartFooter = document.querySelector(".cart-footer");
  if (areItems == true) {
    cartFooter.style.display = "block";
  }
  let total = 0;
  cartItems.map((item) => { 
    total += item.FinalPrice * item.Quantity;
  });
  cartFooter.innerHTML = `Total: ${total.toFixed(2)}$`;
}

