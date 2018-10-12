import {Component, OnDestroy, OnInit} from '@angular/core';
import {Platform} from "../../../shared/models/platform";
import {PlatformService} from "../../../shared/services/platform.service";
import {Community} from '../../../shared/models/community';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.css']
})
export class PlatformComponent implements OnInit {
  pause: boolean = false;
  currentI = -1;
  teams: Platform[] = [];

  constructor(private service: PlatformService) {
    this.service.findAllAvailable().subscribe(value => {
      this.teams = value;
    });
  }

  ngOnInit() {
  }
  showDescr(val) {
    if (this.currentI == val || this.currentI == -1)
      this.pause = !this.pause;
    this.currentI = this.pause ? val : -1;
    console.log(document.getElementById("community" + this.currentI));
  }

}
