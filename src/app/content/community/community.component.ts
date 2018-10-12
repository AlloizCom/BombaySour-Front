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
  pause: boolean = false;
  currentI = -1;

  constructor(private service: CommunityService) {
    this.service.findAllAvailable().subscribe(value => {
      this.teams = value;
    });
  }

  showDescr(val) {
    if (this.currentI == val || this.currentI == -1)
      this.pause = !this.pause;
    this.currentI = this.pause ? val : -1;
    console.log(document.getElementById("community" + this.currentI));
  }

  ngOnInit() {
  }
}

