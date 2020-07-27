import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/api';
import { MenuService } from 'src/app/services/menu/menu.service';

/**
 * Component will display top levels application Menu and sub menu items
 */
@Component({
  selector: 'srca-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

  private menubarItems: string[] = ['Home', 'Create Task', 'Tasks', 'Reports', 'Security Administration', 'Administration'];
  menuItems: MenuItem[];

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    let item: MenuItem;
    this.menuItems = [];

    this.menubarItems.forEach(name => {
      item = this.menuService.getMenuItem(name);
      if (item != null) {
        this.menuItems.push(item);
      }
    });
  }
}
