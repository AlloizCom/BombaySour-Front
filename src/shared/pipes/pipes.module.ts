import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PrefixUrlVideo} from "./pipes/resource.pipe";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PrefixUrlVideo,
  ],exports:[
    PrefixUrlVideo,
  ]
})
export class PipesModule { }
