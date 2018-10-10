import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AppComponent} from "../../app/app.component";

@Injectable()
export class CanActivateAdmin implements CanActivate,CanActivateChild {

  constructor(private _router: Router) {
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!AppComponent.isAuthorized)
      this._router.navigateByUrl('/admin/login');
    return AppComponent.isAuthorized;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!AppComponent.isAuthorized)
      this._router.navigateByUrl('/admin/login');
    return AppComponent.isAuthorized;
  }
}
