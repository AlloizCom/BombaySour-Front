import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {PlatformService} from "../../../../../shared/services/platform.service";
import {ImageService} from "../../../../../shared/services/image.service";

@Component({
  selector: 'app-platform-one',
  templateUrl: './platform-one.component.html',
  styleUrls: ['./platform-one.component.css']
})
export class PlatformOneComponent implements OnInit {

  formGroup: FormGroup;
  image: string;

  constructor(private activatedRoute: ActivatedRoute, private service: PlatformService, private _imageService: ImageService) {
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      image: new FormControl(null, [Validators.required]),
      text: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      available: new FormControl('', ),
      id: new FormControl()
    });
    this.activatedRoute.params.subscribe(value => this.load(value['id']));
  }

  readUrl(event) {
    this.formGroup.patchValue({image: event});
    this.image = event;
  }

  save() {
    console.log(this.formGroup.getRawValue());
    this.service.update(this.formGroup.getRawValue()).subscribe(value => console.log(value))
  }

  load(id: number) {
    // this.formGroup.patchValue({id: id, text: `${id}  text  ${id}`, title: `${id}  title  ${id}`});
    this.service.findOne(id).subscribe(value => {
      this.formGroup.patchValue(value);
      this._imageService.findOne(id, 'platform').subscribe(value1 => {
        this.image = value1.body;
        this.formGroup.patchValue({image: value1.body})
      });
    });
  }
}
