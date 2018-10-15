import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter, HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {AppComponent} from "../../../app.component";
import {Story} from "../../../../shared/models/story";

@Component({
  selector: 'app-story-one',
  templateUrl: './story-one.component.html',
  styleUrls: ['./story-one.component.css'],
  animations: [
    trigger('slider', [
      state('left', style({
        transform: 'translate(-100vw)',
      }), {params: {}}),
      state('middle', style({
        transform: 'translate(0)',
      }), {params: {middlePos: 0}}),
      state('right', style({
        transform: 'translate(100vw)',
      }), {params: {}}),
      transition('void=>*', [
        animate('0s')
      ]),
      transition('*<=>*', [
        animate('1s ease-in-out')
      ]),
    ])
  ]
})
export class StoryOneComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('mainVideo') mainVideoVC: ElementRef;
  @Input() story: Story;
  @Output() loaded = new EventEmitter();


  width = window.innerWidth;

  playing = false;

  height = window.innerHeight;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }
  private interval;
  private _inited = false;

  constructor() {
  }

  _animationState: string;

  get animationState(): string {
    return this._animationState;
  }

  @Input() set animationState(value: string) {
    this._animationState = value;
    if (this._inited)
      this.pause(value != 'middle');
  }

  pause(val?: boolean) {
    let main = (<HTMLVideoElement>this.mainVideoVC.nativeElement);
    if (val) {
      setTimeout(() => {
        clearInterval(this.interval);
        main.pause();
      }, 1000);
    } else {
      main.play();
      this.interval = setInterval((id = this.story.id) => this.doSome.call(this, id), 1000 / 30)
    }
  }

  doSome(id: number) {
    let canvas = (<HTMLCanvasElement>document.getElementById('canvas' + id));
    let divWidthPX = +getComputedStyle(canvas.parentElement).transform.split(',')[4];
    let divWidthPXABS = Math.abs(divWidthPX);
    let restWidth = (window.innerWidth - divWidthPXABS);
    let context = canvas.getContext('2d');
    let video = (<HTMLVideoElement>document.getElementById(`video${id}`));
    let onePiece = video.videoWidth / 5;
    let onePieceCanvas = restWidth / 5;
    let positionVideoOne: { xFrom: number, xTo: number, canvasXFrom: number, canvasXTo: number } =
      {xFrom: onePiece, xTo: onePiece * 2, canvasXFrom: onePieceCanvas, canvasXTo: onePieceCanvas * 2};
    let positionVideoTwo: { xFrom: number, xTo: number, canvasXFrom: number, canvasXTo: number } =
      {xFrom: onePiece * 3, xTo: onePiece * 4, canvasXFrom: onePieceCanvas * 3, canvasXTo: onePieceCanvas * 4};
    if (divWidthPX < 0) {
      positionVideoOne.canvasXFrom += divWidthPXABS;
      positionVideoOne.canvasXTo += divWidthPXABS;
      positionVideoTwo.canvasXFrom += divWidthPXABS;
      positionVideoTwo.canvasXTo += divWidthPXABS;
    }
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    if (divWidthPXABS != 0) {
      context.drawImage(video, positionVideoOne.xFrom, 0, positionVideoOne.xTo - positionVideoOne.xFrom, video.videoHeight, positionVideoOne.canvasXFrom, 0, positionVideoOne.canvasXTo - positionVideoOne.canvasXFrom, canvas.height);
      context.drawImage(video, positionVideoTwo.xFrom, 0, positionVideoTwo.xTo - positionVideoTwo.xFrom, video.videoHeight, positionVideoTwo.canvasXFrom, 0, positionVideoTwo.canvasXTo - positionVideoTwo.canvasXFrom, canvas.height);
    }
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  ngAfterViewInit(): void {
    (<HTMLVideoElement>this.mainVideoVC.nativeElement).addEventListener('canplay', () => {
      this.loaded.emit(true);
      this.playing = true;
    });
    (<HTMLVideoElement>this.mainVideoVC.nativeElement).addEventListener('loaded', () => {
      this.loaded.emit(true);
    });
    setTimeout(() => {
      if (!this.playing)
        (<HTMLVideoElement>this.mainVideoVC.nativeElement).load();
    }, 5000);
    this._inited = true;
    if (this._animationState == 'middle') {
      if (AppComponent.animationService.open) {
        this.pause(false);
      } else {
        let sub;
        sub = AppComponent.animationService.open$.subscribe(value => {
          if (value) this.pause(false);
          sub.unsubscribe();
        });
      }
    }
  }
}
