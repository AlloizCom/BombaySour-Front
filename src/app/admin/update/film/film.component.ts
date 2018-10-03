import {Component, OnInit} from '@angular/core';
import {Film} from "../../../../shared/models/film";
import {FilmService} from "../../../../shared/services/film.service";

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {

  films: Film[] = [];

  constructor(private service: FilmService) {
    // service.findAll().subscribe(value => this.films = value);
    this.test();
  }

  ngOnInit() {
  }

  test() {
    for (let i = 0; i < 10; i++) {
      let com = new Film();
      com.id = i;
      com.director = `${i}  director  ${i}`;
      com.name = `${i}  name  ${i}`;
      this.films.push(com);
    }
  }

  delete(id: number) {
    this.service.delete(id).subscribe(value => console.log(value));
  }

}
