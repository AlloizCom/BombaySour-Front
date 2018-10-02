import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmComponent } from './film/film.component';
import { StoryComponent } from './story/story.component';
import { TeamComponent } from './team/team.component';
import { CommunityComponent } from './community/community.component';
import { PlatformComponent } from './platform/platform.component';
import {GlobalImportsModule} from "../../../shared/global-imports/global-imports.module";
import { CommunityOneComponent } from './community/community-one/community-one.component';
import { FilmOneComponent } from './film/film-one/film-one.component';
import { PlatformOneComponent } from './platform/platform-one/platform-one.component';
import { StoryOneComponent } from './story/story-one/story-one.component';
import { TeamOneComponent } from './team/team-one/team-one.component';

@NgModule({
  imports: [
    GlobalImportsModule
  ],
  declarations: [FilmComponent, StoryComponent, TeamComponent, CommunityComponent, PlatformComponent, CommunityOneComponent, FilmOneComponent, PlatformOneComponent, StoryOneComponent, TeamOneComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class UpdateModule { }
