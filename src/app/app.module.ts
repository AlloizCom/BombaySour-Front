import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {mainRoutes} from "./routes";
import {RouterModule} from "@angular/router";
import {GlobalImportsModule} from "../shared/global-imports/global-imports.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(mainRoutes, {useHash: true}),
    GlobalImportsModule // add all necessary imports there, if they are useful in different modules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
