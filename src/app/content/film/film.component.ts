import {Component, HostListener, OnInit} from '@angular/core';
import {ImageService} from "../../../shared/services/image.service";
import {Film} from "../../../shared/models/film";
import {FilmService} from "../../../shared/services/film.service";

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css'],
})
export class FilmComponent implements OnInit {

  films: Film[] = [];
  currentId = 0;
  playing: boolean = true;
  width = window.innerWidth;
  loadedFirst = false;

  constructor(private _service: ImageService, private _filmServie: FilmService) {
    _filmServie.findAllAvailable().subscribe(value => {
      this.films = value;
      this.playing = false;
    }, err => {
      console.error(err);
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.width = window.innerWidth;
    console.log('resize');
  }

  changeCurrentId(way: number) {
    if (this.playing)
      return;
    if (this.currentId + way < 0 || this.currentId + way == this.films.length)
      return;
    this.currentId += way;
    this.playing = true;
    setTimeout(() => this.playing = false, 1000);
  }

  loaded(event) {
    this.loadedFirst = event;
  }

  ngOnInit(): void {
  }
  scroll(e){
    e.scrollIntoView({behavior:'smooth'});
  }
}
