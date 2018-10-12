import {Component, HostListener, OnInit} from '@angular/core';
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
  currentId = 0;
  playing: boolean = true;
  width = window.innerWidth;
  loadedFirst = false;
  hideArrow: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.width = window.innerWidth;
    console.log('resize');
  }

  constructor(private _service: ImageService, private _storyService: StoryService) {
    _storyService.findAllAvailable().subscribe(value => {
      this.stories = value;
      this.playing = true;
    }, err => {
      console.error(err);
    });
  }

  changeCurrentId(way: number) {
    if (this.playing)
      return;
    if (this.currentId + way < 0 || this.currentId + way == this.stories.length)
      return;
    this.currentId += way;
    this.playing = true;
    setTimeout(() => this.playing = false, 1000);
  }
  hide(){
    this.hideArrow = false;
    setTimeout(()=>{this.hideArrow= true; console.log(this.hideArrow)}, 5000);
  }

  loaded(event){
    this.loadedFirst = event;
  }

  ngOnInit(): void {
    setTimeout(()=>{this.hideArrow= true; console.log(this.hideArrow)}, 5000);
  }

}
