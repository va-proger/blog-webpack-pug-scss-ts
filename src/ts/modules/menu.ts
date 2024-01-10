
export function activeMenu(burger: Element): void{
    burger.addEventListener('click', function (){
        this.closest('.header-top').classList.toggle('__active');
        this.classList.toggle('__active');
    });
}
