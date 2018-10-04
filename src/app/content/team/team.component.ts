import { Component, OnInit } from '@angular/core';
import {TeamService} from "../../../shared/services/team.service";
import {Team} from "../../../shared/models/team";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teams:Team[]=[];

  constructor(private service:TeamService) {
    this.service.findAllAvailable().subscribe(value => this.teams = value);
  }

  ngOnInit() {
  }

}
