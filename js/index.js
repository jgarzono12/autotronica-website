import { initializeNavbar } from './modules/navbar.js';
import {innerSlider} from './modules/slider.js';

const navbarElement = document.getElementById('navbar-container');
const navbarFilePath = './views/modules/navbar.html';

const sliderElement = document.getElementById('slider-container');
const sliderFilePath = './views/modules/slider.html';

initializeNavbar(navbarElement, navbarFilePath)
    .then(() => console.log('Barra de navegación cargada exitosamente.'))
    .catch((error) => console.error('Error al inicializar la barra de navegación:', error));

innerSlider(sliderElement, sliderFilePath);