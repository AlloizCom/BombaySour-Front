import {Component, OnInit} from '@angular/core';
import {Platform} from "../../../shared/models/platform";
import {PlatformService} from "../../../shared/services/platform.service";

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.css']
})
export class PlatformComponent implements OnInit {

  teams: Platform[] = [];
  timeRemaining = 30000;
  finish = 0;

  constructor(private service: PlatformService) {
    this.service.findAllAvailable().subscribe(value => {
      this.timeRemaining = value.length * 5000;
      this.teams = value;
      setTimeout(() => {
        if (typeof window.orientation !== 'undefined') {
          this.finish = -(document.getElementById(`platform${this.teams[0].id}`).parentElement.offsetHeight / (window.innerHeight / 100) / 1.6);
        } else {
          this.finish = -((document.getElementById(`platform${this.teams[0].id}`).offsetHeight / (window.innerHeight / 100)) * (this.teams.length - 1.6));
        }
        console.log(this.finish);
      }, 1000)
    });
  }

  ngOnInit() {
  }

}
