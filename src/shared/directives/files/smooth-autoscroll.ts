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
  timeRemaining;
  factory: AnimationFactory;
  player: AnimationPlayer;
  previous = 0;

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

  scrollListener(event: WheelEvent | TouchEvent | any, that: SmoothAutoscroll): any {
    that.player.pause();
    let deltaY;
    if (event instanceof WheelEvent) {
      deltaY = (<WheelEvent>event).deltaY;
    } else if(event.thouches){
      deltaY = that.previous - (<TouchEvent>event).touches[0].clientY;
      that.previous = (<TouchEvent>event).touches[0].clientY;
    }else{
      deltaY = event.detail;
    }
    let neSC = that.scrollCount + (deltaY > 0 ? -that.scrollLength : that.scrollLength);
    if (Math.abs(that.scrollCount) > Math.abs(neSC))
      that.scrollCount = 0;
    else
      that.scrollCount = neSC;
    if (that.scrolling) {
      that.player.onDone(() => {
      });
    }
    that.scrolling = true;
    if (!isNaN(that.player.getPosition()))
      that.lastFrom += (that.lastTo - that.lastFrom) * that.player.getPosition();
    that.lastTo = that.lastFrom + that.scrollCount;
    if (that.lastTo > 0) {
      that.lastTo = 0;
    }
    if (that.lastTo <= that.finish) {
      that.lastTo = that.finish;
    }
    that.createAnimation(that.lastFrom, that.lastTo, that.scrollTime);
    that.player.onDone(() => {
      if (isNaN(that.player.getPosition()) || that.player.getPosition() == 0)
        return;
      that.scrollCount = 0;
      that.scrolling = false;
    });
    if (that.nextAuto) {
      clearTimeout(that.nextAuto);
      that.nextAuto = null;
    }
    that.nextAuto = setTimeout(() => {
      that.scrolling = false;
      that.scrollCount = 0;
      if (that.lastFrom > that.finish) {
        that.lastFrom = that.lastTo;
        that.lastTo = that.finish;
        that.timeRemaining = ((Math.abs(that.finish) - Math.abs(that.lastFrom)) / that.pointsPerSec) * 1000;
        // console.log('timeremaining ', that.timeRemaining);
        // console.log('Math.abs(that.finish) ', Math.abs(that.finish));
        // console.log('Math.abs(that.lastFrom) ', Math.abs(that.lastFrom));
        // console.log('that.pointsPerSec ', that.pointsPerSec);
        that.createAnimation(that.lastFrom, that.finish, that.timeRemaining);
      }
    }, 3000);
  }

  private runAnimation() {
    if (!this.initialized)
      return;
    this.running = true;
    this.finish = this.end;
    this.lastTo = this.finish;
    this.lastFrom = this.begin;
    let thats = this;
    this.createAnimation(this.lastFrom, this.lastTo, this.timeRemaining);
    this.pointsPerSec = Math.abs(this.end - this.begin) / (this.timeRemaining / 1000);
    document.onmousewheel = (event, that = thats) => this.scrollListener.call(this, event, that);
    document.addEventListener('DOMMouseScroll',(event, that = thats) => this.scrollListener.call(this, event, that));
    document.ontouchmove = (event, that = thats) => this.scrollListener.call(this, event, that);
    document.ontouchstart = (event) => {
      if (this.scrolling) {
        this.lastFrom += (this.lastTo - this.lastFrom) * this.player.getPosition();
        this.lastTo = this.lastFrom;
        this.createAnimation(this.lastFrom,this.lastTo,1);
      }
    };
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
