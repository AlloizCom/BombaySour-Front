import {Component, OnDestroy, OnInit} from '@angular/core';
import {Platform} from "../../../shared/models/platform";
import {PlatformService} from "../../../shared/services/platform.service";

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.css']
})
export class PlatformComponent implements OnInit {

  teams: Platform[] = [];

  constructor(private service: PlatformService) {
    this.service.findAllAvailable().subscribe(value => {
      this.teams = value;
    });
  }

  ngOnInit() {
  }

}
