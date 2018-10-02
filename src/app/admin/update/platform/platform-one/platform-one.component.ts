import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {readUrl, validateImages} from "../../../../../shared/utils";
import {load} from "@angular/core/src/render3/instructions";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-platform-one',
  templateUrl: './platform-one.component.html',
  styleUrls: ['./platform-one.component.css']
})
export class PlatformOneComponent implements OnInit {

  formGroup: FormGroup;
  image: string;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      image: new FormControl(null, [validateImages]),
      text: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      id:new FormControl()
    });
    this.activatedRoute.params.subscribe(value => this.load(value['id']));
  }

  readUrl(event) {
    readUrl(event, (ev) => this.image = ev.target.result);
  }

  save() {
    console.log(this.formGroup.getRawValue());
  }

  load(id: number) {
      this.formGroup.patchValue({id: id, text: `${id}  text  ${id}`, title: `${id}  title  ${id}`});
  }
}
