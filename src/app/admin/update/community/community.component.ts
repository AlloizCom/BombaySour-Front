import {Component, OnInit} from '@angular/core';
import {Community} from "../../../../shared/models/community";
import {CommunityService} from "../../../../shared/services/community.service";

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {

  communities: Community[] = [];

  constructor(private service: CommunityService) {
    service.findAll().subscribe(value => this.communities = value);
    // this.test();
  }

  ngOnInit() {
  }

  test() {
    for (let i = 0; i < 10; i++) {
      let com = new Community();
      com.id = i;
      com.articleTitle = `${i}  title  ${i}`;
      com.text = `${i}  text  ${i}`;
      this.communities.push(com);
    }
  }

  delete(id: number) {
    this.service.delete(id).subscribe(value => console.log(value));
  }

}
