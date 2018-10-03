import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {validateImages} from "../../../../../shared/utils";
import {ActivatedRoute} from "@angular/router";
import {TeamService} from "../../../../../shared/services/team.service";

@Component({
  selector: 'app-team-one',
  templateUrl: './team-one.component.html',
  styleUrls: ['./team-one.component.css']
})
export class TeamOneComponent implements OnInit {

  formGroup: FormGroup;
  image: string;

  constructor(private activatedRoute: ActivatedRoute, private service: TeamService) {
  }


  ngOnInit() {
    this.formGroup = new FormGroup({
      image: new FormControl(null, [Validators.required]),
      biography: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required])
    });
    this.activatedRoute.params.subscribe(value => this.load(value['id']));
  }

  readUrl(event) {
    this.formGroup.patchValue({image: event});
    this.image = event;
  }

  save() {
    console.log(this.formGroup.getRawValue());
    this.service.update(this.formGroup.getRawValue()).subscribe(value => console.log(value));
  }

  load(id: number) {
    this.formGroup.patchValue({id: id, biography: `${id}  text  ${id}`, name: `${id}  title  ${id}`});
    this.service.findOne(id).subscribe(value => this.formGroup.patchValue(value));
  }
}
