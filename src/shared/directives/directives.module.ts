import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DivMainImageDirective} from "./files/image-div";
import {Base64AndProgressFileDirective} from "./files/file/base64-and-progress-file.directive";
import {Base64AndProgressFilesDirective} from "./files/file/base64-and-progress-files.directive";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DivMainImageDirective,
    Base64AndProgressFileDirective,
    Base64AndProgressFilesDirective
  ],
  exports: [
    DivMainImageDirective,
    Base64AndProgressFileDirective,
    Base64AndProgressFilesDirective
  ]
})
export class DirectivesModule {
}
