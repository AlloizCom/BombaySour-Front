import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {DirectivesModule} from "../directives/directives.module";
import {serviceProvider} from "../services/service.provider";
import {MyInterceptor} from "../inteceptor";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PipesModule} from "../pipes/pipes.module";
import {CanActivateAdmin} from "../can-activate/can-activate";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
  ],
  exports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    BrowserAnimationsModule,
    PipesModule
  ],
  providers: [
    ...serviceProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptor,
      multi: true
    },
    CanActivateAdmin
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GlobalImportsModule {
}
