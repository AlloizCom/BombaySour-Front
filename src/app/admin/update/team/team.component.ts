import {Component, OnInit} from '@angular/core';
import {Team} from "../../../../shared/models/team";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teams: Team[] = [];

  constructor() {
    this.test();
  }

  ngOnInit() {
  }

  test() {
    for (let i = 0; i < 10; i++) {
      let team = new Team();
      team.id = i;
      team.text = `${i}  text  ${i}`;
      team.title = `${i}  title  ${i}`;
      this.teams.push(team);
    }
  }

}
