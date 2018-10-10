import {Routes} from "@angular/router";
import {adminAddRoutes} from "./add/routes";
import {adminUpdateRoutes} from "./update/routes";
import {AdminComponent} from "./admin/admin.component";
import {LoginComponent} from "./login/login.component";
import {CanActivateAdmin} from "../../shared/can-activate/can-activate";
import {AdminPannelComponent} from "./admin-pannel/admin-pannel.component";

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {
        path: '', component: AdminPannelComponent, canActivate: [CanActivateAdmin],
        canActivateChild: [CanActivateAdmin], children: [
          {
            path: 'add', canActivate: [CanActivateAdmin],
            canActivateChild: [CanActivateAdmin], children: adminAddRoutes
          },
          {
            path: 'update', canActivate: [CanActivateAdmin],
            canActivateChild: [CanActivateAdmin], children: adminUpdateRoutes
          }
        ]
      },
    ]
  }
];
