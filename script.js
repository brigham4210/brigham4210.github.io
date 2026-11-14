const nav = document.getElementById("site-nav");

const updateNavOnScroll = () => {
  if (!nav) return;

  if (window.scrollY > 50) {
    nav.classList.add("glass", "py-4", "shadow-sm");
    nav.classList.remove("py-6");
  } else {
    nav.classList.remove("glass", "py-4", "shadow-sm");
    nav.classList.add("py-6");
  }
};

window.addEventListener("scroll", updateNavOnScroll, { passive: true });
updateNavOnScroll();

// Mobile menu
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

const setMenuOpen = (open) => {
  if (!menuToggle || !mobileMenu) return;
  mobileMenu.classList.toggle("is-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  if (open) nav.classList.add("glass");
  else updateNavOnScroll();
};

menuToggle?.addEventListener("click", () => {
  setMenuOpen(!mobileMenu.classList.contains("is-open"));
});
mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

// Reveal sections as they scroll into view
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

// Highlight the nav link for the section in view
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
const sections = [...navLinks]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && sections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((section) => sectionObserver.observe(section));
}

if (window.lucide && typeof window.lucide.createIcons === "function") {
  window.lucide.createIcons();
}
