import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TeamService} from "../../../../shared/services/team.service";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  formGroup: FormGroup;
  image: string;

  constructor(private service: TeamService) {
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      image: new FormControl(null, [Validators.required]),
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
    this.service.save(this.formGroup.getRawValue()).subscribe(value => console.log(value));
  }

}
