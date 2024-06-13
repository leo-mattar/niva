gsap.registerPlugin(ScrollTrigger);

gsap.config({
  nullTargetWarn: false,
  trialWarn: false,
});

let mm = gsap.matchMedia();

// --- GLOBAL - RELOAD AT THE TOP
$(window).on("beforeunload", function () {
  history.scrollRestoration = "manual";
});

// --- LENIS
window.lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// --- GLOBAL - FADE
function fade() {
  const fadeElements = document.querySelectorAll("[fade]");
  fadeElements.forEach((element) => {
    gsap.set(element, {
      autoAlpha: 0,
      y: element.getAttribute("data-y") || "0",
    });
  });

  ScrollTrigger.batch("[fade]", {
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        duration: 1.6,
        ease: "power3.out",
        stagger: 0.1,
      }),
  });
}

// --- SLIDERS
function sliders() {
  // --- Onboarding slider
  // let onboardingSlider = new Swiper(".swiper.ob", {
  //   grabCursor: true,
  //   speed: 500,
  //   scrollbar: {
  //     el: '.swiper-scrollbar',
  //     draggable: true,
  //     dragSize: 100
  //   },
  //   navigation: {
  //     nextEl: ".swiper-next.ob",
  //     prevEl: ".swiper-prev.ob",
  //   },
  //   breakpoints: {
  //     320: {
  //       slidesPerView: 1.1,
  //       spaceBetween: 16,
  //     },
  //     480: {
  //       slidesPerView: "auto",
  //       spaceBetween: 24,
  //     }
  //   }
  // });

  // Customers slider
  let customerSlider = new Swiper(".swiper.customer", {
    slidesPerView: 1,
    speed: 500,
    loop: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    navigation: {
      nextEl: ".swiper-next.customer",
      prevEl: ".swiper-prev.customer",
    }
  });
}

// --- HEADER SCROLL
function headerScroll() {
  $(window).scroll(function () {
    if ($(window).scrollTop() >= 100) {
      $(".c-header").addClass("scrolled");
    } else {
      $(".c-header").removeClass("scrolled");
    }
  });
}

// --- HEADER MOBILE
function headerMobile() {

  let tl = gsap.timeline({ paused: true, defaults: { ease: "power3.inOut", duration: 0.6 } });

  let menuLine1 = $(".c-icon.menu rect").eq(0);
  let menuLine2 = $(".c-icon.menu rect").eq(1);
  let menuLine3 = $(".c-icon.menu rect").eq(2);

  gsap.set(menuLine1, { transformOrigin: "center center" });
  gsap.set(menuLine2, { transformOrigin: "center center" });
  gsap.set(menuLine3, { transformOrigin: "center center" });

  tl.fromTo(
    ".c-header-nav", { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)" }
  );
  tl.to(menuLine1, { rotation: 45, y: 7 }, 0);
  tl.to(menuLine2, { width: 0 }, 0);
  tl.to(menuLine3, { rotation: -45, y: -7 }, 0);

  $(".c-nav-btn").on("click", function () {
    $(this).toggleClass("is-open");
    if ($(this).hasClass("is-open")) {
      tl.restart();
      lenis.stop();
    } else {
      lenis.start();
      tl.reverse();
    }
  });
}

// --- ONBOARDING LOAD
function onboardingLoad() {
  if ($(".swiper-slide.ob").length > 0) {
    let tl = gsap.timeline({
      scrollTrigger:
      {
        trigger: ".swiper-slide.ob",
        start: "center bottom",
        once: true,
      }
    })

    gsap.set(".swiper-slide.ob", { xPercent: 30 });

    tl.to(".swiper-slide.ob", {
      autoAlpha: 1,
      xPercent: 0,
      stagger: 0.1,
      duration: 1.2,
      ease: "expo.out"
    });
  }
}

// --- CUSTOMER LOAD
function customerLoad() {
  if ($(".c-swiper-wrap").length > 0) {
    let tl = gsap.timeline({
      scrollTrigger:
      {
        trigger: ".c-swiper-wrap",
        start: "center bottom",
        once: true,
      }
    })

    gsap.set(".c-swiper-wrap", { clipPath: "inset(50% 50% 50% 50% round 1em)" });

    tl.fromTo(".c-swiper-wrap", { clipPath: "inset(50% 50% 50% 50% round 1em)" }, {
      duration: 1.4,
      ease: "expo.out",
      clipPath: "inset(0% 0% 0% 0% round 1em)"
    });
  }
}

// --- HOME LOADER
function homeLoader() {
  let tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } });

  gsap.set("[hero_lt]", { yPercent: 30 });
  gsap.set("[hero_rt]", { yPercent: 30 });
  gsap.set(".c-img-contain.logo", { yPercent: 60 });

  tl.to("[hero_lt]", { yPercent: 0, autoAlpha: 1 });
  tl.to("[hero_rt]", { yPercent: 0, autoAlpha: 1 }, "<+0.2");
  tl.to(".c-img-contain.logo", { yPercent: 0, autoAlpha: 1, stagger: 0.1 }, "<0.2");
}

// --- PT SIGNATURE
function paperTigerSignature() {
  const pprtgr = [
    'color: #F2F3F3',
    'background: #080808',
    'font-size: 12px',
    'padding-left: 10px',
    'line-height: 2',
    'border-left: 5px solid #ff3c31',
  ].join(';');
  console.info(`

%cWebsite by Paper Tiger${' '}
www.papertiger.com${'     '}

`, pprtgr);
}

// --- PAGES
let homePage = document.querySelector("[home-page]");

// --- INIT
function init() {
  headerScroll();
  sliders();
  paperTigerSignature();
  // onboardingLoad();
  fade();
  // customerLoad();
  if (homePage) {
    homeLoader()
  }
}
init();

// --- MATCHMEDIA - DESKTOP
mm.add("(min-width: 992px)", () => {
  //
  return () => {
    //
  };
});

// --- MATCHMEDIA - TABLET AND MOBILE
mm.add("(max-width: 991px)", () => {
  headerMobile();
  return () => {
    //
  };
});
