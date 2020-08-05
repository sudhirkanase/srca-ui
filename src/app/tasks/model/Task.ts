import { FormGroup } from '@angular/forms';
import { TaskState } from '../../app.constants';
import { EventEmitter } from '@angular/core';

/**
 * Base class for all components of Task type (eg. Contact Center Task)
 * Provides an API that child components can override as per requirements
 */
export abstract class Task {
    /**
     * inputs that must be used by each child class/component
     */
    taskDetailData: any;
    taskState: TaskState;
    taskDetailForm: FormGroup;

    /**
     * Save the form data in backend by calling task specific save API
     * @param data data model to be persisted in database
     */
    abstract saveTask(data: any): void;

    /**
     * Generic method to show/hide document tab.
     * Child components with custom functionality can override to produce a different behaviour.
     */
    showDocument(): boolean {
        return true;
    }

    /**
     * Generic method to show/hide Audit tab.
     * Child components with custom functionality can override to produce a different behaviour.
     */
    showAudit(): boolean {
        return this.taskState === TaskState.VIEW;
    }

    /**
     * Generic method to show/hide Communication tab.
     * Child components with custom functionality can override to produce a different behaviour.
     */
    showCommunication(): boolean {
        return this.taskState === TaskState.VIEW;
    }

    /**
     * Generic method to show/hide Workflow tab.
     * Child components with custom functionality can override to produce a different behaviour.
     */
    showWorkflow(): boolean {
        return this.taskState === TaskState.VIEW;
    }
}
