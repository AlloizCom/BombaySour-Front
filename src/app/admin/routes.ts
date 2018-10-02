import {Routes} from "@angular/router";
import {adminAddRoutes} from "./add/routes";
import {adminUpdateRoutes} from "./update/routes";

export const adminRoutes: Routes = [
  {path: 'add', children: adminAddRoutes},
  {path: 'update', children: adminUpdateRoutes},
];
