const menuButton = document.querySelector(".menu-button");
const mainNav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".main-nav a");
const menuReaderText = menuButton?.querySelector(".sr-only");
const year = document.querySelector("#year");
const readMoreBlocks = document.querySelectorAll(".read-more");

if (year) {
  year.textContent = new Date().getFullYear();
}

function closeMenu() {
  if (!menuButton || !mainNav) return;

  mainNav.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");

  if (menuReaderText) {
    menuReaderText.textContent = "Abrir menú";
  }
}

if (menuButton && mainNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");

    menuButton.setAttribute("aria-expanded", String(isOpen));

    if (menuReaderText) {
      menuReaderText.textContent = isOpen ? "Cerrar menú" : "Abrir menú";
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof Node)) return;

    const clickedInsideMenu = mainNav.contains(target);
    const clickedButton = menuButton.contains(target);

    if (!clickedInsideMenu && !clickedButton) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mainNav.classList.contains("is-open")) {
      closeMenu();
      menuButton.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) {
      closeMenu();
    }
  });
}

readMoreBlocks.forEach((details) => {
  const label = details.querySelector(".read-more-label");

  if (!label) return;

  const updateLabel = () => {
    label.textContent = details.open ? "Leer menos" : "Leer más";
  };

  updateLabel();
  details.addEventListener("toggle", updateLabel);
});
