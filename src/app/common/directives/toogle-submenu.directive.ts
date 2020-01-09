import {Directive, HostBinding, HostListener, Input, Output} from '@angular/core';

@Directive({
    selector: '[appToggleSubmenu]'
})
export class ToggleSubmenuDirective {

    constructor() {
    }
    @HostBinding('class.down')
    bgClass = false;

    @HostListener('click')
    triggerClass() {
      this.bgClass = !this.bgClass;
    }
}
