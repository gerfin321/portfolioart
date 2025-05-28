document.addEventListener('DOMContentLoaded', () => {
  function calc() {
    const basePrices = { head: 5, halfbody: 7, fullbody: 9 };
    const type = document.getElementById('type').value;
    const basePrice = basePrices[type] || 0;

    let characters = parseInt(document.getElementById('characters').value) || 1;
    let arts       = parseInt(document.getElementById('arts').value)       || 1;
    let bg         = parseFloat(document.getElementById('bg').value)      || 0;
    let nsfw       = document.getElementById('nsfw').value;
    let express    = document.getElementById('express').checked;
    let commercial = document.getElementById('commercial').checked;

    // Base price per art
    let pricePerArt = basePrice;
    if (characters > 1) {
      pricePerArt += basePrice * 0.8 * (characters - 1);
    }
    pricePerArt += bg;

    // NSFW multipliers
    if (nsfw === 'mild') {
      pricePerArt *= 1.5;
    } else if (nsfw === 'explicit') {
      pricePerArt *= 2;
    }

    // Express & Commercial multipliers
    if (express)    pricePerArt *= 2;
    if (commercial) pricePerArt *= 2;

    // Calculate total with 20% discount on each additional art
    let total = pricePerArt;
    for (let i = 2; i <= arts; i++) {
      total += pricePerArt * 0.8;
    }
    total = Math.round(total * 100) / 100;
    document.getElementById('total').textContent = '$' + total;

    // Update waiting time display
    const timeDiv = document.getElementById('time');
    timeDiv.innerHTML = express
      ? "⏱️ <span style='color:var(--accent);'>Express: 1 day</span>"
      : "🕒 <span>Average waiting time: 1 week</span>";
  }

  // Attach calc() to all relevant inputs
  ['type','characters','arts','bg','nsfw','express','commercial'].forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener('input', calc);
    el.addEventListener('change', calc);
  });

  calc(); // initial calculation

  // Tooltip logic
  const tooltip = document.getElementById('tooltip');
  document.querySelectorAll('.help-btn').forEach(btn => {
    btn.addEventListener('mouseenter', e => {
      tooltip.textContent = btn.getAttribute('data-tooltip');
      tooltip.style.display = 'block';
      positionTooltip(e);
    });
    btn.addEventListener('mousemove', positionTooltip);
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
    tooltip.style.top  = y + 'px';
  }

  // Lightbox logic
  const artCards      = document.querySelectorAll('.art-card img');
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxClose = document.getElementById('lightbox-close');

  artCards.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      const titleEl = img.closest('.art-card').querySelector('.art-title');
      lightboxTitle.textContent = titleEl ? titleEl.textContent : '';
      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.style.display       = 'none';
    document.body.style.overflow = '';
    lightboxImg.src              = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox-bg').addEventListener('click', closeLightbox);
  document.addEventListener('keydown', e => {
    if (lightbox.style.display === 'flex' && (e.key === 'Escape' || e.key === 'Esc')) {
      closeLightbox();
    }
  });
});
