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
import {DeviceDetectorService} from "ngx-device-detector";
import {ImageService} from "../../../../shared/services/image.service";

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
  @ViewChild('mainImage') mainImageVC: ElementRef;
  @Input() film: Film;
  @Output() loaded = new EventEmitter();
  width = window.innerWidth;
  playing = false;
  height = window.innerHeight;
  poster: string = '';
  isMobile = false;
  private interval;
  private _inited = false;

  constructor(private deviceService: DeviceDetectorService, private _imageService: ImageService) {
    this.isMobile = this.deviceService.isMobile();
  }

  _animationState: string;

  @Input() set animationState(value: string) {
    this._animationState = value;
    if (this._inited) {
      // this.pause(true);
      this.pause(value != 'middle');
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isMobile = this.deviceService.isMobile();
    console.log(this.deviceService.getDeviceInfo());
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  pause(val?: boolean) {
    if (this.isMobile)
      return;
    let main = (<HTMLVideoElement>this.mainVideoVC.nativeElement);
    if (val) {
      setTimeout(() => {
        clearInterval(this.interval);
        main.pause();
      }, 1000);
    } else {
      if (!this.deviceService.isMobile())
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
    let image = this.isMobile ? (<HTMLImageElement>this.mainImageVC.nativeElement) : null;
    let video = (<HTMLVideoElement>document.getElementById(`video${id}`));
    let mainX = 0;
    let mainY = 0;
    let mainWidth = 0;
    let mainHeight = 0;
    let contentWidth = 0;
    let contentHeight = 0;
    let containerWidth = 0;
    let containerHeight = 0;
    if (this.deviceService.isMobile()) {
      contentHeight = image.naturalHeight;
      contentWidth = image.naturalWidth;
      containerHeight = image.height;
      containerWidth = image.width;
    } else {
      contentHeight = video.videoHeight;
      contentWidth = video.videoWidth;
      containerHeight = +getComputedStyle(video).height.replace('px', '');
      containerWidth = +getComputedStyle(video).width.replace('px', '');
    }

    mainHeight = containerHeight;
    mainWidth = containerWidth;




    //12.11.2018

      let scalingCoefWidth = containerWidth/contentWidth;
      let scalingCoefHeight = containerHeight/contentHeight;

      mainWidth = canvas.width / scalingCoefWidth;
      mainHeight = canvas.height / scalingCoefHeight;


if(this._animationState=='middle') {
    mainY = (containerHeight/scalingCoefHeight-mainHeight)/2;
  mainX = (containerWidth/scalingCoefWidth-mainWidth)/2;
}


    // if (canvas.width < containerWidth) {
    //   // let onePX = contentWidth / containerWidth;
    //   // mainWidth = canvas.width * onePX;
    //   // mainX = ((containerWidth - mainWidth) / 2) * onePX;
    //   let coef = contentHeight / contentWidth;
    //   let onePX = contentWidth / containerWidth;
    //   mainWidth = canvas.width * coef;
    //   mainHeight = canvas.height * coef;
    //   mainX = ((containerWidth - mainWidth) / (2+(onePX*coef)) )* coef;
    // } else {
    //   // mainWidth = contentWidth;
    // }
    // if (canvas.height < containerHeight) {
    //   // let onePX = contentHeight / containerHeight;
    //   // mainHeight = canvas.height * onePX;
    //   // mainY = ((containerHeight - mainHeight) / 2) * onePX;
    //   let onePX = contentHeight / containerHeight;
    //   let coef = contentHeight / contentWidth;
    //   mainHeight = (canvas.height * coef);
    //   mainWidth = (canvas.width * coef);
    //   mainY = ((containerHeight - mainHeight) / 2 * coef) * coef;
    //   mainX = ((containerWidth - mainWidth)/2 * coef) * coef;
    //
    // } else {
    //   // mainHeight = contentHeight;
    //   // mainWidth = contentWidth;
    // }
    //
    //
    // if ((contentWidth >= canvas.width || contentHeight >= canvas.height)) {
    //   let scalingCoef = contentHeight / contentWidth;
    //   let onePX = contentWidth / containerWidth;
    //   mainWidth = canvas.width * onePX;
    //   mainHeight = canvas.height * onePX;
    //   mainX = ((containerWidth - mainWidth) / (2 + (onePX * scalingCoef))) * scalingCoef;
    //
    //   if(canvas.width>(1370)){
    //     let coef = contentHeight / contentWidth;
    //     let onePX = contentWidth / containerWidth;
    //     mainWidth = canvas.width * coef;
    //     mainHeight = canvas.height * coef;
    //     mainX = ((containerWidth - mainWidth) / (2+(onePX*coef)) )* coef;
    //   }
    //
    // }













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
    this.draw(context, this.isMobile ? image : video, mainX, mainY, mainWidth, mainHeight, canvas, divWidthPXABS, positionVideoOne, positionVideoTwo);
  }

  ngOnInit() {
    this._imageService.findOne(this.film.id, 'film').subscribe(value => {
      this.poster = value.body;
      this.interval = setInterval((id = this.film.id) => this.doSome.call(this, id), 1000 / 30)
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  ngAfterViewInit(): void {
    if (!this.isMobile) {
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
    } else {
      this.loaded.emit(true);
    }
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

  private draw(context, video, mainX: number, mainY: number, mainWidth, mainHeight, canvas, divWidthPXABS, positionVideoOne: Position, positionVideoTwo: Position) {
    context.drawImage(video, mainX, mainY, mainWidth, mainHeight, 0, 0, canvas.width, canvas.height);
    if (divWidthPXABS != 0) {
      context.drawImage(video, positionVideoOne.xFrom, positionVideoOne.yFrom, positionVideoOne.xTo - positionVideoOne.xFrom, mainHeight, positionVideoOne.canvasXFrom, 0, positionVideoOne.canvasXTo - positionVideoOne.canvasXFrom, canvas.height);
      context.drawImage(video, positionVideoTwo.xFrom, positionVideoTwo.yFrom, positionVideoTwo.xTo - positionVideoTwo.xFrom, mainHeight, positionVideoTwo.canvasXFrom, 0, positionVideoTwo.canvasXTo - positionVideoTwo.canvasXFrom, canvas.height);
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
