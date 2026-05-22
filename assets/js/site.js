const KB4UD_GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.mohammedkamal.kb4ydapp";

document.documentElement.classList.add("reveal-ready");

const siteHeader = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

const closeNavigation = () => {
  if (!siteHeader || !navToggle) {
    return;
  }

  siteHeader.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
};

if (siteHeader && navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteHeader.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNavigation);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNavigation();
    }
  });
}

document.querySelectorAll("[data-google-play-link]").forEach((link) => {
  if (KB4UD_GOOGLE_PLAY_URL) {
    link.href = KB4UD_GOOGLE_PLAY_URL;
    link.target = "_blank";
    link.rel = "noopener";
    return;
  }

  link.classList.add("is-pending");
  link.title = "TODO: Replace with official KB4UD Google Play URL.";
});

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.12,
    },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}
