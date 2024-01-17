import './scss/main.scss';
import './fonts/fonts.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from  "./components/App.tsx";
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
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App
        />
    </React.StrictMode>
);