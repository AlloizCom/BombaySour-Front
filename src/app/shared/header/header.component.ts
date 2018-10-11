import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {ActivatedRoute} from '@angular/router';
import {CommunityComponent} from '../../content/community/community.component';

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
  color: boolean =false;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {

  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
  changeRoute(e){
    if(e==='film' || e==='story'){
      this.color = false;
    }else{
      this.color = true;
    }
  }
  hover(e){
    e.style.width = '100%';
  }
  leave(e){
    e.style.width = '0%';
  }

}
