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

  constructor(private service: FilmService) {
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      video: new FormControl(null, [validateImages]),
      name: new FormControl('', [Validators.required]),
      director: new FormControl('', [Validators.required])
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
