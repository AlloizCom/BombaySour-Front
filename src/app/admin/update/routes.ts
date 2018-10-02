import {Routes} from "@angular/router";
import {FilmComponent} from "./film/film.component";
import {CommunityComponent} from "./community/community.component";
import {PlatformComponent} from "./platform/platform.component";
import {StoryComponent} from "./story/story.component";
import {TeamComponent} from "./team/team.component";
import {UpdateComponent} from "./update/update.component";
import {FilmOneComponent} from "./film/film-one/film-one.component";
import {CommunityOneComponent} from "./community/community-one/community-one.component";
import {PlatformOneComponent} from "./platform/platform-one/platform-one.component";
import {StoryOneComponent} from "./story/story-one/story-one.component";
import {TeamOneComponent} from "./team/team-one/team-one.component";

export const adminUpdateRoutes: Routes = [
  {
    path: '', component: UpdateComponent, children: [
      {
        path: 'film', children: [
          {path: '', component: FilmComponent},
          {path: ':id', component: FilmOneComponent}
        ]
      },
      {
        path: 'community', children: [
          {path: '', component: CommunityComponent},
          {path: ':id', component: CommunityOneComponent}
        ]
      },
      {
        path: 'platform', children: [
          {path: '', component: PlatformComponent},
          {path: ':id', component: PlatformOneComponent}
        ]
      },
      {
        path: 'story', children: [
          {path: '', component: StoryComponent},
          {path: ':id', component: StoryOneComponent}
        ]
      },
      {
        path: 'team', children: [
          {path: '', component: TeamComponent},
          {path: ':id', component: TeamOneComponent}
        ]
      },
    ]
  }
];
