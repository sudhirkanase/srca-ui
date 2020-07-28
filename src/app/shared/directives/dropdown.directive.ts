import { Directive, ElementRef, HostListener, Renderer2, HostBinding } from '@angular/core';

@Directive({
    selector: '[srcaDropdown]'
})
export class DropdownDirective {
    @HostBinding('class.open') clicked = false;
    @HostListener('click') onClick() {
        this.clicked = !this.clicked;
    }

}
