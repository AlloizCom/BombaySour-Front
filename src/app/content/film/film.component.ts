import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css'],
  animations: [ trigger('openClose1', [
    // ...
    state('open', style({
      width: '100px',
      transform: 'translate(1059px)'
    })),
    state('closed', style({
      width: '212px',
      transform: 'translate(0px)'
    })),
    transition('open => closed', [
      animate('1s ease')
    ]),
    transition('closed => open', [
      animate('1s ease')
    ]),
  ]),
    trigger('openClose2', [
      // ...
      state('open', style({
        width: '100px',
        transform: 'translate(1059px)'
      })),
      state('closed', style({
        width: '424px',
        transform: 'translate(0px)'
      })),
      transition('open => closed', [
        animate('1.1s ease')
      ]),
      transition('closed => open', [
        animate('1.1s ease')
      ]),
    ]),
    trigger('openClose3', [
      // ...
      state('open', style({
        width: '100px',
        transform: 'translate(1059px)'
      })),
      state('closed', style({
        width: '636px',
        transform: 'translate(0px)'
      })),
      transition('open => closed', [
        animate('1s ease')
      ]),
      transition('closed => open', [
        animate('1s ease')
      ]),
    ]),
    trigger('openClose4', [
      // ...
      state('open', style({
        width: '100px',
        transform: 'translate(1059px)'
      })),
      state('closed', style({
        width: '848px',
        transform: 'translate(0px)'
      })),
      transition('open => closed', [
        animate('1.1s ease')
      ]),
      transition('closed => open', [
        animate('1.1s ease')
      ]),
    ]),
    trigger('openClose5', [
      // ...
      state('open', style({
        width: '100px',
        transform: 'translate(1059px)'
      })),
      state('closed', style({
        width: '1060px',
        transform: 'translate(0px)'
      })),
      transition('open => closed', [
        animate('1s ease')
      ]),
      transition('closed => open', [
        animate('1s ease')
      ]),
    ]),
    trigger('openClose11', [
      // ...
      state('open', style({
        width: '212px',
        transform: 'translate(-205px)'
      })),
      state('closed', style({
        width: '212px',
        transform: 'translate(0px)'
      })),
      transition('open => closed', [
        animate('1s ease')
      ]),
      transition('closed => open', [
        animate('1s ease')
      ]),
    ]),
    trigger('openClose22', [
      // ...
      state('open', style({
        width: '424px',
        transform: 'translate(-417px)'
      })),
      state('closed', style({
        width: '424px',
        transform: 'translate(0px)'
      })),
      transition('open => closed', [
        animate('1.2s ease')
      ]),
      transition('closed => open', [
        animate('1.2s ease')
      ]),
    ]),
    trigger('openClose33', [
      // ...
      state('open', style({
        width: '636px',
        transform: 'translate(-630px)'
      })),
      state('closed', style({
        width: '636px',
        transform: 'translate(0px)'
      })),
      transition('open => closed', [
        animate('1s ease')
      ]),
      transition('closed => open', [
        animate('1s ease')
      ]),
    ]),
    trigger('openClose44', [
      // ...
      state('open', style({
        width: '848px',
        transform: 'translate(-842px)'
      })),
      state('closed', style({
        width: '848px',
        transform: 'translate(0px)'
      })),
      transition('open => closed', [
        animate('1.2s ease')
      ]),
      transition('closed => open', [
        animate('1.2s ease')
      ]),
    ]),
    trigger('openClose55', [
      // ...
      state('open', style({
        width: '1060px',
        transform: 'translate(-1053px)'
      })),
      state('closed', style({
        width: '1060px',
        transform: 'translate(0px)'
      })),
      transition('open => closed', [
        animate('1s ease')
      ]),
      transition('closed => open', [
        animate('1s ease')
      ]),
    ])]
})
export class FilmComponent implements OnInit, AfterViewInit{
  isOpen = true;
  isOpen1 = false;

  toggle() {
    this.isOpen = !this.isOpen;
    this.isOpen1 = !this.isOpen1;
  }

  /** Canvas 2d context */
  private context: CanvasRenderingContext2D;
  videoSource: string = "https://player.vimeo.com/external/158148793.hd.mp4?s=8e8741dbee251d5c35a759718d4b0976fbf38b6f&profile_id=119&oauth2_token_id=57447761";
  videoSource1: string = "http://techslides.com/demos/sample-videos/small.mp4";
  constructor() {}

  ngAfterViewInit() {

  }

  ngOnInit(): void {
  }

}
