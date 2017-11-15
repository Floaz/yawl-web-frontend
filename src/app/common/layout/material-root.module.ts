import { NgModule }      from '@angular/core';

import { MatNativeDateModule } from '@angular/material';
import { CovalentDialogsModule } from '@covalent/core';


import { DateAdapter } from '@angular/material';

import { MyDateAdapter } from './material-datetime-adapter';


@NgModule({
	imports: [
        MatNativeDateModule,
        CovalentDialogsModule,
    ],
    providers: [
        {provide: DateAdapter, useClass: MyDateAdapter},
        //{provide: MatPaginatorIntl, useClass: MyPaginatorIntl}
    ]
})
export class MaterialRootModule { }

