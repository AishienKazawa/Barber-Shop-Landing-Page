// loading markup
let poleTop = `
<div class="pole-unit mono">
  <div class="pole-top">
    <div class="ball"></div>
    <div class="cover"></div>
    <div class="band"></div>
    <div class="thin-band"></div>
  </div>
  <div class="pole-middle">
    <div class="body">
      <div class="pole"></div>
    </div>
  </div>
  <div class="pole-bottom">
    <div class="thin-band"></div>
    <div class="band"></div>
    <div class="cover"></div>
    <div class="ball"></div>
  </div>
</div>
`;

$(".loading").prepend(poleTop);

$(window).on("load", function () {
  $("#loading").fadeOut(500);
});

// register gsap library
gsap.registerPlugin(ScrollTrigger, CSSRulePlugin);

// initializing loco scroll
const scroller = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
  getSpeed: true,
  getDirection: true,
  inertia: 0.75,
});

// set a default for all scrolltrigger
ScrollTrigger.defaults({
  scroller: "main",
});

// connect to the locomotive scroll
scroller.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy("main", {
  scrollTop(value) {
    return arguments.length
      ? scroller.scrollTo(value, 0, 0)
      : scroller.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      left: 0,
      top: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
});

// fadein up animation
function revealUp(tl, selector, delay = 0) {
  tl.from(selector, {
    y: 100,
    alpha: 0,
    ease: "back.out(3)",
    stagger: 0.1,
    delay: delay,
  });
}

//header animation hide and show on scroll
const showAnim = gsap
  .from(".header", {
    yPercent: -100,
    paused: true,
    duration: 0.5,
  })
  .progress(1);

ScrollTrigger.create({
  start: "top top",
  end: 99999,
  onUpdate: (self) => {
    self.direction === -1 ? showAnim.play() : showAnim.reverse();
  },
});

// min 1200px
ScrollTrigger.matchMedia({
  "(min-width: 1200px)": () => {
    const gits = gsap.utils.toArray(".git");

    // get in touch form animation
    gits.forEach((git) => {
      let fw = git.querySelectorAll(".form_wrapper ");
      let fh = git.querySelectorAll(".form_headings > *");
      let fc = git.querySelectorAll(".form .form_control");
      let btn = git.querySelector(".submit");

      const bookTL = gsap.timeline({
        scrollTrigger: {
          trigger: git,
          start: "top center",
        },
      });

      bookTL.call(revealUp(bookTL, fw));
      bookTL.call(revealUp(bookTL, fh));
      bookTL.call(revealUp(bookTL, [fc, btn]));
    });

    // gallery images animate
    function imageReveal() {
      ScrollTrigger.create({
        trigger: ".gallery",
        animation: gsap.from(".gallery-grid > *", {
          scale: 0,
          stagger: {
            each: 0.1,
          },
        }),
        start: "top center",
      });
    }

    // footer animation
    ScrollTrigger.create({
      trigger: ".footer",
      animation: gsap.from(".footer_container > *", {
        y: 400,
        alpha: 0,
        stagger: {
          each: 0.1,
        },
      }),
      start: "10% bottom",
    });

    gsap.from(".form_touch > *", {
      y: 100,
      alpha: 0,
      ease: "back.out(3)",
      stagger: 0.1,
      delay: 0.5,
    });

    // homepage A
    if (window.location.pathname == "/") {
      // initialize
      const teamTL = new TimelineMax({
        scrollTrigger: {
          trigger: ".team",
          start: "10% center",
        },
      });

      const serviceTL = new TimelineMax({
        scrollTrigger: {
          trigger: ".service",
          start: "10% center",
        },
      });

      const pricingTL = new TimelineMax({
        scrollTrigger: {
          trigger: ".pricing",
          start: "top center",
        },
      });

      const testimonyTL = new TimelineMax({
        scrollTrigger: {
          trigger: ".testimonial",
          start: "10% center",
        },
      });

      // icons on scrub
      ScrollTrigger.create({
        trigger: ".service",
        start: "20% center",
        scrub: 1,
        animation: gsap.fromTo(
          ".service_icon path",
          {
            strokeDasharray: 197.59107971191406,
            strokeDashoffset: 197.59107971191406,
          },
          {
            strokeDashoffset: 0,
            duration: 1,
            ease: "power3.out",
          },
          "+=.4"
        ),
      });

      // service section cross line animate
      serviceTL.from(".service_category", {
        "--expand": 0,
      });

      // text revealed
      serviceTL.call(
        revealUp(serviceTL, ".service_category > *:not(.service_icon)")
      );

      // team section accent background
      teamTL.from(".team", {
        "--accent": "100vw",
        duration: 1,
        ease: "power4.out",
      });

      //team headline
      teamTL.from(
        ".team.a .team_container > .headline",
        {
          x: 100,
          alpha: 0,
        },
        "-=.5"
      );

      teamTL.from([".member .img_wrapper"], {
        y: 100,
        alpha: 0,
        stagger: {
          each: 0.3,
          ease: "power4.inOut",
        },
      });
      teamTL.call(revealUp(teamTL, ".member_name"));
      teamTL.call(revealUp(teamTL, ".member_soc > *"));

      //headings
      pricingTL.call(revealUp(pricingTL, ".pricing_headings > *"));

      //pricing cards
      pricingTL.call(
        revealUp(pricingTL, [
          ".pricing_category",
          ".category_legend",
          ".pricing_list > *",
        ])
      );

      //testimonial headings
      testimonyTL.call(revealUp(testimonyTL, ".testimonial_headings > *"));

      //client testimony
      testimonyTL.from(".client_wrapper", {
        y: 150,
        alpha: 0,
        ease: "back.out(4)",
        stagger: {
          each: 0.1,
        },
      });
      testimonyTL.call(revealUp(testimonyTL, ".client_profile"));
      testimonyTL.call(revealUp(testimonyTL, ".client_body > *"));

      //gallery
      imageReveal();
    }

    // b page
    if (window.location.pathname == "/home_b.html") {
      // initialize
      const teamTL = new TimelineMax({
        scrollTrigger: {
          trigger: ".team",
          start: "10% center",
        },
      });

      const pricingTL = new TimelineMax({
        scrollTrigger: {
          trigger: ".pricing",
          start: "top center",
        },
      });

      const testimonyTL = new TimelineMax({
        scrollTrigger: {
          trigger: ".testimonial",
          start: "10% center",
        },
      });

      ScrollTrigger.create({
        trigger: ".about",
        start: "top center",
        animation: gsap.from(
          [
            ".about_headings > *",
            ".separator-double",
            ".about_brief",
            ".signature",
          ],
          {
            y: 50,
            alpha: 0,
            ease: "back.out(3)",
            stagger: {
              each: 0.1,
            },
          }
        ),
      });

      //pricing headings
      pricingTL.call(revealUp(pricingTL, ".pricing_headings > *"));

      //pricing cards
      pricingTL.call(
        revealUp(pricingTL, [
          ".pricing_category",
          ".category_legend",
          ".pricing_list > *",
        ])
      );

      //team headings
      teamTL.from(".team_headings > *", {
        y: 50,
        alpha: 0,
        ease: "back.out(3)",
        stagger: {
          each: 0.1,
        },
      });

      //team headline
      teamTL.from(
        ".team.a .team_container > .headline",
        {
          x: 100,
          alpha: 0,
        },
        "-=.5"
      );

      teamTL.from([".member .img_wrapper"], {
        y: 100,
        alpha: 0,
        stagger: {
          each: 0.3,
          ease: "power4.inOut",
        },
      });
      teamTL.call(revealUp(teamTL, ".member_name"));
      teamTL.call(revealUp(teamTL, ".member_soc > *"));

      //testimonial
      testimonyTL.call(revealUp(testimonyTL, "[class*='swiper-button']"));
      testimonyTL.call(revealUp(testimonyTL, ".client_body > *"));

      //gallery
      imageReveal();

      const sVideo = gsap.utils.toArray(".slide-video");

      sVideo.forEach((el) => {
        gsap.set(el.querySelector(".video-title"), {
          alpha: 0,
          x: 100,
        });

        gsap.set(el.querySelector(".video-play"), {
          scale: 0,
        });

        $(el).mouseenter(function () {
          gsap.to(el.querySelector(".video-play"), {
            scale: 1.3,
            ease: "back.out(3)",
          });
          gsap.to(el.querySelector(".video-title"), {
            alpha: 1,
            x: 0,
            ease: "back.out(3)",
          });
        });

        $(el).mouseleave(function () {
          gsap.to(el.querySelector(".video-play"), {
            scale: 0,
            ease: "back.out(3)",
          });
          gsap.to(el.querySelector(".video-title"), {
            alpha: 0,
            x: 100,
            ease: "back.out(3)",
          });
        });
      });
    }

    // c page
    if (window.location.pathname == "/home_c.html") {
      //initialize
      const teamTL = new TimelineMax({
        scrollTrigger: {
          trigger: ".team",
          start: "10% center",
        },
      });

      const serviceTL = new TimelineMax({
        scrollTrigger: {
          trigger: ".service",
          start: "10% center",
        },
      });

      const shopTL = new TimelineMax({
        scrollTrigger: {
          trigger: ".shop",
          start: "top center",
        },
      });
      const galleryTL = new TimelineMax({
        scrollTrigger: {
          trigger: ".gallery",
          start: "top center",
        },
      });

      const testimonyTL = new TimelineMax({
        scrollTrigger: {
          trigger: ".testimonial",
          start: "10% center",
        },
      });

      ScrollTrigger.create({
        trigger: ".about",
        start: "top center",
        animation: gsap.from(
          [
            ".about_headings > *",
            ".separator-double",
            ".about_brief",
            ".signature",
          ],
          {
            y: 50,
            alpha: 0,
            ease: "back.out(3)",
            stagger: {
              each: 0.1,
            },
          }
        ),
      });

      //service headings and cards
      serviceTL.call(
        revealUp(serviceTL, [".service_headings > *", ".service_cards > *"])
      );

      //team headings
      teamTL.from(".team_headings > *", {
        y: 50,
        alpha: 0,
        ease: "back.out(3)",
        stagger: {
          each: 0.1,
        },
      });

      //team headline
      teamTL.from(
        ".team.a .team_container > .headline",
        {
          x: 100,
          alpha: 0,
        },
        "-=.5"
      );

      teamTL.from([".member .img_wrapper"], {
        y: 100,
        alpha: 0,
        stagger: {
          each: 0.3,
          ease: "power4.inOut",
        },
      });
      teamTL.call(revealUp(teamTL, ".member_name"));
      teamTL.call(revealUp(teamTL, ".member_soc > *"));

      // shop headings and products
      shopTL.call(
        revealUp(shopTL, [".shop_headings > *", ".shop_swiper .swiper-slide"])
      );

      //testimonial headings
      testimonyTL.call(revealUp(testimonyTL, ".testimonial_headings > *"));

      //client testimony
      testimonyTL.from(".client_wrapper", {
        y: 150,
        alpha: 0,
        ease: "back.out(4)",
        stagger: {
          each: 0.1,
        },
      });
      testimonyTL.call(revealUp(testimonyTL, ".client_profile"));
      testimonyTL.call(revealUp(testimonyTL, ".client_body > *"));

      galleryTL.call(revealUp(galleryTL, ".gallery_headings > *"));

      //gallery
      imageReveal();
    }

    // contact page
    if (window.location.pathname == "/contact.html") {
      ScrollTrigger.create({
        trigger: ".map",
        start: "10% center",
        animation: gsap.from(".map_container", {
          alpha: 0,
          y: 120,
        }),
      });

      ScrollTrigger.create({
        trigger: ".faqs",
        start: "10% center",
        animation: gsap.from(
          [
            gsap.utils.toArray(".accordion > *"),
            gsap.utils.toArray(".faqs_headings > *"),
          ],
          {
            alpha: 0,
            y: 120,
            stagger: 0.1,
          }
        ),
      });
    }

    // service page
    if (window.location.pathname == "/services.html") {
      gsap.set(".service_item", { alpha: 0, y: 150 });

      ScrollTrigger.batch(".service_item", {
        interval: 0.1,
        start: "20% center",
        onEnter: (batch) => gsap.to(batch, { alpha: 1, y: 0, stagger: 0.3 }),
      });
    }

    // gallery image hover animation
    const gallery_wrapper = gsap.utils.toArray(".gallery_wrapper");

    gallery_wrapper.forEach((el) => {
      let view_wrapper = el.querySelectorAll(
        ".view_wrapper, .view_wrapper > img"
      );

      gsap.set(view_wrapper, { scale: 0 });

      const view_img = gsap
        .to(view_wrapper, {
          scale: 0.8,
          duration: 0.3,
          stagger: {
            each: 0.1,
            ease: "power2.inOut",
          },
        })
        .reversed(true);

      $(el).mouseenter(() => {
        view_img.play();
      });

      $(el).mouseleave(() => {
        view_img.reverse();
      });
    });
  },
});

ScrollTrigger.addEventListener("refresh", () => scroller.update());
ScrollTrigger.refresh();

//anchor links animation
if (
  window.location.pathname == "/" ||
  window.location.pathname == "/home_b.html" ||
  window.location.pathname == "/home_c.html"
) {
  const anchorLinks = document.querySelectorAll(".a_link");

  anchorLinks.forEach((anchorLink) => {
    let href = anchorLink.getAttribute("href");
    let target = document.querySelector(href);

    anchorLink.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      scroller.scrollTo(target);
    });
  });
}

