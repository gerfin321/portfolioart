// Калькулятор (автоматически при изменении любого поля)
function calc() {
  const basePrices = { head: 5, halfbody: 7, fullbody: 9 };
  const type = document.getElementById('type').value;
  const basePrice = basePrices[type];

  let characters = parseInt(document.getElementById('characters').value) || 1;
  let arts = parseInt(document.getElementById('arts').value) || 1;
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

  let total = pricePerArt;
  for (let i = 2; i <= arts; i++) total += pricePerArt * 0.8;

  total = Math.round(total * 100) / 100;
  document.getElementById('total').textContent = '$' + total;

  // Сроки
  const timeDiv = document.getElementById('time');
  if (express) {
    timeDiv.innerHTML = "⏱️ <span style='color:var(--accent);'>Express: 1 day</span>";
  } else {
    timeDiv.innerHTML = "🕒 <span>Average waiting time: 1 week</span>";
  }
}

// Обработка изменения всех полей для автоматического подсчёта
['type','characters','arts','bg','nsfw','express','commercial'].forEach(id => {
  document.getElementById(id).addEventListener('input', calc);
  document.getElementById(id).addEventListener('change', calc);
});
calc();

// Tooltip
const tooltip = document.getElementById('tooltip');
document.querySelectorAll('.help-btn').forEach(btn => {
  btn.addEventListener('mouseenter', e => {
    tooltip.innerHTML = btn.getAttribute('data-tooltip');
    tooltip.style.display = 'block';
    positionTooltip(e);
  });
  btn.addEventListener('mousemove', e => positionTooltip(e));
  btn.addEventListener('mouseleave', () => {
    tooltip.style.display = 'none';
  });
});
function positionTooltip(e) {
  const pad = 12;
  let x = e.clientX + pad;
  let y = e.clientY + pad;
  if (window.innerWidth - x < 260) x = window.innerWidth - 260 - pad;
  tooltip.style.left = x + 'px';
  tooltip.style.top = y + 'px';
}
