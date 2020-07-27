import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

/**
 * Service will decide the Menu and subMenu which will be displayed on screen
 * Depending on logged in user role
 */
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor() { }

  getMenuItem(menuName: string): MenuItem {
    console.log('Menu -->' + menuName);
    let retMenuItem: MenuItem = null;
    switch (menuName) {
      case 'Home':
        retMenuItem = this.getHomeMenuItem();
        break;
      case 'Create Task':
        retMenuItem = this.getCreateTaskMenuItem();
        break;
      case 'Tasks':
        retMenuItem = this.getTasksMenuItem();
        break;
      case 'Reports':
        retMenuItem = this.getReportsMenuItem();
        break;
      case 'Security Administration':
        retMenuItem = this.getSecurityAdminMenuItem();
        break;
      case 'Administration':
        retMenuItem = this.getAdminMenuItem();
        break;
    }
    return retMenuItem;
  }

  getAdminMenuItem(): MenuItem {
    return { label: 'Administration' };
  }

  getSecurityAdminMenuItem(): MenuItem {
    return {
      label: 'Security Administration',
      items: [
        { label: 'Modify User', icon: 'pi pi-user' },
        { label: 'Add User', icon: 'pi pi-fw pi-user-plus' },
        { label: 'Roles', icon: 'pi pi-fw pi-user-edit' },
        { label: 'Privileges', icon: 'pi pi-lock' },
        { label: 'Department Maintenance', icon: 'pi pi-sitemap' }
      ]
    };
  }

  getReportsMenuItem(): MenuItem {
    return {
      label: 'Reports',
      items: [
        { label: 'To do', icon: 'pi pi-fw' },
        { label: 'To do', icon: 'pi pi-fw' },
        { label: 'To do', icon: 'pi pi-fw' },
        { label: 'To do', icon: 'pi pi-fw' }
      ]
    };
  }

  getTasksMenuItem(): MenuItem {
    return {
      label: 'Tasks',
      icon: 'pi pi-fw',
      items: [
        { label: 'My Tasks', icon: 'pi pi-user' },
        { label: 'All Tasks', icon: 'pi pi-fw' },
        { label: 'Task Seach', icon: 'pi pi-search' },
        { label: 'To do', icon: 'pi pi-fw' },
        { label: 'To do', icon: 'pi pi-fw' },
        { label: 'To do', icon: 'pi pi-fw' },
        { label: 'To do', icon: 'pi pi-fw' }
      ]
    };
  }

  getHomeMenuItem(): MenuItem {
    return { label: 'Home', icon: 'pi pi-home', routerLink: 'home' };
  }

  getCreateTaskMenuItem(): MenuItem {
    return {
      label: 'Create Task',
      icon: 'pi pi-fw',
      items: [
        { label: 'AD - With Account', icon: 'pi pi-fw', routerLink: 'create/ad-account/search' },
        { label: 'IFS - With Account', icon: 'pi pi-fw', routerLink: 'create/ifs-account/search' },
        {
          label: 'IFS - Without Account', icon: 'pi pi-fw',
          items: [
            { label: 'Contact Center', icon: 'pi pi-fw', routerLink: 'create/ifs-without-account/contact-center' },
            { label: 'FI Portfolio Diagnostic Review', icon: 'pi pi-fw',
             routerLink: 'create/ifs-without-account/portfolio-diagnostic-review' },
            { label: 'Investments:Other', icon: 'pi pi-fw', routerLink: 'create/ifs-without-account/investments-other' },
            { label: 'Name & Address Record', icon: 'pi pi-fw', routerLink: 'create/ifs-without-account/name-address-record' },
            { label: 'Opportunity Report', icon: 'pi pi-fw', routerLink: 'create/ifs-without-account/opportunity-report' },
            { label: 'Other Tasks', icon: 'pi pi-fw', routerLink: 'create/ifs-without-account/other-tasks' },
            { label: 'Performance Reporting', icon: 'pi pi-fw', routerLink: 'create/ifs-without-account/performance-reporting' },
            { label: 'Prospect Account Analysis', icon: 'pi pi-fw', routerLink: 'create/ifs-without-account/prospect-account-analysis' }
          ]
        },
        {
          label: 'PB - With Client/Account', icon: 'pi pi-fw',
          items: [
            { label: 'Client Search', icon: 'pi pi-fw' },
            { label: 'Account Search', icon: 'pi pi-fw' }
          ]
        },
        {
          label: 'PB - Without Client/Account', icon: 'pi pi-fw',
          items: [
            { label: 'To do option', icon: 'pi pi-fw' },
            { label: 'To do option', icon: 'pi pi-fw' },
            { label: 'To do option', icon: 'pi pi-fw' },
            { label: 'To do option', icon: 'pi pi-fw' },
            { label: 'To do option', icon: 'pi pi-fw' },
            { label: 'To do option', icon: 'pi pi-fw' },
            { label: 'To do option', icon: 'pi pi-fw' },
            { label: 'To do option', icon: 'pi pi-fw' },
            { label: 'To do option', icon: 'pi pi-fw' },
            { label: 'To do option', icon: 'pi pi-fw' }
          ]
        },
        { label: 'PB - Compliance', icon: 'pi pi-fw' },
        {
          label: 'PB - Group Services', icon: 'pi pi-fw',
          items: [
            { label: 'Audit', icon: 'pi pi-fw' },
            { label: 'To do 1', icon: 'pi pi-fw' },
            { label: 'To do 1', icon: 'pi pi-fw' },
            { label: 'To do 1', icon: 'pi pi-fw' },
            { label: 'To do 1', icon: 'pi pi-fw' }
          ]
        }
      ]
    };
  }
}
