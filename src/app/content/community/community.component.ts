import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommunityService} from "../../../shared/services/community.service";
import {Community} from "../../../shared/models/community";

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit{

  teams: Community[] = [];

  constructor(private service: CommunityService) {
    this.service.findAllAvailable().subscribe(value => {
      this.teams = value;
    });
  }

  ngOnInit() {
  }
}

