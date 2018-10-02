import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {readUrl, validateImages} from "../../../../../shared/utils";

@Component({
  selector: 'app-story-one',
  templateUrl: './story-one.component.html',
  styleUrls: ['./story-one.component.css']
})
export class StoryOneComponent implements OnInit {

  formGroup: FormGroup;
  image: string;

  constructor() {
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      video: new FormControl(null, [validateImages]),
      name: new FormControl('', [Validators.required])
    });
  }

  readUrl(event) {
    readUrl(event, (ev) => this.image = ev.target.result);
  }

  save() {
    console.log(this.formGroup.getRawValue());
  }
}
