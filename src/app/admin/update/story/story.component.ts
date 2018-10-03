import {Component, OnInit} from '@angular/core';
import {Story} from "../../../../shared/models/story";
import {StoryService} from "../../../../shared/services/story.service";

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  stories: Story[] = [];

  constructor(private service: StoryService) {
    this.test();
    // service.findAll().subscribe(value => this.stories = value);
  }

  ngOnInit() {
  }

  test() {
    for (let i = 0; i < 10; i++) {
      let stor = new Story();
      stor.id = i;
      stor.name = `${i}  name  ${i}`;
      this.stories.push(stor);
    }
  }

  delete(id: number) {
    this.service.delete(id).subscribe(value => console.log(value));
  }

}
