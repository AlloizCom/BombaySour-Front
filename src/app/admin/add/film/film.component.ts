import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {readUrl, validateImages} from "../../../../shared/utils";
import {FilmService} from "../../../../shared/services/film.service";

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {

  formGroup: FormGroup;
  image: string;
  video: string;

  constructor(private service: FilmService) {
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      video: new FormControl(null, [validateImages]),
      poster: new FormControl('', [Validators.required]),
      filmTitle: new FormControl('', [Validators.required]),
      director: new FormControl('', [Validators.required])
    });
  }

  readUrl(event) {
    this.formGroup.patchValue({poster: event});
    this.image = event;
  }

  readUrlVideo(event) {
    readUrl(event, (ev) => this.video= ev.target.result);
  }

  save(form) {
    console.log(this.formGroup.getRawValue());
    this.service.save(this.formGroup.getRawValue(), form).subscribe(value => console.log(value));
  }

}
