import { Component, OnInit, AfterViewChecked, HostBinding } from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  animations: [
    trigger('whightBlock', [
        transition(':enter', [style({width: '0px'}), animate('600ms 2000ms ease')])]),
    trigger('background', [
      transition(':enter', [style({width: '100vw'}), animate('1500ms 3000ms ease')])]),
    trigger('header', [
    transition(':enter', [style({transform: 'scaleX(0.9) scaleY(0.9)', opacity: '0'}), animate('600ms 500ms ease')])]),
        trigger('openClose2', [
          state('open', style({
            width: '0%'
          })),
          state('closed', style({
            width: '100%',
          })),
          transition('open => closed', [
            animate('500ms ease-in-out')
          ]),
          transition('closed => open', [
            animate('500ms ease-in-out')
          ]),
        ])
        ]
})
export class ContentComponent implements OnInit, AfterViewChecked {
  end:boolean =false;
  endSecond:boolean =false;
  finish: boolean = true;
  constructor() { }

  ngOnInit() {
    setTimeout(()=>{this.end=true; 
      this.endSecond =true;}, 3000);
    setTimeout(()=>{this.finish =false;}, 5000);
    }
  ngAfterViewChecked(): void {

    
  }

}
