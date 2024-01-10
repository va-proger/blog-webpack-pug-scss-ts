type SvgInHtml = HTMLElement & SVGElement

export class Switcher{
    readonly errorTextNotElementOnPage: string = "На странице 0 элементов для switcher";
    readonly dataNameIsElement: string = 'data-switcher-value';
    readonly dataNameCurrentThemeForLocalStorage: string = 'data-switcher-theme-name';
    readonly dataNameCurrentValue: string = 'data-switcher-current-value';
    readonly dataPrefix: string = 'switcherModule';
    readonly bodyElement: HTMLBodyElement  = document.querySelector('body');
    switcherElements: NodeListOf<Element>;

    constructor(switcher?: NodeListOf<Element>, arrayElementForSetBody?: string[]) {
        if (switcher.length > 0) {

            this.switcherElements = switcher;

            Array.from(this.switcherElements).forEach((el : Element) : void => {

                this.eventGetElement(el);

                if(arrayElementForSetBody){
                    if (arrayElementForSetBody.includes(el.getAttribute(`${this.dataNameCurrentThemeForLocalStorage}`))) {
                        this.setValueFirstLoad(el)
                    }
                }

            })
        } else {
            console.error(this.errorTextNotElementOnPage);
        }
    }
    setValueFirstLoad(el : Element) : void{

        let switcherDataThemeName : string = el.getAttribute(`${this.dataNameCurrentThemeForLocalStorage}`);
        let valueStorage : string = this.getLocalStorageValue(switcherDataThemeName);

        if(valueStorage && !this.bodyElement.classList.contains(`${valueStorage}`)){
            this.setValue(switcherDataThemeName, valueStorage);
            el.setAttribute(`${this.dataNameCurrentValue}`, valueStorage);
        }else if(el.hasAttribute(`${this.dataNameCurrentValue}`)){
            this.setValue(switcherDataThemeName, el.getAttribute(`${this.dataNameCurrentValue}`))
        }

    }
   setValue(className: string, value: string):void{
        if ( className ){
            this.bodyElement.classList.add(`${className + '-' + value}`);
            this.setLocalStorageValue(className, value);
            document.querySelector('meta[name="theme-color"]').setAttribute('content',  value);

        }
    }
    // Получаем при клике элемент переключателя
    eventGetElement (el: Element) : void  {
        const currentSwitcher : Element = el;

        el.addEventListener('click', (evt: Event) => {

            const thisTarget : SvgInHtml = evt.target as SvgInHtml
            this.change(thisTarget, currentSwitcher);

        });
    }
    change (el: SvgInHtml, currentSwitcher: Element) : void  {
        if (el.closest(`[${this.dataNameIsElement}]`)){
            if(el.closest(`[${this.dataNameIsElement}]`).hasAttribute(`${this.dataNameIsElement}`) &&
                currentSwitcher.hasAttribute(`${this.dataNameCurrentThemeForLocalStorage}`)){
                const switcherDataThemeName : string = currentSwitcher.getAttribute(`${this.dataNameCurrentThemeForLocalStorage}`);
                const valueStorage : string = el.closest(`[${this.dataNameIsElement}]`).getAttribute(`${this.dataNameIsElement}`);
                this.removeValue(currentSwitcher);
                this.setValue(switcherDataThemeName, valueStorage);
            }
        }
    }
    removeValue(currentSwitcher: Element):void{
        const arrayElementSwitcher : NodeListOf<Element> = currentSwitcher.querySelectorAll(`[${this.dataNameIsElement}]`);
        const switcherDataThemeName : string = currentSwitcher.getAttribute(`${this.dataNameCurrentThemeForLocalStorage}`);
        Array.from(arrayElementSwitcher).forEach( (el) => {
            this.bodyElement.classList.remove(`${switcherDataThemeName + '-' + el.getAttribute(`${this.dataNameIsElement}`)}`);
        })
    }
    getNameForLocalStorageValue(el:string) : string{
        return this.dataPrefix + el.charAt(0).toUpperCase() + el.slice(1);
    }
    setDataValueWrapper(el:string) : void{

    }
    setLocalStorageValue(el:string, value: string) : void{
        const dataNameTheme : string = this.getNameForLocalStorageValue(el);
        localStorage.setItem(dataNameTheme, value);
    }
    getLocalStorageValue(el:string) : string|null{
        const dataNameTheme : string = this.getNameForLocalStorageValue(el);
        return localStorage.getItem(`${dataNameTheme}`);
    }
}




