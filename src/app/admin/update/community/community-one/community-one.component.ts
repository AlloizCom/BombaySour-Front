import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {CommunityService} from "../../../../../shared/services/community.service";
import {ImageService} from "../../../../../shared/services/image.service";

@Component({
  selector: 'app-community-one',
  templateUrl: './community-one.component.html',
  styleUrls: ['./community-one.component.css']
})
export class CommunityOneComponent implements OnInit {

  formGroup: FormGroup;
  image: string;

  constructor(private activatedRoute: ActivatedRoute, private service: CommunityService, private _imageService: ImageService) {
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      image: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
      articleTitle: new FormControl('', [Validators.required]),
      id: new FormControl('')
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
    console.log('set value');
    this.service.findOne(id).subscribe(value => {
      this.formGroup.patchValue(value);
      this._imageService.findOne(id, 'community').subscribe(value1 => {
        this.image = value1.body;
        this.formGroup.patchValue({image: value1.body})
      })
    });
    // this.formGroup.patchValue({id: id, text: `${id}  text  ${id}`, articleTitle: `${id}  articleTitle  ${id}`});
  }

}
