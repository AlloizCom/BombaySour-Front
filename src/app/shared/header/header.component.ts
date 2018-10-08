import { Component, OnInit } from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('openClose', [
      state('close', style({
        width: '0px'
      })),
      state('open', style({
        width: '100vw'
      })),
      transition('open => closed', [
        animate('1000ms cubic-bezier(0.16, 1.08, 0.38, 0.98)')
      ]),
      transition('closed => open', [
        animate('1000ms  cubic-bezier(0.16, 1.08, 0.38, 0.98)')
      ]),
    ])]
})
export class HeaderComponent implements OnInit {
  isOpen = false;

  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

}
