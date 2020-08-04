import { FormGroup } from '@angular/forms';
import { TaskState } from '../../app.constants';
import { EventEmitter } from '@angular/core';

export abstract class Task {
    taskRequestData: any;
    taskDetailData: any;
    taskState: TaskState;
    taskDetailForm: FormGroup;
    saveTaskDetails: EventEmitter<any>;

    abstract onSubmit(data: any): void;
    abstract createRequestBody(data: any): void;

    showDocument(): boolean {
        return true;
    }

    showAudit(): boolean {
        return this.taskState === TaskState.VIEW;
    }

    showCommunication(): boolean {
        return this.taskState === TaskState.VIEW;
    }

    showWorkflow(): boolean {
        return this.taskState === TaskState.VIEW;
    }
}
