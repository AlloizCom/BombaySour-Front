import { Component, OnInit } from '@angular/core';
import {divTrigger} from "./navigator.animations";

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css'],
  animations:[divTrigger]
})
export class NavigatorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
