import {Component, OnDestroy, OnInit} from '@angular/core';
import {Platform} from "../../../shared/models/platform";
import {PlatformService} from "../../../shared/services/platform.service";

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.css']
})
export class PlatformComponent implements OnInit,OnDestroy {

  teams: Platform[] = [];
  interval;
  timeout;

  constructor(private service: PlatformService) {
    this.service.findAllAvailable().subscribe(value => {
      this.teams = value;
    });
  }

  ngOnInit() {
    this.action(this);
    document.addEventListener('mousewheel', () => this.action(this), {passive: false});
    document.addEventListener('DOMMouseScroll', () => this.action(this), {passive: false});
    document.addEventListener('touchmove', () => this.action(this), {passive: false});
    document.ontouchstart = () => this.action(this);
  }

  action(that) {
    clearInterval(that.interval);
    clearTimeout(that.timeout);
    that.timeout = setTimeout(() => {
      that.interval = setInterval(() => {
        window.scrollBy(0, 1);
      }, 10);
    }, 1000)
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
    clearTimeout(this.timeout);
  }

}
