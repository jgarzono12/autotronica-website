import { initializeNavbar } from './modules/navbar.js';

const navbarElement = document.getElementById('navbar-container');
const navbarFilePath = './views/modules/navbar.html';

initializeNavbar(navbarElement, navbarFilePath)
    .then(() => console.log('Barra de navegación cargada exitosamente.'))
    .catch((error) => console.error('Error al inicializar la barra de navegación:', error));