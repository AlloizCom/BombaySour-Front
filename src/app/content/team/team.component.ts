import {AfterViewInit, Component, OnInit} from '@angular/core';
import {TeamService} from "../../../shared/services/team.service";
import {Team} from "../../../shared/models/team";
import {AnimationBuilder} from "@angular/animations";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit{

  teams: Team[] = [];
  timeRemaining = 30000;
  finish = 0;

  constructor(private service: TeamService, private builder: AnimationBuilder) {
    this.service.findAllAvailable().subscribe(value => {
      this.finish = -40 * (value.length - 1.5);
      this.timeRemaining = value.length * 5000;
      this.teams = value;
    });
  }

  ngOnInit() {
  }
}
