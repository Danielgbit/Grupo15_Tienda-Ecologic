const navBar = document.querySelector(".bar-nav-container");
let prevScrollPos = window.pageYOffset; // Guarda la posición anterior del scroll

window.onscroll = function() {
  const currentScrollPos = window.pageYOffset; // Obtiene la posición actual del scroll

  // Si el usuario hace scroll hacia abajo y la barra de navegación no está oculta
  if (prevScrollPos < currentScrollPos && !navBar.classList.contains("navbar-hidden")) {
    navBar.classList.add("navbar-hidden"); // Oculta la barra de navegación
  } else {
    navBar.classList.remove("navbar-hidden"); // Muestra la barra de navegación
  }

  prevScrollPos = currentScrollPos;
};

