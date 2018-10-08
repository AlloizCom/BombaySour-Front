import { Component, OnInit } from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        width: '0px'
      })),
      state('closed', style({
        width: '70vw'
      })),
      transition('open => closed', [
        animate('700ms cubic-bezier(0,.49,.41,.67)')
      ]),
      transition('closed => open', [
        animate('700ms  cubic-bezier(0,.49,.41,.67)')
      ]),
    ])]
})
export class HeaderComponent implements OnInit {
  isOpen = true;

  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

}
