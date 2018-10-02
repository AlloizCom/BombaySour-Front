import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PannelComponent } from './pannel/pannel.component';
import { AdminComponent } from './admin/admin.component';
import {GlobalImportsModule} from "../../shared/global-imports/global-imports.module";


@NgModule({
  imports: [
    GlobalImportsModule
  ],
  declarations: [PannelComponent, AdminComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }
