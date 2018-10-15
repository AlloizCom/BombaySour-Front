import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {readUrl, validateImages} from "../../../../../shared/utils";
import {ActivatedRoute} from "@angular/router";
import {FilmService} from "../../../../../shared/services/film.service";
import {url} from "../../../../../shared/config/url";
import {ImageService} from "../../../../../shared/services/image.service";

@Component({
  selector: 'app-film-one',
  templateUrl: './film-one.component.html',
  styleUrls: ['./film-one.component.css']
})
export class FilmOneComponent implements OnInit {

  formGroup: FormGroup;
  image: string;
  video: string;

  constructor(private activatedRoute: ActivatedRoute, private service: FilmService, private _imageService: ImageService) {
  }


  ngOnInit() {
    this.formGroup = new FormGroup({
      video: new FormControl(null, [validateImages]),
      filmTitle: new FormControl('', [Validators.required]),
      poster: new FormControl('', [Validators.required]),
      available: new FormControl('',),
      director: new FormControl('', [Validators.required]),
      id: new FormControl(null, [Validators.required])
    });
    this.activatedRoute.params.subscribe(value => this.load(value['id']));
  }

  readUrl(event) {
    this.formGroup.patchValue({poster: event});
    this.image = event;
  }

  readUrlVideo(event) {
    readUrl(event, (ev) => this.video = ev.target.result);
  }

  save(form) {
    console.log(this.formGroup.getRawValue());
    this.service.update(this.formGroup.getRawValue(), form).subscribe(value => console.log(value));
  }

  load(id: number) {
    // this.formGroup.patchValue({id: id, filmTitle: `${id}  name  ${id}`, director: `${id}  director  ${id}`});
    this.service.findOne(id).subscribe(value => {
      this.formGroup.patchValue(value);
      this.video = url + value.videoUrl;
      this._imageService.findOne(value.id, 'film').subscribe(value1 => this.image = value1.body);
    });
  }
}
