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

  // Шаг 1: базовая цена за арт
  let pricePerArt = basePrice;

  // Шаг 2: доп. персонажи
  if (characters > 1) {
    pricePerArt += basePrice * 0.8 * (characters - 1);
  }

  // Шаг 3: фон
  pricePerArt += bg;

  // Шаг 4: считаем цену всех артов (первый - 100%, остальные - по 80%)
  let total = pricePerArt;
  for (let i = 2; i <= arts; i++) {
    total += pricePerArt * 0.8;
  }

  // Шаг 5: применяем надбавки к полной сумме
  total *= (1 + nsfw);
  if (express) total *= 1.5;
  if (commercial) total *= 2.0;

  total = Math.round(total * 100) / 100;
  document.getElementById('total').textContent = '$' + total;

  const timeDiv = document.getElementById('time');
  if (express) {
    timeDiv.innerHTML = "⏱️ <span style='color:var(--accent);'>Express: 1 day</span>";
  } else {
    timeDiv.innerHTML = "🕒 <span>Average waiting time: 1 week</span>";
  }
}
