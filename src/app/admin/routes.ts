import {Routes} from "@angular/router";
import {adminAddRoutes} from "./add/routes";
import {adminUpdateRoutes} from "./update/routes";
import {AdminComponent} from "./admin/admin.component";

export const adminRoutes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      {path: 'add', children: adminAddRoutes},
      {path: 'update', children: adminUpdateRoutes}
    ]
  }
];
