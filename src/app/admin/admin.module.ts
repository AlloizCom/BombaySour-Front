import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {PannelComponent} from './pannel/pannel.component';
import {AdminComponent} from './admin/admin.component';
import {GlobalImportsModule} from "../../shared/global-imports/global-imports.module";
import {AddModule} from "./add/add.module";
import {UpdateModule} from "./update/update.module";


@NgModule({
  imports: [
    GlobalImportsModule,
    AddModule,
    UpdateModule
  ],
  declarations: [PannelComponent, AdminComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule {
}
