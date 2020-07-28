import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppSharedService } from './../../../services/app-shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'srca-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, OnDestroy {
  blockedDocument: boolean;
  isLoadingSubscription: Subscription;

  constructor(private appSharedService: AppSharedService) { }

  ngOnInit() {
    this.isLoadingSubscription = this.appSharedService.getIsLoading()
      .subscribe((isLoading: boolean) => this.blockedDocument = isLoading);
  }

  ngOnDestroy() {
    this.isLoadingSubscription.unsubscribe();
    this.isLoadingSubscription = null;
  }

}
