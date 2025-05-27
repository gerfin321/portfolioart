// script.js
function calc() {
  const basePrices = { head: 5, halfbody: 7, fullbody: 9 };
  const type = document.getElementById('type').value;
  const basePrice = basePrices[type];

  let characters = parseInt(document.getElementById('characters').value) || 1;
  let bg = parseFloat(document.getElementById('bg').value) || 0;
  let nsfw = parseFloat(document.getElementById('nsfw').value) || 0;
  let express = document.getElementById('express').checked;
  let commercial = document.getElementById('commercial').checked;

  let pricePerArt = basePrice;
  if (characters > 1) pricePerArt += basePrice * 0.8 * (characters - 1);
  pricePerArt += basePrice * nsfw;
  pricePerArt += bg;
  if (express) pricePerArt += basePrice * 0.5;
  if (commercial) pricePerArt += basePrice * 1.0;

  // Всегда один арт, без цикла
  let total = Math.round(pricePerArt * 100) / 100;

  document.getElementById('total').textContent = '$' + total;

  const timeDiv = document.getElementById('time');
  if (express) {
    timeDiv.innerHTML = "⏱️ <span style='color:var(--accent);'>Express: 1 day</span>";
  } else {
    timeDiv.innerHTML = "🕒 <span>Average waiting time: 1 week</span>";
  }
}

// Оставляем только нужные поля
['type', 'characters', 'bg', 'nsfw', 'express', 'commercial'].forEach(id => {
  const el = document.getElementById(id);
  el.addEventListener('input', calc);
  el.addEventListener('change', calc);
});

calc();

// Tooltip and lightbox logic остаётся без изменений
const tooltip = document.getElementById('tooltip');
// ... остальной код тултипов и lightbox ...
