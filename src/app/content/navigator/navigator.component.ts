import {Component, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css'],
  animations: [
    trigger('team', [
      transition(':enter', [style({transform: 'translate(-30vw)'}), animate('1200ms {{delay}} ease')], {params: {delay: '0ms'}})]),
    trigger('story', [
      transition(':enter', [style({transform: 'translate(-50vw)'}), animate('1200ms {{delay}} ease')], {params: {delay: '0ms'}})]),
    trigger('stories', [
      transition(':enter', [style({transform: 'translate(-70vw)'}), animate('1200ms {{delay}} ease')], {params: {delay: '0ms'}})]),
    trigger('platform', [
      transition(':enter', [style({transform: 'translate(-90vw)'}), animate('1200ms {{delay}} ease')], {params: {delay: '0ms'}})]),
    trigger('community', [
      transition(':enter', [style({transform: 'translate(-110vw)'}), animate('1200ms {{delay}} ease')], {params: {delay: '0ms'}})])]
})
export class NavigatorComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }

}
