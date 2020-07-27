import { Directive, ElementRef, HostListener, Renderer2, HostBinding } from '@angular/core';

@Directive({
    selector : '[dropdown]'
})
export class dropdownDirective {
   @HostBinding('class.open') clicked = false;
    @HostListener('click') onClick() {
        this.clicked = !this.clicked;
    }

}
