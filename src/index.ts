'use strict';

import './styles/style.sass';

import { Home } from './pages/Home';
import { Tree } from './pages/Tree';
import { Toys } from './pages/Toys';
import { Error404 } from './pages/Error404';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { Utils } from './utils/Utils';

const homeInstance = new Home();
const settingsSettings = new Toys();
const categoriesInstance = new Tree();
const error404Instance = new Error404();

const headerInstance = new Header();
const footerInstance = new Footer();

const routes: any = {
  '/': homeInstance,
  '/toys': settingsSettings,
  '/tree': categoriesInstance,
};

const router: any = async () => {
  const header: any = null || document.getElementById('header_container');
  const content: any = null || document.getElementById('page_container');
  const footer: any = null || document.getElementById('footer_container');

  header.innerHTML = await headerInstance.render();
  await headerInstance.after_render();

  footer.innerHTML = await footerInstance.render();
  await footerInstance.after_render();

  const request = Utils.parseRequestURL();

  const parsedURL =
    (request.resource ? `/${request.resource}` : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? `/${request.verb}` : '');

  const page = routes[parsedURL] ? routes[parsedURL] : error404Instance;

  content.innerHTML = await page.render();

  await page.after_render();
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
