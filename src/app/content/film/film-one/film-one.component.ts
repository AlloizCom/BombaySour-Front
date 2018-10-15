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
  private interval;
  private _inited = false;

  constructor(private deviceService: DeviceDetectorService, private _imageService: ImageService) {
    console.log(this.deviceService.isDesktop());
    console.log(this.deviceService.isMobile());
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
    let image = (<HTMLImageElement>this.mainImageVC.nativeElement);
    let video = (<HTMLVideoElement>document.getElementById(`video${id}`));
    let mainX = 0;
    let mainY = 0;
    let mainWidth = video.videoWidth;
    let mainHeight = video.videoHeight;
    if (this.deviceService.isMobile()) {
      mainHeight = image.height;
      mainWidth = image.width;
      if (canvas.width < image.width) {
        let onePX = image.naturalWidth / image.width;
        mainWidth = canvas.width * onePX;
        mainX = ((image.width - mainWidth) / 2) * onePX;
      } else {
        mainWidth = image.naturalWidth;
      }
      if (canvas.height < image.height) {
        let onePX = image.naturalHeight / image.height;
        mainHeight = canvas.height * onePX;
        mainY = ((image.height - mainHeight) / 2) * onePX;
      } else {
        mainHeight = image.naturalHeight;
      }
    } else {
      mainHeight = video.height;
      mainWidth = video.width;
      if (canvas.width < video.width) {
        let onePX = video.videoWidth / video.width;
        mainWidth = canvas.width * onePX;
        mainX = ((video.width - mainWidth) / 2) * onePX;
      } else {
        mainWidth = video.videoWidth;
      }
      if (canvas.height < video.height) {
        let onePX = video.videoWidth / video.height;
        mainHeight = canvas.height * onePX;
        mainY = ((video.height - mainHeight) / 2) * onePX;
      } else {
        mainHeight = video.videoHeight;
      }
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
    if (!this.deviceService.isMobile()) {
      this.draw(context, video, mainX, mainY, mainWidth, mainHeight, canvas, divWidthPXABS, positionVideoOne, positionVideoTwo);
    } else {
      this.draw(context, image, mainX, mainY, mainWidth, mainHeight, canvas, divWidthPXABS, positionVideoOne, positionVideoTwo);
    }
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
    (<HTMLVideoElement>this.mainVideoVC.nativeElement).addEventListener('canplay', () => {
      this.loaded.emit(true);
      this.playing = true;
    });
    (<HTMLVideoElement>this.mainVideoVC.nativeElement).addEventListener('loaded', () => {
      this.loaded.emit(true);
    });
    setTimeout(()=>{
      if(!this.playing)
        (<HTMLVideoElement>this.mainVideoVC.nativeElement).load();
    },5000);
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
