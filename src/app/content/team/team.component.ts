import {Component, OnDestroy, OnInit} from '@angular/core';
import {TeamService} from "../../../shared/services/team.service";
import {Team} from "../../../shared/models/team";
import {AnimationBuilder} from "@angular/animations";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit, OnDestroy {

  teams: Team[] = [];
  interval;
  timeout;

  constructor(private service: TeamService, private builder: AnimationBuilder) {
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
