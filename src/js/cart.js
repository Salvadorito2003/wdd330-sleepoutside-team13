import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  }
  deleteItem(cartItems)
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors?.[0]?.ColorName || "No Color"}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button class="cart-card__delete" id="${item.Id}">&times;</button>
</li>`;

  return newItem;
}

function deleteItem(cartItems) {
  const parent = document.querySelector(".product-list");

  parent.addEventListener("click", (event) => {
    if (event.target.classList.contains("cart-card__delete")) {
      const itemId = event.target.id;

      cartItems = cartItems.filter(item => item.Id !== itemId);

      setLocalStorage("so-cart", cartItems);

      renderCartContents();
    }
  })
}
renderCartContents();
