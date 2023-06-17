let profile = document.querySelector('.btn__settings');
let profileTotal = document.querySelector('.profile__total');

profile.addEventListener('click', () => {
  profileTotal.classList.toggle('profile--total');
});


let swiper = new Swiper('.swiper', {
  // Default parameters
  slidesPerView: 4,
  spaceBetween: 42,
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    // when window width is >= 640px
    980: {
      slidesPerView: 4,
      spaceBetween: 40
    }
  },

  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },

  mousewheel: {
    invert: true,
  },

});

// import Swiper bundle with all modules installed
import Swiper from 'swiper/bundle';

// import styles bundle
import 'swiper/css/bundle';