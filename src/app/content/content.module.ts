import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmComponent } from './film/film.component';
import { StoryComponent } from './story/story.component';
import { TeamComponent } from './team/team.component';
import { CommunityComponent } from './community/community.component';
import { PlatformComponent } from './platform/platform.component';
import {GlobalImportsModule} from '../../shared/global-imports/global-imports.module';
import { ContentComponent } from './content/content.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    GlobalImportsModule,
    BrowserAnimationsModule
  ],
  declarations: [
    FilmComponent,
    StoryComponent,
    TeamComponent,
    CommunityComponent,
    PlatformComponent,
    ContentComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ContentModule { }
