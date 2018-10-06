import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {st} from '@angular/core/src/render3';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css'],
  animations: [trigger('openClose1', [
    // ...
    state('open', style({
      width: '0px',
      transform: 'translate(100vw)'
    })),
    state('closed', style({
      width: '20vw',
      transform: 'translate(0px)'
    })),
    transition('open => closed', [
      animate('1.1s ease-in-out')
    ]),
    transition('closed => open', [
      animate('1.1s 200ms ease-in-out')
    ]),
  ]),
    trigger('openClose2', [
      // ...
      state('open', style({
        width: '0px',
        transform: 'translate(100vw)'
      })),
      state('closed', style({
        width: '40vw',
        transform: 'translate(0px)'
      })),
      transition('open => closed', [
        animate('1s ease-in-out')
      ]),
      transition('closed => open', [
        animate('1s 200ms ease-in-out')
      ]),
    ]),
    trigger('openClose3', [
      // ...
      state('open', style({
        width: '0px',
        transform: 'translate(100vw)'
      })),
      state('closed', style({
        width: '60vw',
        transform: 'translate(0px)'
      })),
      transition('open => closed', [
        animate('1.1s ease-in-out')
      ]),
      transition('closed => open', [
        animate('1.1s 200ms ease-in-out')
      ]),
    ]),
    trigger('openClose4', [
      // ...
      state('open', style({
        width: '0px',
        transform: 'translate(100vw)'
      })),
      state('closed', style({
        width: '80vw',
        transform: 'translate(0px)'
      })),
      transition('open => closed', [
        animate('1s ease-in-out')
      ]),
      transition('closed => open', [
        animate('1s 200ms ease-in-out')
      ]),
    ]),
    trigger('openClose5', [
      // ...
      state('open', style({
        width: '0px',
        transform: 'translate(100vw)'
      })),
      state('closed', style({
        width: '100vw',
        transform: 'translate(0px)'
      })),
      transition('open => closed', [
        animate('1.1s ease-in-out')
      ]),
      transition('closed => open', [
        animate('1.1s 400ms ease-in-out')
      ]),
    ]),
    trigger('openClose11', [
      // ...
      state('open', style({
        width: '0px',
        transform: 'translate(-20vw)'
      })),
      state('closed', style({
        width: '20vw',
        transform: 'translate(0px)'
      })),
      transition('open => closed', [
        animate('1s ease-in-out')
      ]),
      transition('closed => open', [
        animate('1s 200ms ease-in-out')
      ]),
    ]),
    trigger('openClose22', [
      // ...
      state('open', style({
        width: '0px',
        transform: 'translate(-40vw)'
      })),
      state('closed', style({
        width: '40vw',
        transform: 'translate(0px)'
      })),
      transition('open => closed', [
        animate('1.1s ease-in-out')
      ]),
      transition('closed => open', [
        animate('1.1s 200ms ease-in-out')
      ]),
    ]),
    trigger('openClose33', [
      // ...
      state('open', style({
        width: '0px',
        transform: 'translate(-60vw)'
      })),
      state('closed', style({
        width: '60vw',
        transform: 'translate(0px)'
      })),
      transition('open => closed', [
        animate('1s ease-in-out')
      ]),
      transition('closed => open', [
        animate('1s 200ms ease-in-out')
      ]),
    ]),
    trigger('openClose44', [
      // ...
      state('open', style({
        width: '0px',
        transform: 'translate(-80vw)'
      })),
      state('closed', style({
        width: '80vw',
        transform: 'translate(0px)'
      })),
      transition('open => closed', [
        animate('1.1s ease-in-out')
      ]),
      transition('closed => open', [
        animate('1.1s 200ms ease-in-out')
      ]),
    ]),
    trigger('openClose55', [
      // ...
      state('open', style({
        width: '0px',
        transform: 'translate(-100vw)'
      })),
      state('closed', style({
        width: '100vw',
        transform: 'translate(0px)'
      })),
      transition('open => closed', [
        animate('1s ease-in-out')
      ]),
      transition('closed => open', [
        animate('1s 400ms ease-in-out')
      ]),
    ])]
})
export class FilmComponent implements OnInit, AfterViewInit {
  isOpen = true;
  isOpen1 = false;
  displayNone1: boolean = false;
  displayNone2: boolean = false;
  videoSource: string = 'https://player.vimeo.com/external/158148793.hd.mp4?s=8e8741dbee251d5c35a759718d4b0976fbf38b6f&profile_id=119&oauth2_token_id=57447761';
  videoSource1: string = 'http://techslides.com/demos/sample-videos/small.mp4';
  videoSource2: string = 'https://www.w3schools.com/howto/rain.mp4';

  constructor() {
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.isOpen1 = !this.isOpen1;
    this.displayNone1 =false;
    this.displayNone2 = false;

      setTimeout(() => {
        this.displayNone1 =true;
        this.displayNone2 = true;
      }, 1100);


  }

  ngAfterViewInit() {

  }

  ngOnInit(): void {
  }

}
