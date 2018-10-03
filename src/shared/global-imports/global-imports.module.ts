import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {DirectivesModule} from "../directives/directives.module";
import {serviceProvider} from "../services/service.provider";
import {MyInterceptor} from "../inteceptor";

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
  ],
  providers: [
    ...serviceProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptor,
      multi: true
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GlobalImportsModule {
}
