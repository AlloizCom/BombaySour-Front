import { Component, OnInit } from '@angular/core';
import {divTrigger} from "./navigator.animations";
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css'],
  animations: [
    trigger('team', [
      transition(':enter', [style({transform: 'translate(-30vw)'}), animate('1200ms 4200ms ease')])]),
    trigger('story', [
      transition(':enter', [style({transform: 'translate(-50vw)'}), animate('1200ms 4200ms ease')])]),
    trigger('films', [
      transition(':enter', [style({transform: 'translate(-70vw)'}), animate('1200ms 4200ms ease')])]),
    trigger('platform', [
      transition(':enter', [style({transform: 'translate(-90vw)'}), animate('1200ms 4200ms ease')])]),
    trigger('community', [
      transition(':enter', [style({transform: 'translate(-110vw)'}), animate('1200ms 4200ms ease')])])]
})
export class NavigatorComponent implements OnInit {
  delay:number = 4200;

  constructor() { }

  ngOnInit() {
  }

}
