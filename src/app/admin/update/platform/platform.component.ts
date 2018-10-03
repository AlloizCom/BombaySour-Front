import {Component, OnInit} from '@angular/core';
import {Platform} from "../../../../shared/models/platform";
import {PlatformService} from "../../../../shared/services/platform.service";

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.css']
})
export class PlatformComponent implements OnInit {

  platforms: Platform[] = [];

  constructor(private service: PlatformService) {
    this.test();
    // service.findAll().subscribe(value => this.platforms = value);
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

  delete(id: number) {
    this.service.delete(id).subscribe(value => console.log(value));
  }

}
