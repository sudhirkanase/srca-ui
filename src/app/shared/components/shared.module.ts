import { NgModule } from '@angular/core';
import { AccountSearchComponent } from './account-search/account-search.component';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        AccountSearchComponent
    ],
    imports: [
        PanelModule,
        TableModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
    providers: [
    ],
    exports: [AccountSearchComponent],

})
export class SharedModule { }
