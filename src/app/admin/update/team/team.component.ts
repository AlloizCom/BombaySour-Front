import {Component, OnInit} from '@angular/core';
import {Team} from "../../../../shared/models/team";
import {TeamService} from "../../../../shared/services/team.service";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teams: Team[] = [];

  constructor(private service: TeamService) {
    // this.test();
    service.findAll().subscribe(value => this.teams = value);
  }

  ngOnInit() {
  }

  test() {
    for (let i = 0; i < 10; i++) {
      let team = new Team();
      team.id = i;
      team.biography = `${i}  text  ${i}`;
      team.name = `${i}  title  ${i}`;
      this.teams.push(team);
    }
  }

  delete(id: number) {
    this.service.delete(id).subscribe(value => {
      if (value)
        this.teams = this.teams.filter(value1 => value1.id != id);
    });
  }

}
