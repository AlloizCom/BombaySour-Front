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
      this.finish = -40 * (value.length - 1.5);
      this.timeRemaining = value.length * 5000;
      this.teams = value;
    });
  }

  ngOnInit() {
  }

}
