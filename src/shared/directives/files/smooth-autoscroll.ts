import {Directive, OnDestroy, OnInit} from '@angular/core';

@Directive({
  selector: '[smoothAutoScroll]'
})
export class SmoothAutoscroll implements OnInit, OnDestroy {

  destroyed: boolean = false;
  timeout;
  interval;

  constructor() {
  }

  ngOnInit() {
    this.action();
    document.addEventListener('mousewheel', () => this.action.call(this));
    document.addEventListener('DOMMouseScroll', () => this.action.call(this));
    document.addEventListener('touchmove', () => this.action.call(this));
    document.addEventListener('touchstart', () => this.action.call(this));
  }

  action() {
    if (this.destroyed)
      return;
    clearInterval(this.interval);
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.interval = setInterval(() => {
        window.scrollBy(0, 1);
      }, 25);
    }, 1000)
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
    clearTimeout(this.timeout);
    this.destroyed = true;
  }

}
