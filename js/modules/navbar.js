/**
 * Función principal para la implementación de la barra de navegación.
 *
 * Esta función carga el contenido HTML de la barra de navegación desde la
 * ruta especificada y lo inserta en el elemento designado. Además, aplica
 * efectos de desplazamiento y maneja el comportamiento del menú hamburguesa.
 *
 * @async
 * @param {HTMLElement} navbarPlaceId - Elemento HTML donde se insertará la barra de navegación.
 * @param {string} navbarHtmlPath - Ruta del archivo HTML que contiene el contenido de la barra de navegación.
 * @returns {Promise<void>} - Promesa que se resuelve cuando la barra de navegación ha sido
 * cargada e insertada correctamente, o se rechaza si ocurre un error durante la carga.
 * @throws {Error} - Lanza un error si la solicitud de recuperación del archivo HTML falla o si la
 * respuesta no es exitosa.
 *
 * @example
 * const navbarElement = document.getElementById('navbar-container');
 * const navbarFilePath = '/path/to/navbar.html';
 * initializeNavbar(navbarElement, navbarFilePath)
 *     .then(() => console.log('Barra de navegación cargada exitosamente.'))
 *     .catch((error) => console.error('Error al inicializar la barra de navegación:', error));
 */
export const initializeNavbar = async (navbarPlaceId, navbarHtmlPath) => {
    try {
        const resultPromise = await fetch(navbarHtmlPath);
        if (!resultPromise.ok) {
            throw new Error(`HTTP error! status: ${resultPromise.status}`);
        }

        const data = await resultPromise.text();
        navbarPlaceId.innerHTML = data;

        const navbar = document.getElementById("navbar");
        const hamMenuButton = document.getElementById("hammenu-button");
        const overlay = document.getElementById("overlay");

        setNavbarScrollEffect(navbar);
        setNavbarHamColor(navbar, hamMenuButton);
        touchOverlayExit(overlay, hamMenuButton, navbar);
    } catch (error) {
        console.error(`Error al cargar barra de navegación:\n${error}`);
    }
};

/**
 * Aplica un efecto de cambio de color a la barra de navegación según la posición de desplazamiento.
 *
 * Esta función cambia el color de fondo de la barra de navegación al desplazarse.
 *
 * @param {HTMLElement} navbar - Elemento HTML que representa la barra de navegación.
 * @example
 * const navbarElement = document.getElementById('navbar');
 * setNavbarScrollEffect(navbarElement);
 */
function setNavbarScrollEffect(navbar) {
    window.addEventListener("scroll", () => {
        navbar.style.transition = "background-color 0.6s ease";
        navbar.style.backgroundColor =
            window.scrollY >= 10 ? "#121212" : "transparent";
    });
}

/**
 * Cambia el color de la barra de navegación al abrir el menú de hamburguesa.
 *
 * @param {HTMLElement} navbar - Elemento HTML que representa la barra de navegación.
 * @param {HTMLElement} hamMenuButton - Elemento HTML que actúa como botón del menú de hamburguesa.
 * @example
 * const navbarElement = document.getElementById('navbar');
 * const hamMenuElement = document.getElementById('hammenu-button');
 * setNavbarHamColor(navbarElement, hamMenuElement);
 */
function setNavbarHamColor(navbar, hamMenuButton) {
    hamMenuButton.addEventListener("change", () => {
        navbar.style.transition = "background-color 0s ease";
        document.body.style.overflow = hamMenuButton.checked ? "hidden" : "auto";
        navbar.style.backgroundColor = hamMenuButton.checked ? "#121212" : window.scrollY >= 10 ? "#121212" : "transparent";
        overlay.style.display = hamMenuButton.checked ? "block" : "none";
    });
}

/**
 * Cierra el menú de hamburguesa al hacer clic en el overlay.
 *
 * @param {HTMLElement} overlay - Elemento HTML que actúa como superposición (overlay).
 * @param {HTMLElement} hamMenuButton - Elemento HTML que actúa como botón del menú de hamburguesa.
 * @example
 * const overlayElement = document.getElementById('overlay');
 * const hamMenuElement = document.getElementById('hammenu-button');
 * touchOverlayExit(overlayElement, hamMenuElement);
 */
function touchOverlayExit(overlay, hamMenuButton, navbar) {
    overlay.addEventListener("click", () => {
        document.body.style.overflow = "auto"; // Permitir el scroll
        hamMenuButton.checked = false; // Desmarcar el checkbox
        overlay.style.display = "none"; // Ocultar el overlay
        navbar.style.backgroundColor = hamMenuButton.checked ? "#121212" : window.scrollY >= 10 ? "#121212" : "transparent";

    });
}
