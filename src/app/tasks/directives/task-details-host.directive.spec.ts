import { TaskDetailsHostDirective } from './task-details-host.directive';
import {
  ViewContainerRef, ElementRef, Injector, ViewRef, TemplateRef,
  EmbeddedViewRef, ComponentFactory, NgModuleRef, ComponentRef
} from '@angular/core';

class ImplementedViewContainerRef extends ViewContainerRef {
  element: ElementRef<any>;
  injector: Injector;
  parentInjector: Injector;
  length: number;
  clear(): void {
    throw new Error('Method not implemented.');
  }
  get(index: number): ViewRef {
    throw new Error('Method not implemented.');
  }
  createEmbeddedView<C>(templateRef: TemplateRef<C>, context?: C, index?: number): EmbeddedViewRef<C> {
    throw new Error('Method not implemented.');
  }
  createComponent<C>(
    componentFactory: ComponentFactory<C>, index?: number, injector?: Injector,
    projectableNodes?: any[][], ngModule?: NgModuleRef<any>): ComponentRef<C> {
    throw new Error('Method not implemented.');
  }
  insert(viewRef: ViewRef, index?: number): ViewRef {
    throw new Error('Method not implemented.');
  }
  move(viewRef: ViewRef, currentIndex: number): ViewRef {
    throw new Error('Method not implemented.');
  }
  indexOf(viewRef: ViewRef): number {
    throw new Error('Method not implemented.');
  }
  remove(index?: number): void {
    throw new Error('Method not implemented.');
  }
  detach(index?: number): ViewRef {
    throw new Error('Method not implemented.');
  }

}

describe('TaskDetailsHostDirective', () => {
  it('should create an instance', () => {
    const directive = new TaskDetailsHostDirective(new ImplementedViewContainerRef());
    expect(directive).toBeTruthy();
  });
});
