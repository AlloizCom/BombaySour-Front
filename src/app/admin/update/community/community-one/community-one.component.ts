import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {readUrl, validateImages} from "../../../../../shared/utils";

@Component({
  selector: 'app-community-one',
  templateUrl: './community-one.component.html',
  styleUrls: ['./community-one.component.css']
})
export class CommunityOneComponent implements OnInit {

  formGroup: FormGroup;
  image: string;

  constructor() {
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      image: new FormControl(null, [validateImages]),
      text: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      id: new FormControl('')
    });
  }

  readUrl(event) {
    readUrl(event, (ev) => this.image = ev.target.result);
  }

  save() {
    console.log(this.formGroup.getRawValue());
  }

}