// mobile show and hide navbar
const showNavbar = gsap.timeline({ paused: true });

showNavbar.to([".backdrop-overlay", ".navbar_nav"], {
  left: 0,

  stagger: {
    each: 0.2,
  },
});

// show
$("#menuBtn").click(function () {
  showNavbar.play();

  $("body").css({ overflow: "hidden" });
  $("body").attr("aria-busy", "true");
});

// hide
$(".backdrop-overlay").click(function () {
  showNavbar.reverse();

  $("body").css({ overflow: "visible" });
  $("body").attr("aria-busy", "false");
});

// dropdown
const ddToggle = gsap.utils.toArray(".dropdown");

ddToggle.forEach((el) => {
  $(el).mouseenter(function () {
    let ddMenu = el.querySelector(".dropdown-menu");
    gsap.set(ddMenu, {
      x: -100,
      alpha: 0,
    });
    gsap.to(ddMenu, {
      height: "auto",
      x: 0,
      alpha: 1,
      //ease: "back.out(3)",
      ease: "power3.out",
      duration: 0.7,
    });
  });

  $(el).mouseleave(function () {
    let ddMenu = el.querySelector(".dropdown-menu");

    gsap.to(ddMenu, {
      height: 0,
      x: -100,
      alpha: 0,
      //ease: "back.out(3)",
      ease: "power3.out",
      duration: 0.7,
    });
  });
});

