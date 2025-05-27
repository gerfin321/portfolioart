// script.js
document.addEventListener('DOMContentLoaded', () => {
  const typeEl = document.getElementById('type');
  const extraCharsEl = document.getElementById('extraChars');
  const bgPriceEl = document.getElementById('bgPrice');
  const nsfwEl = document.getElementById('nsfw');
  const expressEl = document.getElementById('express');
  const commercialEl = document.getElementById('commercial');
  const priceEl = document.getElementById('price');

  function calculatePrice() {
    let base = parseFloat(typeEl.value);
    let extras = parseInt(extraCharsEl.value, 10) * 0.8 * base;
    let bg = parseFloat(bgPriceEl.value);
    let subtotal = base + extras + bg;
    subtotal *= (1 + parseFloat(nsfwEl.value));
    if (expressEl.checked) subtotal *= 1.5;
    if (commercialEl.checked) subtotal *= 2;
    priceEl.textContent = '$' + subtotal.toFixed(2);
  }

  [typeEl, extraCharsEl, bgPriceEl, nsfwEl, expressEl, commercialEl]
    .forEach(el => el.addEventListener('input', calculatePrice));

  // Initialize
  calculatePrice();

  // Gallery modal
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const modalClose = document.getElementById('modalClose');

  galleryItems.forEach(img => {
    img.addEventListener('click', () => {
      modalImg.src = img.src;
      modal.style.display = 'flex';
    });
  });

  modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});
