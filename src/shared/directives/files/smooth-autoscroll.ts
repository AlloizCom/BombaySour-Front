import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {animate, AnimationBuilder, AnimationFactory, AnimationPlayer, style} from "@angular/animations";

@Directive({
  selector: '[smoothAutoScroll]'
})
export class SmoothAutoscroll implements OnInit {

  @Input() begin;
  @Input() scrollLength;
  @Input() scrollTime;
  @Input() delay;
  @Input() initialDelay;
  lastTo = this.end;
  lastFrom = this.begin;
  finish = this.end;
  scrolling = false;
  scrollCount = 0;
  pointsPerSec;
  nextAuto;
  running = false;
  initialized = false;
  private timeRemaining;
  private factory: AnimationFactory;
  private player: AnimationPlayer;

  constructor(private element: ElementRef, private builder: AnimationBuilder) {
  }

  _end;

  get end() {
    return this._end;
  }

  @Input() set end(end) {
    this._end = end;
    if (this.nextAuto)
      clearTimeout(this.nextAuto);
    this.runAnimation();
  };

  @Input() set time(time) {
    this.timeRemaining = time;
    if (this.nextAuto)
      clearTimeout(this.nextAuto);
    this.runAnimation();
  };

  ngOnInit(): void {
    this.factory = this.builder.build([
        style({transform: 'translate3d(0,{{scrollFrom}}vh,0)'}),
        animate('{{timeRemaining}}ms', style({transform: `translate3d(0,{{scrollTo}}vh,0)`}))
      ]
    );
    this.pointsPerSec = Math.abs(this.end - this.begin) / (this.timeRemaining / 1000);
    setTimeout(() => {
      if (!this.running)
        this.runAnimation();
    }, this.initialDelay);
    this.initialized = true;
  }

  private runAnimation() {
    if (!this.initialized)
      return;
    this.running = true;
    this.finish = this.end;
    this.lastTo = this.finish;
    this.lastFrom = this.begin;
    this.createAnimation(this.lastFrom, this.lastTo, this.timeRemaining);
    (<HTMLDivElement>this.element.nativeElement).onmousewheel = (event: WheelEvent) => {
      this.player.pause();
      this.scrollCount += (event.deltaY > 0 ? -this.scrollLength : this.scrollLength);
      if (!this.scrolling) {
        // @ts-ignore
        this.timeRemaining -= this.player.domPlayer.currentTime;
        // this.lastFrom += (this.finish - this.lastFrom) * this.player.getPosition();
      } else {
        console.log(this.nextAuto);
        this.player.onDone(() => {
        });
        console.log(this.nextAuto);
      }
      this.scrolling = true;
      this.lastFrom += (this.lastTo - this.lastFrom) * this.player.getPosition();
      this.lastTo = this.lastFrom + this.scrollCount;
      if (this.lastTo > 0) {
        this.lastTo = 0;
      }
      if (this.lastTo <= this.finish) {
        this.lastTo = this.finish;
      }
      this.createAnimation(this.lastFrom, this.lastTo, this.scrollTime);
      this.player.onDone(() => {
        this.scrollCount = 0;
        this.scrolling = false;
      });
      if (this.nextAuto) {
        clearTimeout(this.nextAuto);
        this.nextAuto = null;
      }
      this.nextAuto = setTimeout(() => {
        this.scrolling = false;
        this.scrollCount = 0;
        if (this.lastFrom > this.finish) {
          this.lastFrom = this.lastTo;
          this.lastTo = this.finish;
          this.timeRemaining = ((Math.abs(this.finish) - Math.abs(this.lastFrom)) / this.pointsPerSec) * 1000;
          this.createAnimation(this.lastFrom, this.finish, this.timeRemaining);
        }
      }, 3000);
    }
  }

  private createAnimation(from: number, to: number, time: number, delay: number = 0) {
    if (this.player) {
      this.player.destroy();
    }
    let player = this.factory.create(this.element.nativeElement, {
      delay: delay,
      params: {
        scrollTo: to,
        scrollFrom: from,
        timeRemaining: time
      }
    });
    // @ts-ignore
    this.player = player._renderer.engine.players[player._renderer.engine.players.length - 1];
    this.player.play();
  }

}