// FAQS accordion
const accordionItem = gsap.utils.toArray(".accordion_item");

//accordion item clicked
accordionItem.forEach((el, i) => {
  $(el).click(function () {
    accordionShow(i);
  });
});

// close all accordion item except one
function accordionShow(index) {
  accordionItem.forEach((el) => {
    if ($(el).index() == index) {
      if (!$(el).hasClass("show")) {
        $(el).addClass("show");

        gsap.to(el.querySelector(".pgraph"), {
          paddingTop: "1rem",
          height: "auto",
        });

        gsap.to(el.querySelector(".icon-small"), {
          rotate: 360,
        });

        gsap.set(el.querySelector(".icon-small"), {
          attr: { src: "./assets/icons/minus.svg" },
        });
      } else {
        $(el).removeClass("show");
        gsap.to(el.querySelector(".pgraph"), {
          paddingTop: "0",
          height: "0",
        });

        gsap.to(el.querySelector(".icon-small"), {
          rotate: 0,
        });
        gsap.set(el.querySelector(".icon-small"), {
          attr: { src: "./assets/icons/plus.svg" },
        });
      }
    } else {
      $(el).removeClass("show");
      gsap.to(el.querySelector(".pgraph"), {
        paddingTop: "0",
        height: "0",
      });

      gsap.to(el.querySelector(".icon-small"), {
        rotate: 0,
      });
      gsap.set(el.querySelector(".icon-small"), {
        attr: { src: "./assets/icons/plus.svg" },
      });
    }
  });
}
