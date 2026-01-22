document.addEventListener("click", (e) => {
  const bars = e.target.closest(".fa-bars");
  const catalog = document.querySelector(".catalog");
  if (!catalog) return;

  if (bars) catalog.classList.toggle("open");
  else if (!catalog.contains(e.target)) catalog.classList.remove("open");
});



