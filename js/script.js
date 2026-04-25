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
