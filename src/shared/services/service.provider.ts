import {Provider} from "@angular/core";
import {CommunityService} from "./community.service";
import {FilmService} from "./film.service";
import {ImageService} from "./image.service";
import {PlatformService} from "./platform.service";
import {StoryService} from "./story.service";
import {TeamService} from "./team.service";
import {LoginService} from "./login.service";

export const serviceProvider: Provider[] = [
  CommunityService,
  FilmService,
  ImageService,
  PlatformService,
  StoryService,
  TeamService,
  LoginService
];
