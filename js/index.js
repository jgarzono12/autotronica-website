import initializeNavbar from './modules/navbar.js';
import { innerSlider } from './modules/slider.js';
import initializeFooter from './modules/footer.js';

const navbarElement = document.getElementById('navbar-container');
const navbarFilePath = './views/modules/navbar.html';

const sliderElement = document.getElementById('slider-container');
const sliderFilePath = './views/modules/slider.html';

const footerElemnt = document.getElementById('footer-container');
const footerFilePatch = './views/modules/footer.html';

initializeNavbar(navbarElement, navbarFilePath);
innerSlider(sliderElement, sliderFilePath);
initializeFooter(footerElemnt, footerFilePatch);