const DB_KEY = "products_db";
const CART_KEY = "cart";

function getDB() {
  return JSON.parse(localStorage.getItem(DB_KEY)) || {};
}

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function getIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return Number(params.get("id"));
}

function renderNotFound() {
  const el = document.getElementById("detail");
  if (!el) return;
  el.innerHTML = `
    <div style="padding:16px;background:#fff;border:1px solid #eee;border-radius:12px;">
      <h2>Product topilmadi</h2>
      <p>Oldin product bosib keyin detailga kiring.</p>
    </div>
  `;
}

function renderProduct(p) {
  const el = document.getElementById("detail");
  if (!el) return;

  el.innerHTML = `
    <div class="box">
      <div class="img">
        <img src="${p.img}" alt="${p.title}">
      </div>

      <div class="info">
        <h2>${p.title}</h2>

        <div class="prices">
          <span class="new">$${p.price}</span>
          ${p.oldPrice ? `<span class="old">$${p.oldPrice}</span>` : ""}
        </div>

        ${p.ratingCount ? `<div class="rating">Reviews: ${p.ratingCount}</div>` : ""}

        <button class="btn" id="addDetailToCart">Add to cart</button>
      </div>
    </div>
  `;

  document.getElementById("addDetailToCart")?.addEventListener("click", () => {
    let cart = getCart();
    const found = cart.find((x) => x.id === p.id);
    if (found) found.qty += 1;
    else
      cart.push({
        id: p.id,
        title: p.title,
        price: p.price,
        img: p.img,
        qty: 1,
      });
    saveCart(cart);
    alert("Savatga qo‘shildi!");
  });
}

// start
const id = getIdFromUrl();
const db = getDB();
const product = db[id];

if (!id || !product) renderNotFound();
else renderProduct(product);
