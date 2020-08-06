import { Type } from '@angular/core';
import { Task } from '../model/Task';
import { ContactCenterTaskComponent } from '../components/contact-center-task/contact-center-task.component';

export const TASK_COMPONENT_MAP: { [key: string]: Type<Task> } = {
    'Contact Center': ContactCenterTaskComponent
};
