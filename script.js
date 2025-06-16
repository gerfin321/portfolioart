/* ===== PRICE TABLES (discounted + old) ===== */
const discount = {
  sketch : { head:2,  halfbody:4,  fullbody:6  },
  full   : { head:4,  halfbody:8,  fullbody:12 }
};
const old = {
  sketch : { head:5,  halfbody:7,  fullbody:9  },
  full   : { head:10, halfbody:14, fullbody:18 }
};

/* ===== HELPERS ===== */
const $ = id => document.getElementById(id);
function showBasePrice(){
  const style = $('style').value;
  const type  = $('type').value;
  const newP  = discount[style][type];
  const oldP  = old[style][type];
  $('basePrice').innerHTML =
    `<strong>$${newP}</strong><del>$${oldP}</del>`;
}

/* ===== MAIN CALCULATION ===== */
function calc(){
  const style      = $('style').value;
  const type       = $('type').value;
  const chars      = Math.max(1, +$('chars').value);
  const arts       = Math.max(1, +$('arts').value);
  const bg         = +$('bg').value;
  const nsfw       = +$('nsfw').value;
  const express    = $('express').checked;
  const commercial = $('commercial').checked;

  let price = discount[style][type];

  /* extra characters (-20 % cheaper for each EXTRA char, i.e. +0.8×) */
  if(chars > 1) price += discount[style][type] * 0.8 * (chars - 1);

  /* background flat fee */
  price += bg;

  /* multipliers */
  price *= nsfw;
  if(express)    price *= 1.5;
  if(commercial) price *= 2;

  /* multiple arts: first full price, each next −20 % */
  let total = price;
  for(let i=2;i<=arts;i++) total += price*0.8;

  /* round to cents */
  total = Math.round(total*100)/100;
  $('total').textContent = `$${total}`;

  /* ETA text */
  $('eta').textContent = express ? '⏱ Express: ~1 day'
                                 : '🕒 Avg waiting: ~1 week';
  showBasePrice();
}

/* ===== EVENTS ===== */
['style','type','chars','arts','bg','nsfw','express','commercial']
  .forEach(id => $(id).addEventListener('input',calc));

/* init */
document.addEventListener('DOMContentLoaded', ()=>{showBasePrice();calc();});
