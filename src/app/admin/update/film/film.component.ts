import { Component, OnInit } from '@angular/core';
import {Community} from "../../../../shared/models/community";
import {Film} from "../../../../shared/models/film";

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {

  films:Film[]=[];

  constructor() {
    this.test();
  }

  ngOnInit() {
  }

  test(){
    for(let i = 0; i < 10; i++){
      let com = new Film();
      com.id = i;
      com.director = `${i}  director  ${i}`;
      com.name = `${i}  name  ${i}`;
      this.films.push(com);
    }
  }

}
