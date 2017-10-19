import { NgModule }      from '@angular/core';

import { MdNativeDateModule } from '@angular/material';
import { CovalentDialogsModule } from '@covalent/core';


import { DateAdapter } from '@angular/material';

import { MyDateAdapter } from './material-datetime-adapter';


@NgModule({
	imports: [
        MdNativeDateModule,
        CovalentDialogsModule,
    ],
    providers: [
        {provide: DateAdapter, useClass: MyDateAdapter},
        //{provide: MdPaginatorIntl, useClass: MyPaginatorIntl}
    ]
})
export class MaterialRootModule { }

