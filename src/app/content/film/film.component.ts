import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css'],
  animations: [,
    trigger('openClose2', [
      // ...
      state('open', style({
        width: '0px',
        transform: 'translate(100vw)'
      })),
      state('closed', style({
        width: '20vw',
        transform: 'translate(20vw)'
      })),
      transition('open => closed', [
        animate('1.1s ease-in-out')
      ]),
      transition('closed => open', [
        animate('1.1s  ease-in-out')
      ]),
    ]),
    trigger('openClose4', [
      // ...
      state('open', style({
        width: '0px',
        transform: 'translate(100vw)'
      })),
      state('closed', style({
        width: '20vw',
        transform: 'translate(60vw)'
      })),
      transition('open => closed', [
        animate('1s ease-in-out')
      ]),
      transition('closed => open', [
        animate('1s  ease-in-out')
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
        animate('1.1s  ease-out')
      ]),
      transition('closed => open', [
        animate('1.1s 300ms ease-in')
      ]),
    ]),
    trigger('openClose22', [
      // ...
      state('open', style({
        width: '0px',
        transform: 'translate(-40vw)',
        marginLeft: '0vw'
      })),
      state('closed', style({
        width: '20vw',
        transform: 'translate(0px)',
        marginLeft: '20vw'
      })),
      transition('open => closed', [
        animate('1.1s ease-in-out')
      ]),
      transition('closed => open', [
        animate('1.1s  ease-in-out')
      ]),
    ]),
    trigger('openClose44', [
      // ...
      state('open', style({
        width: '0px',
        transform: 'translate(-80vw)',
        marginLeft: '0vw'
      })),
      state('closed', style({
        width: '20vw',
        transform: 'translate(0px)',
        marginLeft: '60vw'
      })),
      transition('open => closed', [
        animate('1s ease-in-out')
      ]),
      transition('closed => open', [
        animate('1s  ease-in-out')
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
        animate('1.1s ease-out')
      ]),
      transition('closed => open', [
        animate('1.1s 300ms ease-in')
      ]),
    ])]
})
export class FilmComponent implements OnInit, AfterViewInit {
  @ViewChild('videoPlayer2') videoPlayer2: ElementRef;
  @ViewChild('videoPlayer4') videoPlayer4: ElementRef;
  @ViewChild('videoPlayer5') videoPlayer5: ElementRef;
  @ViewChild('videoPlayer7') videoPlayer7: ElementRef;
  @ViewChild('videoPlayer9') videoPlayer9: ElementRef;
  @ViewChild('videoPlayer10') videoPlayer10: ElementRef;
  isOpen = true;
  isOpen1 = false;
  displayNone1: boolean = true;
  displayNone2: boolean = true;
  videoSource: string = 'https://player.vimeo.com/external/158148793.hd.mp4?s=8e8741dbee251d5c35a759718d4b0976fbf38b6f&profile_id=119&oauth2_token_id=57447761';
  videoSource1: string = 'https://player.vimeo.com/external/158148793.hd.mp4?s=8e8741dbee251d5c35a759718d4b0976fbf38b6f&profile_id=119&oauth2_token_id=57447761';
  videoSource2: string = 'https://player.vimeo.com/external/158148793.hd.mp4?s=8e8741dbee251d5c35a759718d4b0976fbf38b6f&profile_id=119&oauth2_token_id=57447761';

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
        this.videoPlayer7.nativeElement.valume = 0;
        this.videoPlayer9.nativeElement.valume = 0;
        this.videoPlayer10.nativeElement.valume = 0;
      }, 1500);


  }

  ngAfterViewInit() {
  }

  ngOnInit(): void {
  }

}
