import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { ChartModule } from 'primeng/chart';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { SlideMenuModule } from 'primeng/slidemenu';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import { ToasterComponent } from './toaster/toaster.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MenubarModule,
    MenuModule,
    ButtonModule,
    InputTextModule,
    PanelModule,
    DropdownModule,
    ChartModule,
    AutoCompleteModule,
    TableModule,
    PaginatorModule,
    SlideMenuModule,
    BlockUIModule,
    ProgressSpinnerModule,
    ToastModule
  ],
  providers: [
    MessageService
  ]
})
export class TMTPrimengModule { }
