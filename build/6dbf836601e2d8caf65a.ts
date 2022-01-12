'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./styles/style.sass");
const Home_1 = require("./pages/Home");
const Tree_1 = require("./pages/Tree");
const Toys_1 = require("./pages/Toys");
const Error404_1 = require("./pages/Error404");
const Header_1 = require("./components/Header");
const Footer_1 = require("./components/Footer");
const Utils_1 = require("./utils/Utils");
const homeInstance = new Home_1.Home();
const settingsSettings = new Toys_1.Toys();
const categoriesInstance = new Tree_1.Tree();
const error404Instance = new Error404_1.Error404();
const headerInstance = new Header_1.Header();
const footerInstance = new Footer_1.Footer();
const routes = {
    '/': homeInstance,
    '/toys': settingsSettings,
    '/tree': categoriesInstance,
};
const router = () => __awaiter(void 0, void 0, void 0, function* () {
    const header = null || document.getElementById('header_container');
    const content = null || document.getElementById('page_container');
    const footer = null || document.getElementById('footer_container');
    header.innerHTML = yield headerInstance.render();
    yield headerInstance.after_render();
    footer.innerHTML = yield footerInstance.render();
    yield footerInstance.after_render();
    const request = Utils_1.Utils.parseRequestURL();
    const parsedURL = (request.resource ? `/${request.resource}` : '/') +
        (request.id ? '/:id' : '') +
        (request.verb ? `/${request.verb}` : '');
    const page = routes[parsedURL] ? routes[parsedURL] : error404Instance;
    content.innerHTML = yield page.render();
    yield page.after_render();
});
window.addEventListener('hashchange', router);
window.addEventListener('load', router);
