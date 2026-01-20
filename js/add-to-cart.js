const CART_KEY = "cart";
const habar = document.querySelector(".habar");

function showHabar() {
  habar.classList.remove("d-none");

  setTimeout(() => {
    habar.classList.add("d-none");
  }, 2000);
}

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".add-to-cart");
  if (!btn) return;

  const card = btn.closest(".product-card");
  if (!card) return;

  const id = Number(card.dataset.id);
  const title = card.dataset.title;
  const price = Number(card.dataset.price);
  const img = card.dataset.img;

  let cart = getCart();
  showHabar();
  const found = cart.find((p) => p.id === id);
  if (found) found.qty += 1;
  else cart.push({ id, title, price, img, qty: 1 });

  saveCart(cart);
});
