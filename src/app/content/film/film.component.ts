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
    ])]
})
export class FilmComponent implements OnInit, AfterViewInit{
  /** Template reference to the canvas element */
  // @ViewChild('canvasEl') canvasEl: ElementRef;
  // @ViewChild('videoPlayer') videoplayer: any;
  isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  /** Canvas 2d context */
  private context: CanvasRenderingContext2D;
  videoSource: string = "https://player.vimeo.com/external/158148793.hd.mp4?s=8e8741dbee251d5c35a759718d4b0976fbf38b6f&profile_id=119&oauth2_token_id=57447761";

  constructor() {}

  ngAfterViewInit() {
    // this.context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');
    //
    // this.draw();
  }

  /**
   * Draws something using the context we obtained earlier on
   */
//   private draw() {
// //     this.context.beginPath();
// //     this.context.moveTo(0,0);
// //     this.context.lineTo(300,150);
// //     this.context.stroke();
// //   }
// //
// //   toggleVideo(event: any) {
// //     this.videoplayer.nativeElement.play();
// // }

  ngOnInit(): void {
  }

}
