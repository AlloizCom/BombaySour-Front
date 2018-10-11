import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {CommunityService} from "../../../shared/services/community.service";
import {Community} from "../../../shared/models/community";

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit, OnDestroy {

  teams: Community[] = [];
  interval;
  timeout;


  constructor(private service: CommunityService) {
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
      }, 25);
    }, 1000)
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
    clearTimeout(this.timeout);
  }

}
