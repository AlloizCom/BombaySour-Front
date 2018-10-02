import {Component, OnInit} from '@angular/core';
import {Community} from "../../../../shared/models/community";

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {

  communities: Community[] = [];

  constructor() {
    this.test();
  }

  ngOnInit() {
  }

  test() {
    for (let i = 0; i < 10; i++) {
      let com = new Community();
      com.id = i;
      com.title = `${i}  title  ${i}`;
      com.text = `${i}  text  ${i}`;
      this.communities.push(com);
    }
  }

}
