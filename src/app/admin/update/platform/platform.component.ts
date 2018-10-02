import {Component, OnInit} from '@angular/core';
import {Platform} from "../../../../shared/models/platform";

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.css']
})
export class PlatformComponent implements OnInit {

  platforms: Platform[] = [];

  constructor() {
    this.test();
  }

  ngOnInit() {
  }

  test() {
    for (let i = 0; i < 10; i++) {
      let plat = new Platform();
      plat.id = i;
      plat.text = `${i}  text  ${i}`;
      this.platforms.push(plat);
    }
  }

}
