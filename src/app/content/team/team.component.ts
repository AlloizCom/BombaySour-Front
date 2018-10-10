import {Component, OnInit} from '@angular/core';
import {TeamService} from "../../../shared/services/team.service";
import {Team} from "../../../shared/models/team";
import {AnimationBuilder} from "@angular/animations";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teams: Team[] = [];
  timeRemaining = 30000;
  finish = 0;

  constructor(private service: TeamService, private builder: AnimationBuilder) {
    this.service.findAllAvailable().subscribe(value => {
      this.timeRemaining = value.length * 5000;
      this.teams = value;
      setTimeout(() => {
        if (typeof window.orientation !== 'undefined') {
          this.finish = -(document.getElementById(`team${this.teams[0].id}`).parentElement.offsetHeight / (window.innerHeight / 100) / 1.6);
        } else {
          this.finish = -((document.getElementById(`team${this.teams[0].id}`).offsetHeight / (window.innerHeight / 100)) * (this.teams.length - 1.6));
        }
        console.log(this.finish);
      }, 1000)
    });
  }

  ngOnInit() {
  }
}
