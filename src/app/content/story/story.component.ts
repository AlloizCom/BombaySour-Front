import {Component, OnInit} from '@angular/core';
import {ImageService} from "../../../shared/services/image.service";
import {Story} from "../../../shared/models/story";
import {StoryService} from "../../../shared/services/story.service";

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  stories: Story[] = [];
  sources: { id: number, source: any }[] = [];
  currentId = 0;
  playing: boolean = true;

  constructor(private _service: ImageService, private _storyService: StoryService) {
    _storyService.findAllAvailable().subscribe(value => {
      this.stories = value;
      for (let one of this.stories) {
        _service.loadVideo(one.videoUrl).subscribe(image => {
          let reader = new FileReader();
          reader.addEventListener("load", () => {
            let src: { id: number, source: any } = {} as { id: number, source: any };
            src.id = one.id;
            src.source = reader.result;
            this.sources.push(src);
          }, false);
          if (image) {
            reader.readAsDataURL(image);
          }
        }, err => {
          console.error(err);
        });
      }
      this.playing = false;
    }, err => {
      console.error(err);
    });
  }

  changeCurrentId(way: number) {
    if (this.playing)
      return;
    if (this.currentId + way < -1 || this.currentId + way == this.stories.length + 1)
      return;
    this.currentId += way;
    this.playing = true;
    setTimeout(() => this.playing = false, 1000);
  }

  ngOnInit(): void {
  }

}
