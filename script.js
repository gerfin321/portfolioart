document.addEventListener('DOMContentLoaded', () => {

  /* === price tables === */
  const basePrices = {
    sketch:{ head:2,  halfbody:4,  fullbody:6  },
    full:  { head:4,  halfbody:8,  fullbody:12 }
  };
  const oldPrices = {
    sketch:{ head:5,  halfbody:7,  fullbody:9  },
    full:  { head:10, halfbody:14, fullbody:18 }
  };

  /* === calculator === */
  function updatePriceDisplay(){
    const style = document.getElementById('artstyle').value;
    const type  = document.getElementById('type').value;
    const newP  = basePrices[style][type];
    const oldP  = oldPrices[style][type];
    document.getElementById('price-display').innerHTML =
      `<strong>$${newP}</strong> <span class="old-price">$${oldP}</span>`;
  }

  function calc(){
    const style      = document.getElementById('artstyle').value;
    const type       = document.getElementById('type').value;
    const characters = +document.getElementById('characters').value || 1;
    const arts       = +document.getElementById('arts').value       || 1;
    const bg         = +document.getElementById('bg').value         || 0;
    const nsfwMult   = +document.getElementById('nsfw').value;
    const express    = document.getElementById('express').checked;
    const commercial = document.getElementById('commercial').checked;

    let pricePerArt = basePrices[style][type];

    /* extra characters */
    if(characters>1){
      pricePerArt += basePrices[style][type]*0.8*(characters-1);
    }

    /* background */
    pricePerArt += bg;

    /* coefficients */
    pricePerArt *= nsfwMult;
    if(express)    pricePerArt *= 1.5;
    if(commercial) pricePerArt *= 2;

    /* multiple artworks (-20 % каждое следующее) */
    let total = pricePerArt;
    for(let i=2;i<=arts;i++){ total += pricePerArt*0.8; }

    /* round & output */
    total = Math.round(total*100)/100;
    document.getElementById('total').textContent = '$'+total;

    /* time label */
    document.getElementById('time').innerHTML =
      express ? "⏱️ <span style='color:var(--accent)'>Express: 1 day</span>"
              : "🕒 Average waiting time: 1 week";

    updatePriceDisplay();
  }

  /* attach listeners */
  ['artstyle','type','characters','arts','bg','nsfw','express','commercial']
    .forEach(id=>{
      const el=document.getElementById(id);
      el.addEventListener('input',calc);
      el.addEventListener('change',calc);
    });

  updatePriceDisplay();
  calc();

  /* === tooltips remain unchanged (если нужны, можно оставить старый код) === */
  /* === lightbox remain unchanged === */

  /* === gallery slider logic === */
  const cards = Array.from(document.querySelectorAll('.art-card'));
  const pageSize = 6;
  const pageCount = Math.ceil(cards.length/pageSize);
  let page = 0;

  function showPage(p){
    page = ((p%pageCount)+pageCount)%pageCount; // циклически
    cards.forEach((card,i)=>{
      card.style.display = Math.floor(i/pageSize)===page ? 'flex' : 'none';
    });
  }
  showPage(0);

  document.querySelector('.gallery-arrow.prev')
    .addEventListener('click',()=>showPage(page-1));
  document.querySelector('.gallery-arrow.next')
    .addEventListener('click',()=>showPage(page+1));

});
