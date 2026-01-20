const CART_KEY = "cart";

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || []; // localStorage dan cart ni oladi
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart)); // cart ni localStorage ga saqlaydi
}

function money(n) {
  return "$" + n;
}

function calcTotal(cart) {
  return cart.reduce((sum, p) => sum + p.price * p.qty, 0);
}

function renderCart() {
  const cart = getCart();
  const listEl = document.getElementById("cartList");
  const totalEl = document.getElementById("totalPrice");

  if (!listEl) return;

  if (cart.length === 0) {
    listEl.innerHTML = `
      <div class="item">
        <div>
          <h3>Sizning savatingiz bo'sh</h3>
          <div class="meta">Bosh sahifa / Mahsulotlar sahifasidan mahsulot qo'shing</div>
        </div>
      </div>
    `;
    if (totalEl) totalEl.textContent = money(0);
    return;
  }

  // items
  listEl.innerHTML = cart
    .map(
      (p) => `
      <div class="item" data-id="${p.id}">
        <img src="${p.img || ""}" alt="" style="width:100px;height:100px;object-fit:contain;">
        <div>
          <h3>${p.title}</h3>
          <div class="meta">
            ${money(p.price)} x ${p.qty} = <b>${money(p.price * p.qty)}</b>
          </div>
        </div>

        <div class="controls">
          <button class="btn-icon minus">-</button>
          <span class="qty">${p.qty}</span>
          <button class="btn-icon plus">+</button>
          <button class="btn-icon remove"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
    `,
    )
    .join("");

  if (totalEl) totalEl.textContent = money(calcTotal(cart));
}

document.addEventListener("click", (e) => {
  const row = e.target.closest(".item");
  if (!row) return;

  let cart = getCart();
  const id = Number(row.dataset.id);
  const item = cart.find((p) => p.id === id);
  if (!item) return;

  if (e.target.closest(".plus")) {
    item.qty += 1;
  } else if (e.target.closest(".minus")) {
    item.qty -= 1;
    if (item.qty <= 0) cart = cart.filter((p) => p.id !== id);
  } else if (e.target.closest(".remove")) {
    cart = cart.filter((p) => p.id !== id);
  } else {
    return;
  }

  saveCart(cart);
  renderCart();
});

document.getElementById("clearBtn")?.addEventListener("click", () => {
  saveCart([]);
  renderCart();
});

//boshlash
renderCart();
