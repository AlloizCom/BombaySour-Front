import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmComponent } from './film/film.component';
import { StoryComponent } from './story/story.component';
import { TeamComponent } from './team/team.component';
import { CommunityComponent } from './community/community.component';
import { PlatformComponent } from './platform/platform.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FilmComponent, StoryComponent, TeamComponent, CommunityComponent, PlatformComponent]
})
export class UpdateModule { }
