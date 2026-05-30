import { getLocalStorage, setLocalStorage, loadHeaderFooter } from "./utils.mjs";

// Guard: only run cart code if we're on the cart page
function isCartPage() {
  return document.querySelector(".product-list") !== null && 
         document.querySelector(".cart-footer") !== null;
}

// Display all cart items on the page
function renderCartContents() {
  const productList = document.querySelector(".product-list");
  if (!productList) return;

  const cartItems = getLocalStorage("so-cart");

  if (!cartItems || cartItems.length === 0) {
    productList.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  productList.innerHTML = htmlItems.join("");
}

// Generate HTML for a single cart item
function cartItemTemplate(item) {
  const qty = item.Quantity || 1;
  const totalPrice = (item.FinalPrice * qty).toFixed(2);
  
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Images.PrimaryMedium}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors?.[0]?.ColorName || "No Color"}</p>
    <div class="cart-card__quantity">
      <button class="quantity-btn decrease" data-id="${item.Id}">-</button>
      <span>Qty: ${qty}</span>
      <button class="quantity-btn increase" data-id="${item.Id}">+</button>
    </div>
    <p class="cart-card__price">$${totalPrice}</p>
    <button class="cart-card__delete" data-id="${item.Id}">Delete</button>
  </li>`;
}

// Set up click events for cart actions
function setupCartEvents() {
  const parent = document.querySelector(".product-list");
  if (!parent) return;

  parent.addEventListener("click", (event) => {
    const itemId = event.target.dataset.id;
    let cartItems = getLocalStorage("so-cart") || [];

    if (event.target.classList.contains("increase")) {
      cartItems = cartItems.map((item) => {
        if (item.Id === itemId) item.Quantity += 1;
        return item;
      });
    }

    if (event.target.classList.contains("decrease")) {
      cartItems = cartItems.map((item) => {
        if (item.Id === itemId && item.Quantity > 1) item.Quantity -= 1;
        return item;
      });
    }

    if (event.target.classList.contains("cart-card__delete")) {
      cartItems = cartItems.filter((item) => item.Id !== itemId);
    }

    setLocalStorage("so-cart", cartItems);
    renderCartContents();
    const areItems = displayCartQuantity();
    checkCart(areItems);
  });
}

// Display the number of items in the cart badge
export function displayCartQuantity() {
  const cartItems = getLocalStorage("so-cart");
  const badge = document.querySelector(".cart-items-count");

  if (!cartItems || cartItems.length === 0) {
    if (badge) badge.style.display = "none";
    return false;
  }

  // Count total quantity, not just unique items
  const totalQuantity = cartItems.reduce((sum, item) => sum + (item.Quantity || 1), 0);

  if (badge) {
    badge.textContent = totalQuantity;
    badge.classList.add("cart-badge");
  }

  return true;
}

// Show cart total and checkout button
function checkCart(areItems) {
  const cartFooter = document.querySelector(".cart-footer");
  if (!cartFooter) return;

  if (!areItems) {
    cartFooter.style.display = "none";
    return;
  }

  cartFooter.style.display = "block";

  const cartItems = getLocalStorage("so-cart") || [];
  const total = cartItems.reduce(
    (sum, item) => sum + (item.FinalPrice || 0) * (item.Quantity || 1),
    0
  );

  cartFooter.innerHTML = `
    <p class="cart-total">Total: $${total.toFixed(2)}</p>
    <a href="/checkout/index.html">
      <button class="checkout-btn">Checkout</button>
    </a>
  `;
}

// Initialize the cart page
async function init() {
  await loadHeaderFooter();

  if (isCartPage()) {
    renderCartContents();
    setupCartEvents();
    const areItems = displayCartQuantity();
    checkCart(areItems);
  } else {
    displayCartQuantity();
  }
}

init();