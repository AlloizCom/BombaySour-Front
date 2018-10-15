import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {readUrl, validateImages} from "../../../../../shared/utils";
import {ActivatedRoute} from "@angular/router";
import {StoryService} from "../../../../../shared/services/story.service";
import {url} from "../../../../../shared/config/url";
import {FilmService} from "../../../../../shared/services/film.service";
import {ImageService} from "../../../../../shared/services/image.service";

@Component({
  selector: 'app-story-one',
  templateUrl: './story-one.component.html',
  styleUrls: ['./story-one.component.css']
})
export class StoryOneComponent implements OnInit {

  formGroup: FormGroup;
  image: string;
  video: string;

  constructor(private activatedRoute: ActivatedRoute, private service: StoryService, private _imageService: ImageService) {
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      video: new FormControl(null, [validateImages]),
      poster: new FormControl('', [Validators.required]),
      available: new FormControl('', ),
      name: new FormControl('', [Validators.required]),
      id: new FormControl()
    });
    this.activatedRoute.params.subscribe(value => this.load(value['id']));
  }

  readUrl(event) {
    this.formGroup.patchValue({poster: event});
    this.image = event;
  }

  readUrlVideo(event) {
    readUrl(event, (ev) => this.video = ev.target.result);
  }

  save(form) {
    console.log(this.formGroup.getRawValue());
    this.service.update(this.formGroup.getRawValue(), form).subscribe(value => console.log(value));
  }

  load(id: number) {
    // this.formGroup.patchValue({id: id, text: `${id}  text  ${id}`, title: `${id}  title  ${id}`});
    this.service.findOne(id).subscribe(value => {
      this.formGroup.patchValue(value);
      this.video = url + value.videoUrl;
      this._imageService.findOne(value.id, 'story').subscribe(value1 => this.image = value1.body);
    });
  }
}
