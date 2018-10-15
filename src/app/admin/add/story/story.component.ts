import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {readUrl, validateImages} from "../../../../shared/utils";
import {StoryService} from "../../../../shared/services/story.service";

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  formGroup: FormGroup;
  image: string;
  video: string;

  constructor(private service: StoryService) {
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      video: new FormControl(null, [validateImages]),
      poster: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required])
    });
  }

  readUrl(event) {
    this.formGroup.patchValue({poster: event});
    this.image = event;
  }

  readUrlVideo(event) {
    readUrl(event, (ev) => this.video= ev.target.result);
  }

  save(form) {
    console.log(this.formGroup.getRawValue());
    this.service.save(this.formGroup.getRawValue(), form).subscribe(value => console.log(value));
  }

}
