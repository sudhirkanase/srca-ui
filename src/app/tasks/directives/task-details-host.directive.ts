import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[srcaTaskDetailsHost]'
})
export class TaskDetailsHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
