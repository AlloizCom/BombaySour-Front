import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilmComponent} from './film/film.component';
import {StoryComponent} from './story/story.component';
import {TeamComponent} from './team/team.component';
import {CommunityComponent} from './community/community.component';
import {PlatformComponent} from './platform/platform.component';
import {GlobalImportsModule} from '../../shared/global-imports/global-imports.module';
import {ContentComponent} from './content/content.component';
import {NavigatorComponent} from "./navigator/navigator.component";
import {SharedModule} from "../shared/shared.module";
import { FilmOneComponent } from './film/film-one/film-one.component';
import { StoryOneComponent } from './story/story-one/story-one.component';
import { CommunityOneComponent } from './community/community-one/community-one.component';

@NgModule({
  imports: [
    CommonModule,
    GlobalImportsModule,
    SharedModule,
  ],
  declarations: [
    NavigatorComponent,
    FilmComponent,
    StoryComponent,
    TeamComponent,
    CommunityComponent,
    PlatformComponent,
    ContentComponent,
    FilmOneComponent,
    StoryOneComponent,
    CommunityOneComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContentModule {
}
