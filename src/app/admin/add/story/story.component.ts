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

  constructor(private service: StoryService) {
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

  save(form) {
    console.log(this.formGroup.getRawValue());
    this.service.save(this.formGroup.getRawValue(), form).subscribe(value => console.log(value));
  }

}
