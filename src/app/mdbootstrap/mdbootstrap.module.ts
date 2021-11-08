import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MdbFormsModule
  ],
  exports: [
    MdbFormsModule,
    MdbModalModule
  ]
})
export class MdbootstrapModule { }
