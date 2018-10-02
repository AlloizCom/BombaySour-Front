import {FilmComponent} from './film/film.component';
import {StoryComponent} from './story/story.component';
import {TeamComponent} from './team/team.component';
import {PlatformComponent} from './platform/platform.component';
import {Routes} from '@angular/router';
import {CommunityComponent} from './community/community.component';

export const contentRoutes: Routes = [
  {path: 'film', component: FilmComponent},
  {path: 'story', component: StoryComponent},
  {path: 'platform', component: PlatformComponent},
  {path: 'team', component: TeamComponent},
  {path: 'community', component: CommunityComponent}
]
