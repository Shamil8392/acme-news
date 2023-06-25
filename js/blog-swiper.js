const swiper = new Swiper('.swiper', {
  // Default parameters
  slidesPerView: 4,
  spaceBetween: 42,
  // Responsive breakpoints
  breakpoints: {

    320: {
      slidesPerView: 1,
      spaceBetween: 25,
      grid: {
        rows: 4,
      }
    },

    380: {
      slidesPerView: 1,
      spaceBetween: 30,
      grid: {
        rows: 4,
      }
    },

    960: {
      slidesPerView: 1,
      spaceBetween: 77,
      grid: { 
        rows: 4,
      }
    },

    1024: {
      slidesPerView: 3,
      spaceBetween: 25
    },

    1280: {
      slidesPerView: 4,
      spaceBetween: 25
    },

    1440: {
      slidesPerView: 4,
      spaceBetween: 25
    },

    1536: {
      slidesPerView: 4,
      spaceBetween: 30
    },

    1600: {
      slidesPerView: 4,
      spaceBetween: 35
    },
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },

  mousewheel: {
    invert: true,
  },

  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  }

});