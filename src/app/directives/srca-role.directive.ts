import { Directive, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseService } from '../services/base.service';
import { isNullOrUndefined } from 'util';

@Directive({
  selector: '[srcaRole]'
})
export class SrcaRoleDirective implements OnInit {

  @Output() menuList: EventEmitter<any> = new EventEmitter<any>();
  currentUserData: any;
  menuItems = [];

  constructor(private baseService: BaseService) { }

  ngOnInit() {
    this.currentUserData = this.baseService.getLoggedInUser();

    if (!isNullOrUndefined(this.currentUserData.roles.find(e => e.authority === 'ROLE_ADMIN'))) {
      this.menuItems = ['Home', 'Create Task', 'Tasks', 'Reports', 'Security Administration', 'Administration'];
    } else if (!isNullOrUndefined(this.currentUserData.roles.find(e => e.authority === 'AD_WRITE' ||
    e.authority === 'IFS_WRITE' || e.authority === 'PB_WRITE'))) {
      this.menuItems = ['Home', 'Create Task', 'Tasks'];
      this.checkReportingRole();
    } else if (!isNullOrUndefined(this.currentUserData.roles.find(e => e.authority === 'AD_READ' ||
    e.authority === 'IFS_READ' || e.authority === 'PB_READ'))) {
      this.menuItems = ['Home'];
      this.checkReportingRole();
    }  else if (!isNullOrUndefined(this.currentUserData.roles.find(e => e.authority === 'REPORTING'))) {
      this.menuItems = ['Home', 'Reports'];
    }
    this.menuList.emit(this.menuItems);
  }

  checkReportingRole() {
    if (!isNullOrUndefined(this.currentUserData.roles.find(e => e.authority === 'REPORTING'))) {
      this.menuItems.push('Reports');
    }
  }
}
