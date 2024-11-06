/**
 * Carga e inicializa la barra de navegación en el sitio web.
 *
 * Esta función se encarga de cargar la barra de navegación desde un archivo HTML
 * especificado y de insertar su contenido en un elemento del DOM. Además, aplica efectos
 * de desplazamiento y administra el comportamiento del menú hamburguesa para
 * dispositivos móviles.
 *
 * @async
 * @param {HTMLElement} navbarPlaceId - Elemento del DOM donde se insertará el contenido de la barra de navegación.
 * @param {string} navbarHtmlPath - Ruta al archivo HTML que contiene el contenido de la barra de navegación.
 * @returns {Promise<void>} - Promesa que se resuelve cuando la barra de navegación ha sido
 * cargada e insertada correctamente, o se rechaza si ocurre un error durante la carga.
 * @throws {Error} - Lanza un error si la solicitud de recuperación del archivo HTML falla o si la
 * respuesta no es exitosa.
 *
 * @example
 * const navbarContainer = document.getElementById('navbar-container');
 * const navbarHtmlFile = '/path/to/navbar.html';
 * initializeNavbar(navbarContainer, navbarHtmlFile)
 *     .then(() => console.log('Barra de navegación cargada exitosamente.'))
 *     .catch((error) => console.error('Error al inicializar la barra de navegación:', error));
 *
 * La función ejecuta los siguientes pasos:
 * 1. Realiza una solicitud para obtener el contenido HTML de la barra de navegación desde la ruta proporcionada.
 * 2. Si la solicitud es exitosa, inserta el HTML en el elemento del DOM indicado.
 * 3. Activa los efectos de desplazamiento (cambio de color y sombras) en la barra de navegación.
 * 4. Administra el funcionamiento del menú hamburguesa y el cierre del menú mediante una superposición.
 */
export default async (navbarPlaceId, navbarHtmlPath) => {
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
        adjustScrollForNavbar(navbar);

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
        navbar.style.transition = "background-color 0.6s ease, box-shadow 0.6s ease";
        navbar.style.backgroundColor =
            window.scrollY >= 10 ? "#121212" : "transparent";
        navbar.style.boxShadow =
            window.scrollY >= 10 ? "0 2px 10px rgba(0, 0, 0, 0.384)" : "none";
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

/**
 * Ajusta el desplazamiento de la página al hacer clic en un enlace con `href="#<id>"`, 
 * de forma que la sección se desplace correctamente sin quedar oculta debajo del navbar.
 * 
 * @param {HTMLElement} navbar - El elemento del navbar que se utilizará para calcular su altura.
 * La altura se toma en cuenta para ajustar el desplazamiento de las secciones al hacer scroll.
 * 
 * @example
 * // Llama a la función pasando el elemento del navbar
 * const navbar = document.querySelector('#navbar');
 * adjustScrollForNavbar(navbar);
 */
function adjustScrollForNavbar(navbar) {
    // Obtén todos los enlaces con href="#"
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();  // Evita el comportamiento por defecto del enlace

            // Obtiene el destino del enlace (el id de la sección a la que se hará scroll)
            const targetId = this.getAttribute("href").substring(1);  // Elimina el "#" para obtener el id
            const target = document.getElementById(targetId);

            if (target) {
                // Obtiene la altura actual del navbar
                const navbarHeight = navbar.offsetHeight;

                // Aumenta el desplazamiento ajustado por un pequeño margen (10px o más)
                const targetPosition = target.offsetTop - navbarHeight;  // Resta la altura del navbar al desplazamiento

                // Realiza el desplazamiento suave hasta la sección ajustada
                window.scrollTo({
                    top: targetPosition,  // Posición ajustada
                    behavior: 'smooth'  // Desplazamiento suave
                });
            }
        });
    });
}







