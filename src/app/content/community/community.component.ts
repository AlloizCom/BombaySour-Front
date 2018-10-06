import {Component, OnInit} from '@angular/core';
import {CommunityService} from "../../../shared/services/community.service";
import {Community} from "../../../shared/models/community";

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {

  teams: Community[] = [];
  timeRemaining = 30000;
  finish = 0;

  constructor(private service: CommunityService) {
    this.service.findAllAvailable().subscribe(value => {
      this.finish = -40 * (value.length - 1.5);
      this.timeRemaining = value.length * 5000;
      this.teams = value;
    });
  }

  ngOnInit() {
  }

}
