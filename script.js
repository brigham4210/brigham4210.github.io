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

window.addEventListener("scroll", updateNavOnScroll);
updateNavOnScroll();

if (window.lucide && typeof window.lucide.createIcons === "function") {
  window.lucide.createIcons();
}
