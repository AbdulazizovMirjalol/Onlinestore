const DB_KEY = "products_db";

function getDB() {
  return JSON.parse(localStorage.getItem(DB_KEY)) || {};
}
function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

// card ichidan ma'lumot yig'ish (HTML'dan)
function collectProduct(card) {
  const id = Number(card.dataset.id);
  const title = card.dataset.title;
  const price = Number(card.dataset.price);
  const img = card.dataset.img;
  const oldPrice = Number(card.dataset.oldPrice);

  const ratingCountText = card.querySelector(".rating")?.textContent || "";
  const ratingCount = Number(ratingCountText.replace(/[^\d]/g, "")) || null;

  return { id, title, price, img, oldPrice, ratingCount };
}

document.addEventListener("click", (e) => {
  if (e.target.closest(".add-to-cart")) return;
  const card = e.target.closest(".product-card");
  if (!card) return;

  const product = collectProduct(card);
  if (!product.id) return;

  const db = getDB();
  db[product.id] = product;
  saveDB(db);
  window.location.href = `./products-detail.html?id=${product.id}`;
});
