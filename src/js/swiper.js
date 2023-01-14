const swiper = new Swiper(".mySwiper", {
  slidesPerView: "auto",
  breakpoints: {
    0: {
      spaceBetween: 10,
    },
    992: {
      spaceBetween: 20,
    },
  },
});

const swiperTestimonial = new Swiper(".testimonial_swiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: {
      allowTouchMove: true,
    },
    768: {
      allowTouchMove: false,
    },
  },
});

const swiperShop = new Swiper(".shop_swiper", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 50,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
  },
});
