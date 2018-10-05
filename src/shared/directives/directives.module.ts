import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DivMainImageDirective} from "./files/image-div";
import {Base64AndProgressFileDirective} from "./files/file/base64-and-progress-file.directive";
import {Base64AndProgressFilesDirective} from "./files/file/base64-and-progress-files.directive";
import {SmoothAutoscroll} from "./files/smooth-autoscroll";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  declarations: [
    DivMainImageDirective,
    Base64AndProgressFileDirective,
    Base64AndProgressFilesDirective,
    SmoothAutoscroll,
  ],
  exports: [
    DivMainImageDirective,
    Base64AndProgressFileDirective,
    Base64AndProgressFilesDirective,
    SmoothAutoscroll,
  ]
})
export class DirectivesModule {
}
