import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {AppComponent} from "../../../app.component";

@Component({
  selector: 'app-film-one',
  templateUrl: './film-one.component.html',
  styleUrls: ['./film-one.component.css'],
  animations: [
    trigger('slider', [
      state('left', style({
        // width: '0',
        transform: 'translate(-100vw)',
        // opacity: '.0001'
      }), {params: {}}),
      state('middle', style({
        // width: '100vw',
        transform: 'translate({{middlePos}}vw)',
        // opacity: '1',
      }), {params: {middlePos: 0}}),
      state('right', style({
        // width: '0',
        transform: 'translate(100vw)',
        // opacity: '.0001'
      }), {params: {}}),
      transition('*<=>*', [
        animate('1s ease-in-out')
      ])
    ])]
})
export class FilmOneComponent implements OnInit {
  @ViewChild('mainVideo') mainVideoVC: ElementRef;
  @ViewChild('leftVideo') leftVideoVC: ElementRef;
  @ViewChild('rightVideo') rightVideoVC: ElementRef;
  _src;
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
      this.pause();
  }

  get source() {
    return this._src;
  }

  @Input() set source(src: { id: number, source: any }) {
    this._src = src;
  };

  pause() {
    let main = (<HTMLVideoElement>this.mainVideoVC.nativeElement);
    let left = (<HTMLVideoElement>this.leftVideoVC.nativeElement);
    let right = (<HTMLVideoElement>this.rightVideoVC.nativeElement);
    // console.log('currentTime p m ', main.currentTime);
    // console.log('currentTime p l ', left.currentTime);
    // console.log('currentTime p r ', right.currentTime);
    // left.currentTime = main.currentTime;
    // right.currentTime = main.currentTime;
    // console.log('currentTime  m ', main.currentTime);
    // console.log('currentTime  l ', left.currentTime);
    // console.log('currentTime  r ', right.currentTime);
    if (main.paused) {
      main.play();
      left.play();
      right.play();
    } else {
      main.pause();
      left.pause();
      right.pause();
    }
    // console.log(main.defaultPlaybackRate);
    // console.log(left.defaultPlaybackRate);
    // console.log(right.defaultPlaybackRate);
  }

  ngOnInit() {
    this._inited = true;
    if (this._animationState != 'middle') {
      if (AppComponent.animationService.open)
        this.pause();
      else
        AppComponent.animationService.open$.subscribe(value => {
          if (value) this.pause();
        })
    }
  }
}
