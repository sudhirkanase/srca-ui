import { Component, OnInit, OnChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { BaseService } from 'src/app/services/base.service';
import { AppSharedService } from 'src/app/services/app-shared.service';
import { ToastType } from '../model/toast-type';

@Component({
    selector: 'srca-toaster',
    templateUrl: './toaster.component.html',
    styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent implements OnInit {

    subscription: Subscription;

    constructor(
        private messageService: MessageService,
        private appSharedService: AppSharedService) {
    }

    ngOnInit() {
        // subscribe to home component messages
        this.appSharedService.getToastMessage().subscribe(toastType => {
            this.showMessage(toastType);
        });
    }

    /**
     * @description To show Toast message
     * If need to show success message - severity = 'success' and  summary = 'Success'
     * If need to show error message - severity = 'error' and  summary = 'Error'
     * @param toastType - input parameter are serverty,summary and toastType
     */
    showMessage(toastType: ToastType): void {
        this.messageService.add({ severity: toastType.severity, summary: toastType.summary, detail: toastType.message });
    }

}
