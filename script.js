// Reveal sections as they enter the viewport.
// A single, restrained pattern applied once per section — not per card —
// and skipped entirely for people who've asked for reduced motion.
(function () {
  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  var sections = document.querySelectorAll(".reveal");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    sections.forEach(function (section) {
      section.classList.add("reveal-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();
