import { getLocalStorage, setLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="/product_pages/?product=${item.Id}" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="/product_pages/?product=${item.Id}">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <div class="cart-card__quantity">
      <button 
        class="quantity-btn decrease" 
        data-id="${item.Id}">
        -
      </button>
      <span>Qty:${item.Quantity}</span>
      <button 
        class="quantity-btn increase" 
        data-id="${item.Id}">
        +
      </button>
    </div>
  <p class="cart-card__price">$${(item.FinalPrice * item.Quantity).toFixed(2)}</p>
  <button class="cart-card__delete" id="${item.Id}">&times;</button>
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
  });
}

renderCartContents();
setupCartEvents();

