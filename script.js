function calc() {
  const basePrices = { head: 5, halfbody: 7, fullbody: 9 };
  const type = document.getElementById('type').value;
  const basePrice = basePrices[type];
  let characters = parseInt(document.getElementById('characters').value) || 1;
  let arts = parseInt(document.getElementById('arts').value) || 1;
  let bg = parseFloat(document.getElementById('bg').value) || 0;
  let nsfw = parseInt(document.getElementById('nsfw').value) || 0;
  let express = document.getElementById('express').checked;
  let commercial = document.getElementById('commercial').checked;

  // 1. Рассчитываем цену одного арта
  let pricePerArt = basePrice;
  if (characters > 1) {
    pricePerArt += basePrice * 0.8 * (characters - 1);
  }
  pricePerArt += bg;

  // 2. Общая сумма с учётом количества артов
  let total = pricePerArt;
  for (let i = 2; i <= arts; i++) {
    total += pricePerArt * 0.8;
  }

  // 3. Применяем множители
  if (nsfw === 2) total *= 2;       // Mild NSFW
  else if (nsfw === 3) total *= 3;  // Explicit NSFW

  if (commercial) total *= 2;
  if (express) total *= 1.5;

  total = Math.round(total * 100) / 100;
  document.getElementById('total').textContent = '$' + total;

  const timeDiv = document.getElementById('time');
  if (express) {
    timeDiv.innerHTML = "⏱️ <span style='color:var(--accent);'>Express: 1 day</span>";
  } else {
    timeDiv.innerHTML = "🕒 <span>Average waiting time: 1 week</span>";
  }
}
