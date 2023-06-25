const swiper = new Swiper('.swiper', {
  // Default parameters
  slidesPerView: 4,
  spaceBetween: 42,
  // Responsive breakpoints
  breakpoints: {

    320: {
      slidesPerView: 1,
      spaceBetween: 12
    },

    380: {
      slidesPerView: 1,
      spaceBetween: 15
    },

    480: {
      slidesPerView: 1,
      spaceBetween: 20
    },

    960: {
      slidesPerView: 1,
      spaceBetween: 25
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

});