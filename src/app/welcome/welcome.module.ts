import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { ThirdComponent } from './third/third.component';
import { NavigatorComponent } from './navigator/navigator.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FirstComponent, SecondComponent, ThirdComponent, NavigatorComponent]
})
export class WelcomeModule { }
