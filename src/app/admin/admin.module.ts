import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PannelComponent } from './pannel/pannel.component';
import { AdminComponent } from './admin/admin.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PannelComponent, AdminComponent]
})
export class AdminModule { }
