import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {animate, group, state, style, transition, trigger} from "@angular/animations";
import {AppComponent} from "../../../app.component";

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
        transform: 'translate({{middlePos}}vw)',
      }), {params: {middlePos: 0}}),
      state('right', style({
        transform: 'translate(100vw)',
      }), {params: {}}),
      transition('*=>*', [
        animate('1s ease-in-out')
      ])
    ]),
    trigger('child', [
      state('left', style({
        opacity: '1',
      }), {params: {}}),
      state('middle', style({
        opacity: '.0001',
      }), {params: {}}),
      state('right', style({
        opacity: '1',
      }), {params: {}}),
      transition('*=>*', group([
        style({opacity: .5}),
        animate('1s ease-in-out')
      ]))
    ])
  ]
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
    if (this._inited) {
      this.pause();
    }
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
    if (main.paused) {
      left.currentTime = main.currentTime;
      right.currentTime = main.currentTime;
      main.play();
      left.play();
      right.play();
    } else {
      main.pause();
      left.pause();
      right.pause();
    }
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
