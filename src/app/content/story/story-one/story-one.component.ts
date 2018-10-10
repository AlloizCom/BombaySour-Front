import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {animate, group, state, style, transition, trigger} from "@angular/animations";
import {AppComponent} from "../../../app.component";

@Component({
  selector: 'app-story-one',
  templateUrl: './story-one.component.html',
  styleUrls: ['./story-one.component.css'],
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
export class StoryOneComponent implements OnInit {
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
    if (main.paused) {
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
