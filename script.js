<!-- script.js -->
  <script src="script.js"></script>
</body>
</html>

<!-- script.js -->
<script>
function calc() {
  const basePrices = { head: 5, halfbody: 7, fullbody: 9 };
  const type = document.getElementById('type').value;
  const basePrice = basePrices[type];

  let characters = parseInt(document.getElementById('characters').value) || 1;
  let bg = parseFloat(document.getElementById('bg').value) || 0;
  let nsfw = parseFloat(document.getElementById('nsfw').value) || 0;
  let express = document.getElementById('express').checked;
  let commercial = document.getElementById('commercial').checked;

  // Calculate base additions
  let price = basePrice;
  if (characters > 1) price += basePrice * 0.8 * (characters - 1);
  price += bg;
  if (express) price += basePrice * 0.5;
  if (commercial) price += basePrice * 1.0;

  // Apply NSFW percentage to the resulting price
  if (nsfw > 0) price = price * (1 + nsfw);

  let total = Math.round(price * 100) / 100;
  document.getElementById('total').textContent = '$' + total;

  const timeDiv = document.getElementById('time');
  if (express) {
    timeDiv.innerHTML = "⏱️ <span style='color:var(--accent);'>Express: 1 day</span>";
  } else {
    timeDiv.innerHTML = "🕒 <span>Average waiting time: 1 week</span>";
  }
}

['type', 'characters', 'bg', 'nsfw', 'express', 'commercial'].forEach(id => {
  const el = document.getElementById(id);
  el.addEventListener('input', calc);
  el.addEventListener('change', calc);
});

calc();

// Tooltip and lightbox logic remains unchanged
const tooltip = document.getElementById('tooltip');
// ... rest of tooltip/lightbox code ...
</script>
