import {Routes} from "@angular/router";
import {FilmComponent} from "./film/film.component";
import {CommunityComponent} from "./community/community.component";
import {PlatformComponent} from "./platform/platform.component";
import {StoryComponent} from "./story/story.component";
import {TeamComponent} from "./team/team.component";

export const adminUpdateRoutes: Routes = [
  {path: 'film', component: FilmComponent},
  {path: 'community', component: CommunityComponent},
  {path: 'platform', component: PlatformComponent},
  {path: 'story', component: StoryComponent},
  {path: 'team', component: TeamComponent},
];
