import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {mainRoutes} from "./routes";
import {RouterModule} from "@angular/router";
import {GlobalImportsModule} from "../shared/global-imports/global-imports.module";
import {AdminModule} from "./admin/admin.module";
import {SharedModule} from "./shared/shared.module";
import {ContentModule} from './content/content.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    GlobalImportsModule,// add all necessary imports there, if they are useful in different modules
    RouterModule.forRoot(mainRoutes, {useHash: true}),
    AdminModule,
    SharedModule,
    ContentModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
