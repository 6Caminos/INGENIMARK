// Función para ajustar el margen superior y el estado de los enlaces
function adjustMarginAndLinks() {
  // Obtener todas las secciones
  const sections = document.querySelectorAll(".container > section");

  // Obtener la sección actualmente enfocada
  const focusedSection = document.querySelector(":target");

  // Obtener la altura del encabezado (navbar)
  const headerHeight = document.querySelector("header").offsetHeight;

  // Obtener todos los enlaces de navegación
  const navLinks = document.querySelectorAll("nav a");

  // Restablecer todos los enlaces a su estado original y los márgenes de todas las secciones
  navLinks.forEach((link) => {
    link.classList.remove("disabled-link");
  });

  sections.forEach((section) => {
    section.style.marginTop = "0";
  });

  // Comprobar si la sección actualmente enfocada es diferente de la última sección enfocada
  if (focusedSection !== adjustMarginAndLinks.lastFocusedSection) {
    // Iterar sobre las secciones
    sections.forEach((section) => {
      if (section === focusedSection) {
        // Calcular la posición y altura de la sección
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.clientHeight;

        // Verificar si la sección está tapada por el navbar
        if (sectionTop < headerHeight) {
          // Si la sección está tapada, ajustar el margen superior
          section.style.marginTop = headerHeight + "px";
        }
      }
    });

    // Deshabilitar el enlace de la sección actualmente enfocada
    navLinks.forEach((link) => {
      if (link.getAttribute("href") === `#${focusedSection.id}`) {
        link.classList.add("disabled-link");
      }
    });

    // Actualizar la última sección enfocada
    adjustMarginAndLinks.lastFocusedSection = focusedSection;
  }
}

// Inicializar la última sección enfocada como nula
adjustMarginAndLinks.lastFocusedSection = null;

// Llamar a la función al cargar la página y cuando cambie la ventana hash
window.addEventListener("load", adjustMarginAndLinks);
window.addEventListener("hashchange", adjustMarginAndLinks);

// Función para manejar el evento de scroll
function onScroll() {
  // Obtener todas las secciones
  adjustMarginAndLinks();
  // Restablecer la bandera isFirstScroll
  isFirstScroll = true;
}

// Variable para controlar si la función onScroll se ha ejecutado
let isFirstScroll = true;
let isLinkClicked = false;

// Agregar evento de scroll para manejar el evento y reactivar los enlaces
window.addEventListener("scroll", () => {
  if (isFirstScroll && !isLinkClicked) {
    onScroll();
  }
  isLinkClicked = false;
});

// Agregar evento de clic a los enlaces de navegación
const navLinks = document.querySelectorAll("nav a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    isLinkClicked = true;
  });
});
