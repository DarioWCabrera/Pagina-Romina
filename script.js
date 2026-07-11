const menuButton = document.querySelector(".menu-button");
const mainNav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".main-nav a");
const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuButton && mainNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    const clickedInsideMenu = mainNav.contains(event.target);
    const clickedButton = menuButton.contains(event.target);

    if (!clickedInsideMenu && !clickedButton) {
      mainNav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}
