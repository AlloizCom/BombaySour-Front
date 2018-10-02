import {Component, OnInit} from '@angular/core';
import {Story} from "../../../../shared/models/story";

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  stories: Story[] = [];

  constructor() {
    this.test();
  }

  ngOnInit() {
  }

  test() {
    for (let i = 0; i < 10; i++) {
      let stor = new Story();
      stor.id = i;
      stor.name = `${i}  name  ${i}`;
    }
  }

}
