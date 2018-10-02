import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {DirectivesModule} from "../directives/directives.module";

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
  ], schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GlobalImportsModule {
}
