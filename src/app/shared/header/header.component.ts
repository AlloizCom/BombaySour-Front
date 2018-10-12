import {Component, ElementRef, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

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
  color: boolean = false;
  fill: string = 'white';

  constructor(private el: ElementRef, private _router: ActivatedRoute, private _some: Router) {
    _some.events.subscribe(value => {
      if (value instanceof NavigationEnd) {
        this.color = value.urlAfterRedirects != '/film' && value.urlAfterRedirects != '/story';
      }
    });
  }

  ngOnInit() {

  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  changeRoute(e) {
    if (e === 'film' || e === 'story') {
      this.color = false;
      this.fill = 'white';

    } else {
      this.color = true;
      this.fill = 'black';
    }
  }

  hover(e) {
    e.style.width = '100%';
  }

  leave(e) {
    e.style.width = '0%';
  }
}
