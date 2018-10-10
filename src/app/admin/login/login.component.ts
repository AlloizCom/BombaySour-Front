import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../../shared/services/login.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup;

  constructor(private _loginService:LoginService) { }

  send(){
    this._loginService.sendCredentials(this.form.getRawValue());
  }

  ngOnInit() {
    this.form = new FormGroup({
      username:new FormControl('',[Validators.required,Validators.minLength(4)]),
      password:new FormControl('',[Validators.required,Validators.minLength(4)])
    });
  }

}
