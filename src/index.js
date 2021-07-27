
/* создание списка используя шаблонизатор */

import dishMenuTpl from './templates/dish-menu.hbs';
import dishMenu from './dish-menu.json';
import './styles/main.scss';

/* покороче */
const menuListEl = document.querySelector('.js-menu');
menuListEl.insertAdjacentHTML('beforeend', dishMenuTpl(dishMenu));

/* понятнее */
// const menuMarkup = createDishMenu(dishMenu);
// menuListEl.insertAdjacentHTML('beforeend', menuMarkup);
// function createDishMenu(menu) {
//   return dishMenuTpl(menu);
// };


/* функционал изменения и сохранения темы */

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
  body: document.querySelector('body'),
  moon: document.querySelector('.js-moon'),
  sun: document.querySelector('.js-sun'),
  themeSwitch: document.querySelector('#theme-switch-toggle'),
  /* борьба с .svg и вебпаком */
  DARK_MOON: 'dark__moon',
  LIGHT_MOON: 'light__moon',
  DARK_SUN: 'dark__sun',
  LIGHT_SUN: 'light__sun'
};
let themeSet = false;

window.addEventListener('DOMContentLoaded', localStorageInsert);
Theme.themeSwitch.addEventListener('change', onChangeTheme);

function onChangeTheme(e) {

  if (e.currentTarget.checked) {
    Theme.body.classList.replace(Theme.LIGHT, Theme.DARK);
    Theme.sun.classList.replace(Theme.DARK_SUN, Theme.LIGHT_SUN);
    Theme.moon.classList.replace(Theme.DARK_MOON, Theme.LIGHT_MOON);
  } else {
    Theme.body.classList.replace(Theme.DARK, Theme.LIGHT);
    Theme.sun.classList.replace(Theme.LIGHT_SUN, Theme.DARK_SUN);
    Theme.moon.classList.replace(Theme.LIGHT_MOON, Theme.DARK_MOON);
  };
  localStorage.setItem('theme-setting', JSON.stringify(Theme.themeSwitch.checked));
  themeSet = JSON.parse(localStorage.getItem('theme-setting'));
}

function localStorageInsert() {
  themeSet = JSON.parse(localStorage.getItem('theme-setting'));
  Theme.themeSwitch.checked = themeSet;

  if (themeSet) {
    Theme.body.classList.add(Theme.DARK);
    Theme.sun.classList.add(Theme.LIGHT_SUN);
    Theme.moon.classList.add(Theme.LIGHT_MOON);
  } else {
    Theme.body.classList.add(Theme.LIGHT);
    Theme.sun.classList.add(Theme.DARK_SUN);
    Theme.moon.classList.add(Theme.DARK_MOON);
  }
};

console.log("Привіт, світ! Життя брутальне! Life is brutal!");
