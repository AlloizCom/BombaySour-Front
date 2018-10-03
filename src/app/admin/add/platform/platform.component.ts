import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {validateImages} from "../../../../shared/utils";

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.css']
})
export class PlatformComponent implements OnInit {

  formGroup: FormGroup;
  image: string;

  constructor() {
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      image: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required])
    });
  }

  readUrl(event) {
    this.formGroup.patchValue({image: event});
    this.image = event;
  }

  save() {
    console.log(this.formGroup.getRawValue());
  }

}
