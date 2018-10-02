import {Routes} from "@angular/router";
import {adminRoutes} from "./admin/routes";

export const mainRoutes: Routes = [
  {path: 'admin', children: adminRoutes}
];
