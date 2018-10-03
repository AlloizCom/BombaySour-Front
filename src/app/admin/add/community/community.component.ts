import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CommunityService} from "../../../../shared/services/community.service";

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {

  formGroup: FormGroup;
  image: string;

  constructor(private service: CommunityService) {
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      text: new FormControl('', [Validators.required]),
      articleTitle: new FormControl('', [Validators.required])
    });
  }

  save() {
    console.log(this.formGroup.getRawValue());
    this.service.save(this.formGroup.getRawValue()).subscribe(value => console.log(value),err=>console.error(err));
  }

}
