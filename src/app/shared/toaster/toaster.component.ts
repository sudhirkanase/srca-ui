import { Component, OnInit, OnChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { BaseService } from 'src/app/services/base.service';
import { AppSharedService } from 'src/app/services/app-shared.service';

@Component({
    selector: 'srca-toaster',
    templateUrl: './toaster.component.html',
    styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent implements OnInit, OnChanges {

    subscription: Subscription;

    constructor(
        private messageService: MessageService,
        private appSharedService: AppSharedService) {
            this.appSharedService.getToastErrorMessage().subscribe(message => {
                this.showError(message);
              });
         }

    ngOnInit() {
        // subscribe to home component messages
      this.appSharedService.getToastErrorMessage().subscribe(message => {
            this.showError(message);
          });
    }

    ngOnChanges() {
        this.appSharedService.getToastErrorMessage().subscribe(message => {
            this.showError(message);
          });
    }

    showError(message: string): void {
        this.messageService.add({severity: 'error', summary: message , detail: 'Error'});
    }
}
