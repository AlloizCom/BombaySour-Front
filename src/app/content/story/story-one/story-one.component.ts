import {AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AppComponent} from '../../../app.component';
import {Story} from '../../../../shared/models/story';
import {DeviceDetectorService} from 'ngx-device-detector';
import {ImageService} from '../../../../shared/services/image.service';

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
  @ViewChild('mainImage') mainImageVC: ElementRef;
  @Input() story: Story;
  @Output() loaded = new EventEmitter();

  poster: string = '';

  width = window.innerWidth;

  playing = false;

  height = window.innerHeight;

  isMobile = false;
  private interval;
  private _inited = false;

  constructor(private deviceService: DeviceDetectorService, private _imageService: ImageService) {
    this.isMobile = this.deviceService.isMobile();
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

  @HostListener('window:resize', ['$event'])
  onResize(event) {
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
        this.interval = null;
        main.pause();
      }, 1000);
    } else {
      main.play();
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
      this.interval = setInterval((id = this.story.id) => this.doSome.call(this, id), 1000 / 30);
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

    this.changeContainer(this.width / video.videoWidth, this.height / video.videoHeight, video);

    let containerWidth = 0;
    let containerHeight = 0;
    // let contentWidth = +getComputedStyle(video).videoWidth.replace('px', '');
    // let contentHeight = +getComputedStyle(video).videoHeight.replace('px', '');
    let contentWidth = video.videoWidth;
    let contentHeight = video.videoHeight;
    // containerHeight = this.height;
    // containerWidth = this.width;
    containerHeight = +getComputedStyle(video).height.replace('px', '');
    containerWidth = +getComputedStyle(video).width.replace('px', '');


    let scalingCoefWidth = containerWidth / contentWidth;
    let scalingCoefHeight = containerHeight / contentHeight;

    // console.log(scalingCoefWidth, scalingCoefHeight);
    // console.log(containerWidth, containerHeight);
    // console.log(contentWidth, contentHeight);
    // console.log('-------------------------------------');

    // if(scalingCoefHeight == 1 || scalingCoefWidth == 1 ){
    //   containerHeight = containerHeight/2;
    //   containerWidth = containerWidth/2;
    //   scalingCoefWidth = containerWidth / contentWidth;
    //   scalingCoefHeight = containerHeight / contentHeight;
    //
    // }


    mainWidth = canvas.width / scalingCoefWidth;
    mainHeight = canvas.height / scalingCoefHeight;

    if (this._animationState == 'middle') {
      mainY = (containerHeight / scalingCoefHeight - mainHeight) / 2;
      mainX = (containerWidth / scalingCoefWidth - mainWidth) / 2;
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
    this._imageService.findOne(this.story.id, 'film').subscribe(value => {
      this.poster = value.body;
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
      this.interval = setInterval((id = this.story.id) => this.doSome.call(this, id), 1000 / 30);
    });
  }

  ngOnDestroy(): void {
    console.log('destroy');
    clearInterval(this.interval);
  }

  ngAfterViewInit(): void {
    (<HTMLVideoElement>this.mainVideoVC.nativeElement).addEventListener('canplay', () => {
      this.loaded.emit(true);
      this.playing = true;
      let video = (<HTMLVideoElement>this.mainVideoVC.nativeElement);
      video.style.width = '100vw';
      video.style.height = '100vh';
      let width = this.width / video.videoWidth;
      let height = this.height / video.videoHeight;
      this.changeContainer(width, height, video);

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

  private changeContainer(width, height, video) {
    let coef = video.videoWidth / video.videoHeight;
    // if (width < 1 && height < 1) {
        video.style.minWidth = '';
        video.style.minHeight = '';
        if (width < height) {
          video.style.height = `100vh`;
          video.style.width = `${+getComputedStyle(video).height.replace('px', '') * coef}px`;
        } else if (width > height) {
          // console.log(`height => ${coef}/${+getComputedStyle(video).width.replace('px', '')} = ${coef / +getComputedStyle(video).width.replace('px', '')}`);
          video.style.height = `${+getComputedStyle(video).width.replace('px', '')/coef}px`;
          video.style.width = `100vw`;
        } else {
          video.style.minWidth = '100vw';
          video.style.minHeight = '100vh';
        }
    // }
    // console.log(`
    //      video.videoWidth : ${video.videoWidth}
    //      video.videoHeight: ${video.videoHeight}
    //      video :      h  |  w
    //             min ${getComputedStyle(video).minHeight} ${getComputedStyle(video).minWidth}
    //             max ${getComputedStyle(video).maxHeight} ${getComputedStyle(video).maxWidth}
    //             actual ${getComputedStyle(video).height} ${getComputedStyle(video).width}
    //      ${video.videoWidth / video.videoHeight} : ${+getComputedStyle(video).width.replace('px', '') / +getComputedStyle(video).height.replace('px', '')}
    //      width : ${width}
    //      height : ${height}
    //     `);
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
