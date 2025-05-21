(function () {
  "use strict";

  function initLargeGalleryCarousel() {
    const galleries = document.querySelectorAll('.notion-collection-gallery.large');
    galleries.forEach(gallery => {
      const cards = Array.from(gallery.querySelectorAll('.notion-collection-card'));
      if (cards.length <= 1) {
        return;
      }

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
    });
  }

  document.addEventListener('DOMContentLoaded', initLargeGalleryCarousel);
})();
