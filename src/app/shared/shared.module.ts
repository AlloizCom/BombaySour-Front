import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {GlobalImportsModule} from "../../shared/global-imports/global-imports.module";
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  imports: [
    GlobalImportsModule
  ],
  declarations: [HeaderComponent, FooterComponent, LoaderComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  exports:[HeaderComponent,FooterComponent,LoaderComponent]
})
export class SharedModule { }
