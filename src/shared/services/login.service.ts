import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AppComponent} from "../../app/app.component";
import {Router} from "@angular/router";

@Injectable()
export class LoginService {

  constructor(private _httpClient:HttpClient,private router:Router){}

  sendCredentials(credentials:{username:string,password:string}){
    this._httpClient.post(`/login/login`,credentials).subscribe(value => {AppComponent.isAuthorized = value;this.router.navigateByUrl('/admin/add')});
  }

}
