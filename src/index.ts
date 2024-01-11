import './scss/main.scss';
import './fonts/fonts.scss';

import { Switcher } from "./ts/modules/switcher";
import { activeMenu } from "./ts/modules/menu";
const switcherElements: NodeListOf<Element> = document.querySelectorAll('.__switcher');
if (switcherElements.length > 0){
    new Switcher(switcherElements, ['theme']);
}
const burger: Element = document.querySelector('.menu-burger');
if(document.querySelector('.menu-burger')){
    activeMenu(burger);
}
