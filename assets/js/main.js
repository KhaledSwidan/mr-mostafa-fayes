(() => {
  let e = (e, t = !1) =>
      ((e = e.trim()), t)
        ? [...document.querySelectorAll(e)]
        : document.querySelector(e),
    t = (t, r, i, s = !1) => {
      let a = e(r, s);
      a &&
        (s
          ? a.forEach((e) => e.addEventListener(t, i))
          : a.addEventListener(t, i));
    },
    r = (e, t) => {
      e.addEventListener("scroll", t);
    },
    i = e(".back-to-top");
  if (i) {
    let s = () => {
      window.scrollY > 100
        ? i.classList.add("active")
        : i.classList.remove("active");
    };
    window.addEventListener("load", s), r(document, s);
  }
  let a = e("#preloader");
  a &&
    window.addEventListener("load", () => {
      a.remove();
    }),
    window.addEventListener("load", () => {
      AOS.init({ duration: 1e3, easing: "ease-in-out", once: !0, mirror: !1 });
    }),
    window.addEventListener("load", () => {
      let r = e(".courses-container");
      if (r) {
        let i = new Isotope(r, { itemSelector: ".course-item" }),
          s = e("#courses-filters li", !0);
        t(
          "click",
          "#courses-filters li",
          function (e) {
            e.preventDefault(),
              s.forEach(function (e) {
                e.classList.remove("filter-active");
              }),
              this.classList.add("filter-active"),
              i.arrange({ filter: this.getAttribute("data-filter") }),
              i.on("arrangeComplete", function () {
                AOS.refresh();
              });
          },
          !0
        );
      }
    });
  let l = e("#navbar .scrollto", !0),
    o = () => {
      let t = window.scrollY + 200;
      l.forEach((r) => {
        if (!r.hash) return;
        let i = e(r.hash);
        i &&
          (t >= i.offsetTop && t <= i.offsetTop + i.offsetHeight
            ? r.classList.add("active")
            : r.classList.remove("active"));
      });
    };
  window.addEventListener("load", o), r(document, o);
})();
