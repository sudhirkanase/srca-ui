import { ComponentFactoryResolver, ViewContainerRef, Type, Injectable } from '@angular/core';
import { Task } from '../model/Task';
import { TASK_COMPONENT_MAP } from '../constants/tasks.constants';

@Injectable({
    providedIn: 'root'
})
export class TaskComponentFactory {
    taskComponentMap = TASK_COMPONENT_MAP;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    /**
     * Creates an instance of the requested Task component and returns to the container
     */
    getComponent(viewContainerRef: ViewContainerRef, taskName: string): Task {
        const componentType: Type<Task> = this.taskComponentMap[taskName];
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

        viewContainerRef.clear();

        const componentRef = viewContainerRef.createComponent(componentFactory);
        return componentRef.instance;
    }
}
