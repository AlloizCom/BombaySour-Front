import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {AppComponent} from "../../../app.component";
import {Film} from "../../../../shared/models/film";

@Component({
  selector: 'app-film-one',
  templateUrl: './film-one.component.html',
  styleUrls: ['./film-one.component.css'],
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
export class FilmOneComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('mainVideo') mainVideoVC: ElementRef;
  @Input() film: Film;
  @Output() loaded = new EventEmitter();
  width = window.innerWidth;

  height = window.innerHeight;
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
    if (this._inited) {
      this.pause(value != 'middle');
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
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
      this.interval = setInterval((id = this.film.id) => this.doSome.call(this, id), 1000 / 30)
    }
  }

  doSome(id: number) {
    let canvas = (<HTMLCanvasElement>document.getElementById('canvas' + id));
    let divWidthPX = +getComputedStyle(canvas.parentElement).transform.split(',')[4];
    let divWidthPXABS = Math.abs(divWidthPX);
    let restWidth = (window.innerWidth - divWidthPXABS);
    let context = canvas.getContext('2d');
    let video = (<HTMLVideoElement>document.getElementById(`video${id}`));

    let canvasW2H = canvas.width / canvas.height;
    let videoW2H = video.videoWidth / video.videoHeight;

    let mainX = 0;
    let mainY = 0;
    let mainWidth = video.videoWidth;
    let mainHeight = video.videoHeight;

    console.error('---------------------');

    console.log(`canvas : ${canvasW2H}`);
    console.log(`video : ${videoW2H}`);

    if (canvasW2H > videoW2H) {
      //video is wider
      let target = canvas.height / video.videoHeight;
      let current = canvas.width / video.videoWidth;
      mainX = (video.videoWidth * (target / current)) / 2;
      mainWidth = video.videoWidth - (mainX * 2);

      console.log(`target : ${target}`);
      console.log(`current : ${current}`);
      console.log(`mainX : ${mainX}`);
      console.log(`mainWidth : ${mainWidth}`);

      console.log(`canvas : ${canvasW2H}`);
      console.log(`video : ${mainWidth / video.videoHeight}`);

    } else if (canvasW2H < videoW2H) {
      //video is heigher
      let target = canvas.width / video.videoWidth;
      let current = canvas.height / video.videoHeight;
      mainY = (video.videoHeight * (target / current)) / 2;
      mainHeight = video.videoHeight - (mainY * 2);

      console.log(`target : ${target}`);
      console.log(`current : ${current}`);
      console.log(`mainY : ${mainY}`);
      console.log(`mainHeight : ${mainHeight}`);

      console.log(`canvas : ${canvasW2H}`);
      console.log(`video : ${video.videoWidth / mainHeight}`);
    }

    let onePiece = mainWidth / 5;
    let onePieceCanvas = restWidth / 5;
    let positionVideoOne: Position = new Position();
    let positionVideoTwo: Position = new Position();
    positionVideoOne.xFrom = mainX + onePiece;
    positionVideoOne.xTo = mainX + onePiece * 2;
    positionVideoOne.canvasXFrom = onePieceCanvas;
    positionVideoOne.canvasXTo = onePieceCanvas * 2;
    positionVideoOne.yFrom = mainY;
    positionVideoOne.yTo = mainY + mainHeight;
    positionVideoTwo.xFrom = mainX + onePiece * 3;
    positionVideoTwo.xTo = mainX + onePiece * 4;
    positionVideoTwo.canvasXFrom = onePieceCanvas * 3;
    positionVideoTwo.canvasXTo = onePieceCanvas * 4;
    positionVideoTwo.yFrom = mainY;
    positionVideoTwo.yTo = mainY + mainHeight;
    if (divWidthPX < 0) {
      positionVideoOne.canvasXFrom += divWidthPXABS;
      positionVideoOne.canvasXTo += divWidthPXABS;
      positionVideoTwo.canvasXFrom += divWidthPXABS;
      positionVideoTwo.canvasXTo += divWidthPXABS;
    }
    context.drawImage(video, mainX, mainY, mainWidth, mainHeight, 0, 0, canvas.width, canvas.height);
    if (divWidthPXABS != 0) {
      context.drawImage(video, positionVideoOne.xFrom, positionVideoOne.yFrom, positionVideoOne.xTo - positionVideoOne.xFrom, mainHeight, positionVideoOne.canvasXFrom, 0, positionVideoOne.canvasXTo - positionVideoOne.canvasXFrom, canvas.height);
      context.drawImage(video, positionVideoTwo.xFrom, positionVideoTwo.yFrom, positionVideoTwo.xTo - positionVideoTwo.xFrom, mainHeight, positionVideoTwo.canvasXFrom, 0, positionVideoTwo.canvasXTo - positionVideoTwo.canvasXFrom, canvas.height);
    }
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  ngAfterViewInit(): void {
    (<HTMLVideoElement>this.mainVideoVC.nativeElement).addEventListener('canplay', () => {
      this.loaded.emit(true)
    });
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


class Position {
  xFrom: number;
  xTo: number;
  yFrom: number;
  yTo: number;
  canvasXFrom: number;
  canvasXTo: number;
}
