document.addEventListener("DOMContentLoaded", () => {
  const faqSection = document.querySelector(".faq-section");
  if (!faqSection) return;

  const items = faqSection.querySelectorAll(".faq-item");

  const closeAll = () => {
    items.forEach((i) => i.classList.remove("active"));
  };

  // FAQ item bosilganda: bittasi ochilib, boshqasi yopiladi
  items.forEach((item) => {
    item.addEventListener("click", () => {
      items.forEach((i) => {
        if (i !== item) i.classList.remove("active");
      });
      item.classList.toggle("active");
    });
  });

  // FAQ’dan tashqariga bosilsa: hammasi yopiladi
  document.addEventListener("click", (e) => {
    const clickedInsideFaq = e.target.closest(".faq-section");
    if (!clickedInsideFaq) closeAll();
  });

  // (ixtiyoriy) ESC bossangiz ham yopilsin
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll();
  });
});
