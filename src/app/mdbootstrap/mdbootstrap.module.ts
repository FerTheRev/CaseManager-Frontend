import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MdbFormsModule,
    MdbDropdownModule
  ],
  exports: [
    MdbFormsModule,
    MdbModalModule,
    MdbDropdownModule
  ]
})
export class MdbootstrapModule { }
