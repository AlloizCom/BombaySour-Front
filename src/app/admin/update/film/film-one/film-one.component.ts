import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {readUrl, validateImages} from "../../../../../shared/utils";
import {ActivatedRoute} from "@angular/router";
import {FilmService} from "../../../../../shared/services/film.service";

@Component({
  selector: 'app-film-one',
  templateUrl: './film-one.component.html',
  styleUrls: ['./film-one.component.css']
})
export class FilmOneComponent implements OnInit {

  formGroup: FormGroup;
  image: string;

  constructor(private activatedRoute: ActivatedRoute, private service: FilmService) {
  }


  ngOnInit() {
    this.formGroup = new FormGroup({
      video: new FormControl(null, [validateImages]),
      name: new FormControl('', [Validators.required]),
      director: new FormControl('', [Validators.required]),
      id: new FormControl(null, [Validators.required])
    });
    this.activatedRoute.params.subscribe(value => this.load(value['id']));
  }

  readUrl(event) {
    readUrl(event, (ev) => this.image = ev.target.result);
  }

  save(form) {
    console.log(this.formGroup.getRawValue());
    this.service.update(this.formGroup.getRawValue(), form).subscribe(value => console.log(value));
  }

  load(id: number) {
    this.formGroup.patchValue({id: id, name: `${id}  name  ${id}`, director: `${id}  director  ${id}`});
    this.service.findOne(id).subscribe(value => this.formGroup.patchValue(value));
  }
}
