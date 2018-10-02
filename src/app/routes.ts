import {Routes} from '@angular/router';
import {adminRoutes} from './admin/routes';
import {contentRoutes} from './content/content.routes';

export const mainRoutes: Routes = [
  {path: 'admin', children: adminRoutes},
  ...contentRoutes
];
