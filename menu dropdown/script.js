function toggleMenu() {
    const menu = document.querySelector("nav");
    menu.classList.toggle("open");
  }
  
  document.querySelector(".logo").addEventListener("click", toggleMenu);