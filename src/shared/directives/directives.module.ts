import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DivMainImageDirective} from "./files/image-div";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DivMainImageDirective
  ],
  exports: [
    DivMainImageDirective
  ]
})
export class DirectivesModule {
}
