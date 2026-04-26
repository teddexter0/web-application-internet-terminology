const toggleButton = document.querySelector(".menu-toggle");
const siteMenu = document.querySelector(".site-nav");

if (toggleButton && siteMenu) {
  const storageKey = "internet-terminology-menu-open";
  const wideDefault = window.matchMedia("(min-width: 901px)").matches;
  const savedState = localStorage.getItem(storageKey);
  const shouldOpen = savedState === null ? wideDefault : savedState === "true";

  const setMenuState = (isOpen) => {
    siteMenu.classList.toggle("is-open", isOpen);
    toggleButton.setAttribute("aria-expanded", String(isOpen));
    toggleButton.querySelector(".menu-label").textContent = isOpen ? "Close" : "Menu";
  };

  setMenuState(shouldOpen);

  toggleButton.addEventListener("click", () => {
    const isOpen = !siteMenu.classList.contains("is-open");
    setMenuState(isOpen);
    localStorage.setItem(storageKey, String(isOpen));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && siteMenu.classList.contains("is-open")) {
      setMenuState(false);
      localStorage.setItem(storageKey, "false");
    }
  });
}

const slideshow = document.querySelector(".tcp-slideshow");

if (slideshow) {
  const track = slideshow.querySelector("[data-slideshow-track]");
  const slides = track ? Array.from(track.querySelectorAll("[data-slide]")) : [];
  const dots = Array.from(slideshow.querySelectorAll(".slideshow-dot"));
  const intervalMs = Number(slideshow.dataset.slideshowInterval) || 5000;
  let activeIndex = 0;

  const showSlide = (index) => {
    if (!track) {
      return;
    }

    track.style.transform = `translateX(-${index * 100}%)`;
    slides.forEach((slide, slideIndex) => {
      slide.setAttribute("aria-hidden", String(slideIndex !== index));
    });
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === index);
    });
  };

  if (slides.length > 1) {
    showSlide(activeIndex);
    window.setInterval(() => {
      activeIndex = (activeIndex + 1) % slides.length;
      showSlide(activeIndex);
    }, intervalMs);
  }
}
