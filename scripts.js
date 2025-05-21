(function () {
  "use strict";

  function initCarousel(gallery) {
    if (gallery.classList.contains('carousel-initialized')) {
      return;
    }

    const cards = Array.from(gallery.querySelectorAll('.notion-collection-card'));
    if (cards.length <= 1) {
      return;
    }

    gallery.classList.add('carousel-initialized');

    const track = document.createElement('div');
    track.className = 'carousel-track';
    cards.forEach(card => track.appendChild(card));
    gallery.innerHTML = '';
    gallery.appendChild(track);

    const prevButton = document.createElement('button');
    prevButton.className = 'carousel-prev';
    prevButton.innerHTML = '\u2039';

    const nextButton = document.createElement('button');
    nextButton.className = 'carousel-next';
    nextButton.innerHTML = '\u203A';

    gallery.appendChild(prevButton);
    gallery.appendChild(nextButton);
    gallery.classList.add('carousel');

    let currentIndex = 0;
    const update = () => {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    prevButton.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + cards.length) % cards.length;
      update();
    });

    nextButton.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % cards.length;
      update();
    });

    update();
  }

  function initLargeGalleryCarousels() {
    const galleries = document.querySelectorAll('.notion-collection-gallery.large');
    galleries.forEach(initCarousel);
  }

  document.addEventListener('DOMContentLoaded', () => {
    initLargeGalleryCarousels();

    const observer = new MutationObserver(() => {
      initLargeGalleryCarousels();
    });

    observer.observe(document.body, { childList: true, subtree: true });
  });
})();
