import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

await loadHeaderFooter();

// Load header and footer
loadHeaderFooter();

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

export function displayCartQuantity () {
  const cartItems = getLocalStorage("so-cart");
  console.log(cartItems);
  if (cartItems) {
    const cartQuantity = cartItems.length;
    const number = document.querySelector(".cart-items-count");
    if (number) {
      number.textContent = cartQuantity;
      number.style.display = "block";
      number.style.color = "white";
      number.style.backgroundColor = "red";
      number.style.fontSize = "15px";
      number.style.borderRadius = "50%";
    }
  }
}


renderCartContents();
displayCartQuantity();

