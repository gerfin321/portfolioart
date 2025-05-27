// script.js

document.addEventListener('DOMContentLoaded', () => {
  // ----- Лайтбокс -----
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbTitle = document.getElementById('lightbox-title');
  const lbClose = document.getElementById('lightbox-close');
  document.querySelectorAll('.art-card').forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      lbImg.src = img.src;
      lbTitle.textContent = card.querySelector('.art-title').textContent;
      lightbox.style.display = 'flex';
    });
  });
  lbClose.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) lightbox.style.display = 'none';
  });

  // ----- Слайдер 3×2 -----
  const galleryCards = Array.from(document.querySelectorAll('.gallery .art-card'));
  const slidesContainer = document.querySelector('.slides');
  const perSlide = 6; // 3×2
  let index = 0;

  // разбиваем на страницы
  for (let i = 0; i < galleryCards.length; i += perSlide) {
    const slide = document.createElement('div');
    slide.classList.add('slide');
    galleryCards.slice(i, i + perSlide).forEach(card => {
      // клонируем карточку
      slide.appendChild(card.cloneNode(true));
    });
    slidesContainer.appendChild(slide);
  }
  const slides = Array.from(document.querySelectorAll('.slide'));
  const total = slides.length;

  // кнопки
  document.querySelector('.slider-btn.prev').addEventListener('click', () => {
    index = (index - 1 + total) % total;
    updateSlider();
  });
  document.querySelector('.slider-btn.next').addEventListener('click', () => {
    index = (index + 1) % total;
    updateSlider();
  });

  function updateSlider() {
    const width = slidesContainer.parentElement.offsetWidth;
    slidesContainer.style.transform = `translateX(-${index * width}px)`;
  }

  // инициализация
  if (total > 0) {
    updateSlider();
  } else {
    document.querySelectorAll('.slider-btn').forEach(b => b.style.display = 'none');
  }
});
