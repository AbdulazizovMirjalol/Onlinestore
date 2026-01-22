(() => {
  const range = document.querySelector('.shop-filter input[type="range"]');
  const cards = Array.from(document.querySelectorAll('.product-card'));
  if (!range || cards.length === 0) return;

  const priceStrong = document.querySelector('.price-range strong');
  const minSpan = document.querySelector('.price-range span:first-child');
  const maxSpan = document.querySelector('.price-range span:last-child');
  const resultsEl = document.querySelector('.results');
  const viewAllLink = document.querySelector('.view-all');

  if (minSpan) minSpan.textContent = `$${range.min}`;
  if (maxSpan) maxSpan.textContent = `$${range.max}`;

  const url = new URL(window.location.href);
  const maxFromUrl = url.searchParams.get('max');
  if (maxFromUrl && !Number.isNaN(Number(maxFromUrl))) range.value = String(Number(maxFromUrl));

  function getPrice(card) {
    const v = Number(card.dataset.price);
    if (!Number.isNaN(v)) return v;

    const txt = card.querySelector('.price .new')?.textContent || '';
    const cleaned = txt.replace(/[^\d.]/g, '');
    const n = Number(cleaned);
    return Number.isNaN(n) ? null : n;
  }

  const total = cards.length;

  function applyFilter() {
    const max = Number(range.value);
    if (priceStrong) priceStrong.textContent = `$${max}`;

    let shown = 0;
    for (const card of cards) {
      const price = getPrice(card);
      const ok = price !== null && price <= max;
      card.style.display = ok ? '' : 'none';
      if (ok) shown += 1;
    }

    if (resultsEl) resultsEl.textContent = `Showing ${shown} of ${total} results`;

    const u = new URL(window.location.href);
    u.searchParams.set('max', String(max));
    history.replaceState({}, '', u);
  }

  range.addEventListener('input', applyFilter);
  range.addEventListener('change', applyFilter);

  viewAllLink?.addEventListener('click', (e) => {
    e.preventDefault();
    range.value = range.max;
    const u = new URL(window.location.href);
    u.searchParams.delete('max');
    history.replaceState({}, '', u);
    applyFilter();
  });

  applyFilter();
})();
