import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {PannelComponent} from './pannel/pannel.component';
import {AdminComponent} from './admin/admin.component';
import {GlobalImportsModule} from "../../shared/global-imports/global-imports.module";
import {AddModule} from "./add/add.module";
import {UpdateModule} from "./update/update.module";
import { LoginComponent } from './login/login.component';
import { AdminPannelComponent } from './admin-pannel/admin-pannel.component';


@NgModule({
  imports: [
    GlobalImportsModule,
    AddModule,
    UpdateModule
  ],
  declarations: [PannelComponent, AdminComponent, LoginComponent, AdminPannelComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule {
}
