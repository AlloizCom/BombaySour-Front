import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CommunityService} from "../../../shared/services/community.service";
import {Community} from "../../../shared/models/community";

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit, AfterViewInit {

  teams: Community[] = [];
  timeRemaining = 30000;
  finish = 0;

  constructor(private service: CommunityService) {
    this.service.findAllAvailable().subscribe(value => {
      this.timeRemaining = value.length * 5000;
      this.teams = value;
      setTimeout(() => {
        if (typeof window.orientation !== 'undefined') {
          this.finish = -(document.getElementById(`community${this.teams[0].id}`).parentElement.offsetHeight / (window.innerHeight / 100) / 1.6);
        } else {
          this.finish = -((document.getElementById(`community${this.teams[0].id}`).offsetHeight / (window.innerHeight / 100)) * (this.teams.length - 1.6));
        }
        console.log(this.finish);
      }, 1000)
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }

}
