(() => {
  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Mobile nav dropdowns activate
   */
  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    },
    true
  );

  /**
   * Preloader
   */
  let preloader = select("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  //Initiate  glightbox;
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });

  //courses isotope and filter;
  window.addEventListener("load", () => {
    let coursesContainer = select(".courses-container");
    if (coursesContainer) {
      let coursesIsotope = new Isotope(coursesContainer, {
        itemSelector: ".course-item",
      });

      let coursesFilters = select("#courses-filters li", true);

      on(
        "click",
        "#courses-filters li",
        function (e) {
          e.preventDefault();
          coursesFilters.forEach(function (el) {
            el.classList.remove("filter-active");
          });
          this.classList.add("filter-active");

          coursesIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
          coursesIsotope.on("arrangeComplete", function () {
            AOS.refresh();
          });
        },
        true
      );
    }
  });
  /*------------------------------------------*/

  /**
   * Change Navbar Background Color on Scroll
   */
  function changeBg() {
    let navbar = document.getElementById("navbar");
    let header = document.getElementById("header");
    let scrollValue = window.scrollY;
    if (scrollValue < 250) {
      header.classList.remove("headerBgMain");
      header.classList.add("headerBgWhite");
      navbar.classList.remove("navLinkDark");
    } else {
      header.classList.remove("headerBgWhite");
      header.classList.add("headerBgMain");
      navbar.classList.add("navLinkDark");
    }
  }
  window.addEventListener("scroll", changeBg);
})();
